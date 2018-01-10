module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User",{
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		deductible: DataTypes.INTEGER,
		username:DataTypes.STRING,
		password:DataTypes.STRING
		// username:DataTypes.STRING, unique, this is for passport
		// password:DataTypes.BINARY
	});

	User.associate = function(models){
		User.hasMany(models.Transaction,{
			onDelete:"cascade"
		});
	};
	return User;

}