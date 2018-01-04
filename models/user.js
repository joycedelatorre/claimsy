module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User",{
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		deductible: DataTypes.INTEGER
	});

	User.associate = function(models){
		User.hasMany(models.Transaction,{
			onDelete:"cascade"
		});
	};

	User.associate = function(models){
		User.belongsTo(models.Provider,{
			foreignKey:{
				allowNull:false
			}
		});
	};

	return User;

}