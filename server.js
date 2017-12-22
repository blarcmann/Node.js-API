var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Todo API root');
});

//Getting our todos

//GET /todos                //getting todos 
app.get('/todos', function (req, res) {
   res.json(todos); 
});

//GET /todos/:id            //getting each todo module //:id with variable id
app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo;

    todos.forEach(function (todo) {
        if(todoId === todo.id) {
            matchedTodo = todo;
        }
    });

    if(matchedTodo) {
        res.json(matchedTodo);
    } else {
         res.status(404).send();
    }

    // Iterate all todos and find a match
    // send the data of the matched item down the aisle
    // if not found, return 404 with "res.status(404).send()"

});

//POST  /todos request /app.post method will set up an api route
app.post('/todos', function (req, res) {
    var body = req.body;

    //add the id field
    body.id = todoNextId++;
    //Push refractured body into the array
    todos.push(body);
    res.json(body);

});


app.listen(PORT, function () {
    console.log('Express is listening on PORT: ' + PORT + '!');
});

