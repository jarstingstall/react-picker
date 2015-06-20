var React = require('react');

var PickerList = React.createClass({
    handleClick: function(e) {
        e.stopPropagation();
        var position;
        if (e.target.getAttribute('data-position')) {
            position = e.target.getAttribute('data-position');
        } else {
            position = e.target.parentElement.getAttribute('data-position');
        }
        this.props.setSelectedItem(position);
        this.props.closeDropDown();
    },

    render: function() {
        var items = this.props.items.map(function(item, i) {
            return <li key={item.value} data-position={i}>
                    <span className="picker-option">{item.label}</span>
                </li>;
        }); 

        return (
            <ul className="picker-choices" onClick={this.handleClick}>
                {items}
            </ul>
        );
    }
});

module.exports = PickerList;