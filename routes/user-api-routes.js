// var db = require ("../models");

// module.exports = function(app){
// 	app.get("/api/transactions", function(req, res){
// 		db.
// 	})
// }


var db = require("../models");

module.exports = function(app){
	app.post("/api/users/authenticate", function(req, res){
		db.User.findOne({
			where:{
				username: req.body.username,
				password:req.body.password
			}
		}).then(function(dbUser){
			console.log(dbUser);
			var result = {};
			if(dbUser === null){
				result.auth = false;
			} else{
				result.auth = true;
				result.userId = dbUser.id;
			}
			res.json(result);
		});
	});
}