var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
    id: 1,
    description: 'Finish your node course before travelling',
    completed: false
}, {
    id: 2,
    description: 'Download the laravel full course',
    completed: false
}, {
    id: 3,
    description: 'Get your hands on angular and enough laravel won\'t be too bad',
    completed: true
}];

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

app.listen(PORT, function () {
    console.log('Express is listening on PORT: ' + PORT + '!');
});
//checking to see the difference made
//checking another, maybe a headsway smhw!
