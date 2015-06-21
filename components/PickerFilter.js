var React = require('react');


var PickerFilter = React.createClass({
    render: function() {
        return (
            <input type="text" autoComplete="off" className="picker-filter" onKeyDown={this.handleKeyDown}/>
        );
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
            self.closeDropdown();
        }
    }

});

module.exports = PickerFilter;