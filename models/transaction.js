module.exports = function(sequelize, DataTypes){
  	var Transaction = sequelize.define("Transaction", {
  		provider:{
  			type:DataTypes.STRING,
  			allowNull:false,
  		},
		description:{
			type:DataTypes.STRING,
			allowNull:false,
		},
		amount:{
			type:DataTypes.INTEGER,
			allowNull:false,
		},
		status:{
			type:DataTypes.STRING,
			allowNull:false,
		}
	});

	Transaction.associate = function(models){
		Transaction.belongsTo(models.User, {
			foreignKey:{
				allowNull: false
			}
		});
	};
	return Transaction
};