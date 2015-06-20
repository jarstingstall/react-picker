var React = require('react');
var List = require('list.js/dist/list.js');

var PickerFilter = React.createClass({
    render: function() {
        return (
            <input type="text" autoComplete="off" className="picker-filter search" onKeyUp={this.handleKeyUp}/>
        );
    },

    componentDidMount: function() {
        this.filterList = new List('picker-container', { 
            searchClass: "picker-filter",
            valueNames: ['picker-option'],
            listClass: 'picker-choices' 
        });
    },
    
    handleKeyUp: function(e) {
        if (this.filterList.matchingItems.length > 0 && this.actionKeys.indexOf(e.keyCode) === -1) {
            // self.updateSelection(0);
            console.log('match');
        }
    },
    
    actionKeys: [37, 38, 39, 40, 9, 13, 16, 27]
});

module.exports = PickerFilter;