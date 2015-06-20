var React = require('react');

var PickerLabel = React.createClass({
    handleClick: function(e) {
        e.target.classList.remove('picker-open');
        this.props.openDropDown();
    },

    render: function() {
        return (
            <span className="picker-current-label picker-open" onClick={this.handleClick}>{this.props.text}</span>
        );
    }
});

module.exports = PickerLabel;