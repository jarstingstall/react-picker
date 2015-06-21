var React = require('react');

var PickerNextButton = React.createClass({
    handleClick: function() {
        var active = document.querySelector('.picker-hover');
        if (active.nextElementSibling) {
            this.props.setSelectedItem(active.nextElementSibling);
        }
    },

    render: function() {
        return (
            <button href="#" className="picker-next picker-btn" tabIndex="-1" onClick={this.handleClick}></button>
        );
    }
});

module.exports = PickerNextButton;