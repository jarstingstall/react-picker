var React = require('react');

var PickerSelect = React.createClass({
    render: function() {
        var options = this.props.items.map(function(item) {
            return <option key={item.value} value="{item.value}">{item.label}</option>;
        });

        return (
            <select style={{display: 'none'}}>
                {options}
            </select>
        );
    }
});

module.exports = PickerSelect;