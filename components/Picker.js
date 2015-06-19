var React = require('react');
var PickerSelect = require('./PickerSelect');
var PickerList = require('./PickerList');
var PickerFilter = require('./PickerFilter');
var PickerLabel = require('./PickerLabel');

require('../styles/picker.scss');

var Picker = React.createClass({
    render: function() {
        return (
            <div>
                <PickerSelect items={this.props.items} />
                <div className="picker-base">
                    <PickerFilter />
                    <PickerLabel />
                    <PickerList items={this.props.items} />
                </div>
            </div>
        );
    }
});

module.exports = Picker;