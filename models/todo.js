module.exports = function (sequelize, DataTypes) {
	return sequelize.define('todo', {
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 255]
				},
				defaultValue: 'No description Found'
			},
			completed: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		});
};