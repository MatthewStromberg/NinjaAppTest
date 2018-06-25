const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

var data = [{
  item: 'get milk'
}, {
  item: 'Walk dog'
}, {
  item: 'Kick ass at coding'
}];

module.exports = function(app) {
  //This will control routes and passing data into view

  app.get('/todo', function(req, res) {
    res.render('todo', {
      todos: data
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', function(req, res) {
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  });

};