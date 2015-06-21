var React = require('react');

var PickerPrevButton = React.createClass({
    handleClick: function() {
        var active = document.querySelector('.picker-hover');
        if (active.previousElementSibling) {
            this.props.setSelectedItem(active.previousElementSibling);
        }
    },

    render: function() {
        return (
            <button href="#" className="picker-prev picker-btn" tabIndex="-1" onClick={this.handleClick}></button>
        );
    }
});

module.exports = PickerPrevButton;