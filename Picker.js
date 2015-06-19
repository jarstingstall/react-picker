var React = require('react');
var PickerSelect = require('./PickerSelect');

require('./picker.scss');

var Picker = React.createClass({
    render: function() {
        return (
            <PickerSelect items={this.props.items} />
        );
    }
});

module.exports = Picker;