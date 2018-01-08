var db = require("../models");

module.exports = function(app){
	app.post("/api/users/authenticate", function(req, res){
		db.User.findOne({
			where:{
				username:req.body.username,
				password:req.body.password
			}
		}).then(function(dbUser){
			//console.log(dbUser);
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

//below code is to get the firstname and lastname of user
	app.get("/api/users/:id", function(req, res){
		db.User.findOne({
			where:{
				id:req.params.id,
			}
		}).then(function(dbUser){
			//console.log(dbUser);
			var claimsyUser = {
				firstName: dbUser.firstName,
				lastName: dbUser.lastName
			}
			res.json(claimsyUser);
		})
	})
}