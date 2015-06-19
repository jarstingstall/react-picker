(function (window, document, undefined) {
    'use strict';

    // adds ability to remove a single class name from any element
    // thanks @ http://stackoverflow.com/a/18492076
    Node.prototype.hasClass = function (className) {
        if (this.classList) {
            return this.classList.contains(className);
        } else {
            return (-1 < this.className.indexOf(className));
        }
    };

    Node.prototype.addClass = function (className) {
        if (this.classList) {
            this.classList.add(className);
        } else if (!this.hasClass(className)) {
            var classes = this.className.split(" ");
            classes.push(className);
            this.className = classes.join(" ");
        }
        return this;
    };

    Node.prototype.removeClass = function (className) {
        if (this.classList) {
            this.classList.remove(className);
        } else {
            var classes = this.className.split(" ");
            classes.splice(classes.indexOf(className), 1);
            this.className = classes.join(" ");
        }
        return this;
    };

    // used to give incremental id values 
    var idCount = 1;

    var Picker = function Picker(select) {
        this.id = idCount++;
        this.pickerId = 'picker-' + this.id;
        this.isOpen = false;
        this.select = select;
    };

    Picker.prototype.init = function init() {
        buildHtml.call(this);
        addListeners.call(this);
        this.setLabel();
        addFilter.call(this);
    };



    function buildHtml() {
        // 1. Build new HTML
        var pickerContainer = document.createElement('div'),
            pickerChoices = '';
        pickerContainer.id = this.pickerId;
        pickerContainer.className = 'picker-container';

        for (var i = 0; i < this.select.options.length; i++) {
            pickerChoices += '<li class="picker-option" data-position="' + i + '"><span class="picker-option">' + this.select.options[i].text + '</span></li>';
        };

        pickerContainer.innerHTML = ('<button href="#" id="picker-prev-' + this.id + '" class="picker-prev picker-btn" tabindex="-1"></button>' +
                       '<div id="picker-base-' + this.id + '" class="picker-base">' +
                           '<input id="picker-filter-' + this.id + '" type="text" autocomplete="off" class="picker-filter">' +
                           '<span id="picker-label-' + this.id + '" class="picker-current-label picker-open"></span>' +
                           '<ul id="picker-choices-' + this.id + '"class="picker-choices">' +
                           pickerChoices +
                           '</ul>' + 
                       '</div>' + 
                       '<button href="#" id="picker-next-' + this.id + '" class="picker-next picker-btn" tabindex="-1"></button>');

        // 2. Add new HTML to DOM
        this.select.insertAdjacentHTML('afterend', pickerContainer.outerHTML);
    }

    function addListeners() {
        var self = this,
            pickerPrev = document.getElementById('picker-prev-' + this.id),
            pickerNext = document.getElementById('picker-next-' + this.id);
        this.pickerLabel = document.getElementById('picker-label-' + this.id);
        this.pickerFilter = document.getElementById('picker-filter-' + this.id);
        this.pickerList = document.getElementById('picker-choices-' + this.id);
        this.pickerListItems = this.pickerList.children;
        this.pickerRoot = document.getElementById(this.pickerId);

        this.pickerList.addEventListener('click', function(e){
            e.stopPropagation();
            var position;
            if (e.target.getAttribute('data-position')) {
                position = e.target.getAttribute('data-position');
            } else {
                position = e.target.parentElement.getAttribute('data-position');
            }
            self.updateSelection(position);
            self.closeDropdown();
        }, true);

        this.pickerLabel.addEventListener('click', function(e){
            self.openDropdown();
        });

        this.pickerFilter.addEventListener('focus', function() {
            self.openDropdown();
        });
        
        this.pickerFilter.addEventListener('keydown', function(e) {
            if (e.keyCode === 38) { // up
                e.preventDefault();
                self.decrementListItem();
            } else if (e.keyCode === 40) { // down
                e.preventDefault();
                self.incrementListItem();
            } else if (e.keyCode === 13) { // enter
                self.pickListItem(); 
            } else if (e.keyCode === 27) { // esc
                self.closeDropdown();
            } 
        });

        pickerNext.addEventListener('click', function(e){
            self.increment();
        });
        
        pickerPrev.addEventListener('click', function(e){
            self.decrement();
        });

        document.body.addEventListener('click', function(e) {
            if (self.isOpen && e.target.tagName !== 'LI' && e.target.tagName !== 'SPAN') {
                self.closeDropdown();
            }
        }, true);

        window.addEventListener('keydown', function(e){

            if(self.isOpen && e.keyCode === 9){
                e.stopPropagation();
                self.closeDropdown();
            }

        }, true);
    };

    function addFilter() {
        this.pickerList.style.width = this.pickerRoot.clientWidth + 'px'; // prevent width from collapsing while filtering

        this.filterList = new List(this.pickerId, { 
            searchClass: "picker-filter",
            valueNames: ['picker-option'],
            listClass: 'picker-choices', 
            plugins: [ ListFuzzySearch() ]
        });

        var self = this;
        var actionKeys = [37, 38, 39, 40, 9, 13, 16, 27];

        this.pickerFilter.addEventListener('keyup', function(e) {
            if (self.filterList.matchingItems.length > 0 && actionKeys.indexOf(e.keyCode) === -1) {
                self.updateSelection(0);
            }
        });

        this.updateListItem();
    };

    Picker.prototype.pickListItem = function() {
        this.setSelectOption(this.pickerRoot.getElementsByClassName('picker-hover')[0].getAttribute('data-position'));
        this.closeDropdown();
    };    

    Picker.prototype.updateListItem = function() {
        for (var i = this.pickerListItems.length - 1; i >= 0; i--) {
            this.pickerListItems[i].removeClass('picker-hover');
        };
        this.pickerListItems[this.select.selectedIndex].addClass('picker-hover');
        this.scrollToListItem();
    };

    Picker.prototype.incrementListItem = function() {
        if(this.select.selectedIndex < this.pickerListItems.length - 1) {
            this.select.selectedIndex++;
            this.updateListItem();
        }
    };

    Picker.prototype.decrementListItem = function() {
        if(this.select.selectedIndex > 0) {
            this.select.selectedIndex--;
            this.updateListItem();
        }
    };

    Picker.prototype.scrollToListItem = function() {
        var pickerListItemSize = this.pickerListItems[this.select.selectedIndex].offsetHeight;
        this.pickerList.scrollTop = pickerListItemSize * this.select.selectedIndex;
    };

    Picker.prototype.increment = function() {
        if(this.isOpen) {
            this.closeDropdown();
        }
        var currentIndex = this.select.selectedIndex;
        var totalOptions = this.select.children.length - 1;

        currentIndex++;

        if ( currentIndex <= totalOptions) {
            this.updateSelection(currentIndex);
        }
    };

    Picker.prototype.decrement = function() {
        if(this.isOpen) {
            this.closeDropdown();
        }
        var currentIndex = this.select.selectedIndex;

        currentIndex--;

        if ( currentIndex >= 0) {
            this.updateSelection(currentIndex);
        }
    };

    Picker.prototype.setLabel = function setLabel() {
        this.pickerLabel.innerHTML = this.select.selectedOptions[0].text;
    };

    Picker.prototype.setSelectOption = function(index) {
        this.select.selectedIndex = index
        this.setLabel();
    };

    Picker.prototype.openDropdown = function() {
        if(this.isOpen === true) {
            return;
        }

        this.isOpen = true;
        this.scrollToListItem();
        this.pickerList.addClass('picker-open');
        this.pickerList.addClass('picker-animate');
        this.pickerLabel.removeClass('picker-open');
        this.pickerFilter.style.zIndex = 0;
        this.pickerFilter.focus();
        
        function fixSafariScrolling(event) {
            event.target.style.overflowY = 'hidden';
            setTimeout(function () { event.target.style.overflowY = 'auto'; });
        }

        this.pickerList.addEventListener('webkitAnimationEnd', fixSafariScrolling);
    };

    Picker.prototype.closeDropdown = function() {
        this.isOpen = false;
        this.pickerList.removeClass('picker-open');
        this.pickerList.removeClass('picker-animate');
        this.pickerFilter.style.zIndex = -10;       
        this.pickerLabel.addClass('picker-open');
        this.clearFilter();
    };

    Picker.prototype.clearFilter = function() {
        this.pickerFilter.value = '';
        this.filterList.search();
    }; 

    Picker.prototype.updateSelection = function updateSelection(position) {
        this.setSelectOption(position);
        this.updateListItem();
    }

    window.Picker = Picker;

})(window, document);