var express = require('express');
var bodyParser = require('body-parser');
var _  = require('underscore');

//application parameters
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;


app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Todo API root');
});

//Getting all todos

app.get('/todos', function (req, res) {
   res.json(todos); 
});

//GET /todos/:id            //getting each todo module //:id with variable id
app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});

    if(matchedTodo) {
        res.json(matchedTodo);
    } else {
         res.status(404).send();
    }
});

//POST  /todos request /app.post method will set up an api route

app.post('/todos', function (req, res) {
     var body = _.pick(req.body, 'description', 'completed');


    if(!_.isBoolean(body.completed) || !_.isString(body.description) 
                                    || body.description.trim().length === 0) {
        return res.status(400).send();
    }

    body.description = body.description.trim();
    body.id = todoNextId++;
    todos.push(body);
    res.json(body);

});


app.listen(PORT, function () {
    console.log('Express is listening on PORT: ' + PORT + '!');
});

