var db = require("../models");

module.exports = function(app){

	app.get("api/transactions", function(req, res){
		db.Transaction.findAll({
		}).then(function(dbTransaction){
			res.json(dbTransaction);
		});
	});
}