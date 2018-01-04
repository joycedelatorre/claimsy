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

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
	db.Provider.create({
		name:"Aetna",
	});
	db.Provider.create({
		name:"Medicare",
	});
	db.Provider.create({
		name:"Kaiser",
	});
	db.User.create({
		firstName: "Joyce",
		lastName: "Delt",
		deductible:1000,
		ProviderId:1
	});
	db.User.create({
		firstName: "Patrick",
		lastName: "Delt",
		deductible:1000,
		ProviderId:2
	});
	db.User.create({
		firstName: "Carla",
		lastName: "Delt",
		deductible:1000,
		ProviderId:3
	});

	db.Transaction.create({
		amount: 60,
		description: "follow-up checkup",
		UserId:1
	});
	db.Transaction.create({
		amount: 300,
		description: "immunization",
		UserId:2
	});
	db.Transaction.create({
		amount: 1000,
		description: "cataract surgery",
		UserId:3
	});
	
	app.listen(PORT, function() {
	  console.log("App listening on PORT " + PORT);
	});
});
