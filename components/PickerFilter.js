var React = require('react');


var PickerFilter = React.createClass({
    render: function() {
        return (
            <input type="text" autoComplete="off" className="picker-filter" onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}/>
        );
    },

    actionKeys: [9, 13, 16, 27, 37, 38, 39, 40],

    handleKeyUp: function(e) {
        if (this.actionKeys.indexOf(e.keyCode) !== -1) {
            return;
        } else if (this.props.filterList.matchingItems.length > 0) {
            this.props.toggleHover(this.props.filterList.matchingItems[0].elm);
        }
    },

    handleKeyDown: function(e) {
        if (e.keyCode === 38) { // up
            e.preventDefault();
            self.decrementListItem();
        } else if (e.keyCode === 40) { // down
            e.preventDefault();
            self.incrementListItem();
        } else if (e.keyCode === 13) { // enter
            this.props.setSelectedItem(this.props.filterList.matchingItems[0].elm);
        } else if (e.keyCode === 27) { // esc
            this.props.closeDropDown();
        }
    }

});

module.exports = PickerFilter;