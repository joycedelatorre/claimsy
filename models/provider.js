module.exports = function(sequelize, DataTypes){
	var Provider = sequelize.define("Provider",{
		name:{
			type:DataTypes.STRING,
			allowNull:false,
			validate:{
				len:[1]
			}
		},
	});

	Provider.associate = function(models){
		Provider.hasMany(models.User, {
			onDelete:"cascade"
		});
	};
	return Provider;
};