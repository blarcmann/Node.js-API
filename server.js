var express = require('express');
var bodyParser = require('body-parser');
var _  = require('underscore');
var db = require('./db.js');

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
    var query = req.query;
    var where = {};

    if(query.hasOwnProperty('completed') && query.completed === 'true') {
        where.completed = true;
    } else if(query.hasOwnProperty('completed') && query.completed === 'false') {
        where.completed = false;
    }

    if(query.hasOwnProperty('q') && query.q.length > 0) {
        where.description = {
            $like: '%' + query.q + '%'
        };
    }

    db.todo.findAll({where: where}).then(function (todos) {
        res.json(todos);
    }, function (e) {
        res.status(500).send();
    })

    // var queryParams = req.query;
    // var filteredTodos = todos;
    
    // if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
    //     filteredTodos = _.where(filteredTodos, {completed: true});
    // } else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
    //     filteredTodos = _.where(filteredTodos, { completed: false });
    // }

    // if(queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
    //     filteredTodos = _.filter(filteredTodos, function(todo) {
    //         return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
    //     });
    // }

    // res.json(filteredTodos); 
});

//GET /todos/:id            //getting each todo module //:id with variable id
app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);

    var matchedTodo = db.todo.findById(todoId).then(function (todo) {
        if(todo) {
            res.status(400).json(todo);
        } else {
            res.status(404).send();
        }
    })

    // var matchedTodo = _.findWhere(todos, {id: todoId});

    // if(matchedTodo) {
    //     res.json(matchedTodo);
    // } else {
    //      res.status(404).send();
    // }
});

//POST  /todos request /app.post method will set up an api route 

app.post('/todos', function (req, res) {
     var body = _.pick(req.body, 'description', 'completed');

     db.todo.create(body).then(function (todo) {
        res.json(todo.toJSON());
     }, function (e) {
        res.status(400).json(e);
     });

    // if(!_.isBoolean(body.completed) || !_.isString(body.description) 
    //                                 || body.description.trim().length === 0) {
    //     return res.status(400).send();
    // }

    // body.description = body.description.trim();
    // body.id = todoNextId++;
    // todos.push(body);
    // res.json(body);

});

//DELETE /todos/:id         //splicing a todo by :id if match is found...
app.delete('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});

    if(!matchedTodo) {
        res.status(404).json({"error" : "no todo found with that id"});
    } else {
        todos = _.without(todos, matchedTodo);
        res.json(matchedTodo);
        console.log(matchedTodo);
    }
});

// UPDATE /todos/:id       //updating an existing content from the todos

app.put('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, { id: todoId });
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    if(!matchedTodo) {
        return res.status(404).send();
    }

    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    } else {
        return res.send(444).json({"error": "I no sabi wetin dhe happen! "});
    }
    
    if (body.hasOwnProperty('description') && _.isString(body.description) 
        && body.description.trim().length > 0) {
            validAttributes.description = body.description;
        } else if(body.hasOwnProperty('description')) {
            return res.status(400).send();
        }

    _.extend(matchedTodo, validAttributes);
    res.json(matchedTodo);

});

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
    console.log('Express is listening on PORT: ' + PORT + '!');
});
});


        