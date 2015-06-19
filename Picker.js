var React = require('react');
require('./picker.scss');

var Picker = React.createClass({
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

module.exports = Picker;