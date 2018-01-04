var Sequelize =  require('sequelize');
var sequelize =  new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

//setting the rules for the todo(s) to be accepted
var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 255]
		},
		defaultValue: 'No description Found'
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({
	// force: true      //----This auto-clear the data in the table
}).then(function () {
	console.log('Everything is synched');


//   //To get all data in our database, we do
	return Todo.findAll({
		where: {
			completed: false,
			description: {
				$like: '%Get%'
			}
		}
	}).then(function (todos) {
		if(todos) {
			todos.forEach(function (todo) {
				console.log(todo.toJSON());
			})
		} else {
			console.log('Not found');
		}
	}).catch(function (e) {
		console.log(e);
	});
});

// //for individual data given 

// return Todo.findById(2).then(function () {
// 	if(todo) {
// 		console.log(todo.toJSON());
// 	} else {
// 		console.log('not found');
// 	}
// })
// 	Todo.create({
// 		description: "Get more ahead in node, its getting more interesting",
// 		completed: false
// 	}).then(function (todo) {
// 		return Todo.create({
// 			description: 'Get to Rashford to update your package'
// 		});
// 	}).then(function () {
// 		// return Todo.findById(1);  //------this will get Todo by the id passed-----
// 		return Todo.findAll({
// 			where: {
// 				// completed: false  //-----generic searching------
// 				description: {
// 					$like: '%Get%'
// 				}
// 			}
// 		})
// 	}).then(function(todos) {
// 		if(todos) {
// 			todos.forEach(function (todo) {
// 				console.log(todo.toJSON());
// 			});
// 		} else{
// 			console.log('no todo found');
// 		}
// 	}).catch(function (e) {
// 		console.log(e);
// 	});

// });

