module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User",{
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		deductible: DataTypes.INTEGER,
		username:DataTypes.STRING,
		password:DataTypes.STRING
	});

	User.associate = function(models){
		User.hasMany(models.Transaction,{
			onDelete:"cascade"
		});
	};
	return User;

}