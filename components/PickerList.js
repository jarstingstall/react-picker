var React = require('react');

var PickerList = React.createClass({
    handleClick: function(e) {
        e.stopPropagation();
        var target;
        if (e.target.getAttribute('data-position')) {
            target = e.target;
        } else {
            target = e.target.parentElement;
        }
        this.props.setSelectedItem(target);
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