var React = require('react');
var PickerSelect = require('./PickerSelect');
var PickerList = require('./PickerList');

require('./picker.scss');

var Picker = React.createClass({
    render: function() {
        return (
            <div>
                <PickerSelect items={this.props.items} />
                <div className="picker-base">
                    <PickerList items={this.props.items} />
                </div>
            </div>
        );
    }
});

module.exports = Picker;