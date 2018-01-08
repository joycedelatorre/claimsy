// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
// require("./routes/html-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);
   require("./routes/transaction-api-routes.js")(app);
   require("./routes/html-routes.js")(app);
   require("./routes/user-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
	
	db.User.create({
		firstName: "Joyce",
		lastName: "Delt",
		deductible:1000,
		username:"jdelt@gmail.com",
		password:"jdelt"
	});
	db.User.create({
		firstName: "Patrick",
		lastName: "Delt",
		deductible:2000,
		username:"pdelt@gmail.com",
		password:"pdelt"
	});
	db.User.create({
		firstName: "Carla",
		lastName: "Delt",
		deductible:3000,
		username:"cdelt@gmail.com",
		password:"cdelt"
	});

	db.Transaction.create({
		provider:"Aetna",
		description: "follow-up checkup",
		amount: 60,
		status:"paid",
		UserId:1
	});

	db.Transaction.create({
		provider:"Aetna",
		description: "follow-up checkup",
		amount: 100,
		status:"paid",
		UserId:1
	});

	db.Transaction.create({
		provider:"Medicare",
		description: "immunization",
		amount: 300,
		status:"not paid",
		UserId:2
	});
	db.Transaction.create({
		provider:"Kaiserpermanente",
		description: "cataract surgery",
		amount: 1000,
		status:"not paid",
		UserId:3
	});
	
	app.listen(PORT, function() {
	  console.log("App listening on PORT " + PORT);
	});
});
