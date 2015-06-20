var React = require('react');
var List = require('list.js/dist/list.js');

var PickerFilter = React.createClass({
    render: function() {
        return (
            <input type="text" autoComplete="off" className="picker-filter"/>
        );
    },

    componentDidMount: function() {
        this.filterList = new List('picker-container', { 
            searchClass: "picker-filter",
            valueNames: ['picker-option'],
            listClass: 'picker-choices' 
        });
    }

});

module.exports = PickerFilter;