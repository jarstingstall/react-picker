var React = require('react');
var Picker = require('./components/Picker');

var items = [
    {value: 'one', label: 'Pizza'},
    {value: 'two', label: 'Tacos'},
    {value: 'three', label: 'Cheeseburger'},
    {value: 'four', label: 'Tater Tots'},
    {value: 'five', label: 'Pulled Pork'},
    {value: 'six', label: 'Salad'},
];

React.render(
    <Picker items={items} value="two" />,
    document.querySelector('.container')
);