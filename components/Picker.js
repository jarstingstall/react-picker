var React = require('react');
var PickerSelect = require('./PickerSelect');
var PickerList = require('./PickerList');
var PickerFilter = require('./PickerFilter');
var PickerLabel = require('./PickerLabel');
var PickerPrevButton = require('./PickerPrevButton');
var PickerNextButton = require('./PickerNextButton');
var List = require('list.js/dist/list.js');

require('../styles/picker.scss');

var Picker = React.createClass({
    getInitialState: function() {
        var selected = this.props.items.filter((item) => {
            return item.value === this.props.value;
        });
        return {
            selectedItem: selected.length ? selected[0] : this.props.items[0],
            open: false
        };
    },

    setSelectedItem: function(item) {
        this.setState({
            selectedItem: this.props.items[item.getAttribute('data-position')], 
            open: false
        });
        this.closeDropDown();
        this.toggleHover(item);
    },

    openDropDown: function() {
        this.setState({open: true});
        this.scrollToListItem();
        this.refs.pickerList.getDOMNode().classList.add('picker-open', 'picker-animate');
        var filter = this.refs.pickerFilter.getDOMNode();
        filter.style.zIndex = 0;
        filter.focus();
    },

    closeDropDown: function() {
        this.refs.pickerList.getDOMNode().classList.remove('picker-open', 'picker-animate');
        this.refs.pickerFilter.getDOMNode().style.zIndex = -10;
        this.refs.pickerLabel.getDOMNode().classList.add('picker-open');
        this.refs.pickerFilter.getDOMNode().value = '';
        this.filterList.search();
    },

    scrollToListItem: function() {
        var index = this.refs.pickerSelect.getDOMNode().selectedIndex;
        var height = this.refs.pickerList.getDOMNode().children[index].offsetHeight;
        this.refs.pickerList.getDOMNode().scrollTop = height * index;
    },
    
    toggleHover: function(item) {
        var items = this.refs.pickerList.getDOMNode().children;
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('picker-hover');
        };
        item.classList.add('picker-hover');
    },

    componentDidMount: function() {
        this.refs.pickerList.getDOMNode().style.width = this.refs.pickerContainer.getDOMNode().clientWidth + 'px';
        var listItems = this.refs.pickerList.getDOMNode().children;
        for (var i = 0; i < listItems.length; i++) {
            if (listItems[i].firstElementChild.textContent === this.state.selectedItem.label) {
                listItems[i].classList.add('picker-hover');
                break;
            }
        }
        this.filterList = new List('picker-container', { 
            searchClass: "picker-filter",
            valueNames: ['picker-option'],
            listClass: 'picker-choices'
        });
    },

    render: function() {
        return (
            <div>
                <PickerSelect items={this.props.items} selectedItem={this.state.selectedItem.value} ref="pickerSelect"/>
                <div className="picker-container" id="picker-container" ref="pickerContainer">
                    <PickerPrevButton />
                    <div className="picker-base">
                        <PickerFilter 
                            ref="pickerFilter" 
                            filterList={this.filterList} 
                            toggleHover={this.toggleHover} 
                            setSelectedItem={this.setSelectedItem} 
                            closeDropDown={this.closeDropDown} />
                        <PickerLabel text={this.state.selectedItem.label} openDropDown={this.openDropDown} ref="pickerLabel"/>
                        <PickerList items={this.props.items} setSelectedItem={this.setSelectedItem} ref="pickerList"/>
                    </div>
                    <PickerNextButton />
                </div>
            </div>
        );
    }
});

module.exports = Picker;