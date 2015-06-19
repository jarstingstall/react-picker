var React = require('react');

var PickerList = React.createClass({
    render: function() {
        var items = this.props.items.map(function(item) {
            return <li key={item.value}>{item.label}</li>;
        }); 

        return (
            <ul className="picker-choices">
                {items}
            </ul>
        );
    }
});

module.exports = PickerList;