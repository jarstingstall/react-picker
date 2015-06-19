var React = require('react');
var Picker = require('./components/Picker');

var items = [
    {value: '1', label: 'Pizza'},
    {value: '2', label: 'Tacos'},
    {value: '3', label: 'Cheeseburger'},
];

React.render(
    <Picker items={items} />,
    document.querySelector('.container')
);