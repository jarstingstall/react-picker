var React = require('react');

var PickerLabel = React.createClass({
    render: function() {
        return (
            <span className="picker-current-label picker-open"></span>
        );
    }
});

module.exports = PickerLabel;