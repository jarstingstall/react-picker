var React = require('react');
var PickerSelect = require('./PickerSelect');
var PickerList = require('./PickerList');
var PickerFilter = require('./PickerFilter');
var PickerLabel = require('./PickerLabel');
var PickerPrevButton = require('./PickerPrevButton');
var PickerNextButton = require('./PickerNextButton');

require('../styles/picker.scss');

var Picker = React.createClass({
    getInitialState: function() {
        return {
            selectedItem: this.props.items[2],
            open: false
        };
    },

    setSelectedItem: function(index) {
        this.setState({selectedItem: this.props.items[index]});
    },

    openDropDown: function() {
        this.setState({open: true});
        this.scrollToListItem();
        this.refs.pickerList.getDOMNode().classList.add('picker-open', 'picker-animate');
        var filter = this.refs.pickerFilter.getDOMNode();
        filter.style.zIndex = 0;
        filter.focus();
    },

    closeDropDown: function() {
        this.setState({open: false});
        this.refs.pickerList.getDOMNode().classList.remove('picker-open', 'picker-animate');
        this.refs.pickerFilter.getDOMNode().style.zIndex = -10;
        this.refs.pickerLabel.getDOMNode().classList.add('picker-open');
    },

    scrollToListItem: function() {
        var index = this.refs.pickerSelect.getDOMNode().selectedIndex;
        var height = this.refs.pickerList.getDOMNode().children[index].offsetHeight;
        this.refs.pickerList.getDOMNode().scrollTop = height * index;
    },
    
    render: function() {
        return (
            <div>
                <PickerSelect items={this.props.items} selectedItem={this.state.selectedItem.value} ref="pickerSelect"/>
                <div className="picker-container" id="picker-container" ref="pickerContainer">
                    <PickerPrevButton />
                    <div className="picker-base">
                        <PickerFilter ref="pickerFilter" />
                        <PickerLabel text={this.state.selectedItem.label} openDropDown={this.openDropDown} ref="pickerLabel"/>
                        <PickerList items={this.props.items} setSelectedItem={this.setSelectedItem} closeDropDown={this.closeDropDown} ref="pickerList"/>
                    </div>
                    <PickerNextButton />
                </div>
            </div>
        );
    }
});

module.exports = Picker;