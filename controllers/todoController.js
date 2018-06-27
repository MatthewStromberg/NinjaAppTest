const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/todoDB');

//Create a schema, essentially a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('todo', todoSchema);
/*
var itemOne = Todo({
  item: "Buy milk bruh!"
}).save(function(err) {
  if (err) {
    throw err;
  }
  console.log("Item saved!");
});
*/

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

/*Data
var data = [{
  item: 'get milk'
}, {
  item: 'Walk dog'
}, {
  item: 'Kick ass at coding'
}];
*/

module.exports = function(app) {
  //This will control routes and passing data into view

  app.get('/todo', function(req, res) {
    //Get data from mongodb and pass it to the view
    Todo.find({}, function(err, data) {
      if (err) throw err;
      console.log("Successfully retrieved data!");
      res.render('todo', {
        todos: data
      });
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    //    data.push(req.body);
    //Get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      console.log("Successfully added data!");
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res) {
    //Delete the requested item from mongodb
    Todo.find({
      item: req.params.item.replace(/\-/g, " ")
    }).remove(function(err, data) {
      if (err) throw err;
      console.log("Successfully deleted data!");
      res.json(data);
    })
    /*    data = data.filter(function(todo) {
          return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
        */
  });

};