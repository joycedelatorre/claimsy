module.exports = function(sequelize, DataTypes){
  	var Transaction = sequelize.define("Transaction", {
		amount:{
			type:DataTypes.INTEGER,
			allowNull:false,
		},
		description:{
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