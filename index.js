var React = require('react');
var Picker = require('./components/Picker');

var items = [
    {value: 'one', label: 'Pizza'},
    {value: 'two', label: 'Tacos'},
    {value: 'three', label: 'Cheeseburger'},
];

React.render(
    <Picker items={items} value="two" />,
    document.querySelector('.container')
);