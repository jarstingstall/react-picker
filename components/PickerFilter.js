var React = require('react');

var PickerFilter = React.createClass({
    render: function() {
        return (
            <input type="text" autoComplete="off" className="picker-filter" />
        );
    }
});

module.exports = PickerFilter;