const express = require('express');
const toDoController = require('./controllers/todoController');

var app = express();

//Set up template engine
app.set('view engine', 'ejs');

//Set up static file handling middleware
app.use(express.static('./public'));

//Fire up controllers
toDoController(app);

//Listen to port 3000
app.listen(3000);
console.log("Listening on Port 3000...");