var React = require('react');

var PickerList = React.createClass({
    handleClick: function(e) {
        e.stopPropagation();
        this.removeHover();
        var position;
        if (e.target.getAttribute('data-position')) {
            position = e.target.getAttribute('data-position');
            e.target.classList.add('picker-hover');
        } else {
            position = e.target.parentElement.getAttribute('data-position');
            e.target.parentElement.classList.add('picker-hover');
        }
        this.props.setSelectedItem(position);
        this.props.closeDropDown();
    },
    
    removeHover: function() {
        var items = this.refs.pickerList.getDOMNode().children;
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('picker-hover');
        };
    },

    render: function() {
        var items = this.props.items.map(function(item, i) {
            return <li key={item.value} data-position={i}>
                    <span className="picker-option">{item.label}</span>
                </li>;
        }); 

        return (
            <ul className="picker-choices" onClick={this.handleClick} ref="pickerList">
                {items}
            </ul>
        );
    }
});

module.exports = PickerList;