var db = require("../models");

module.exports = function(app){

  app.get("/api/transactions/:id", function(req, res){ //list all transaction
    var userId = req.params.id;
    db.Transaction.findAll({
      where:{
        UserId: userId
      }
    }).then(function(dbTransaction){
      res.json(dbTransaction);
    });
  });

  app.post("/api/new", function(req, res) { //create new transaction
    db.Transaction.create(req.body).then(function(dbTransaction) { 
      res.json(dbTransaction);
    });
  });

  app.delete("/api/transactions/:id", function(req, res){
    db.Transaction.destroy({
      where:{
        id:req.params.id
      }
    }).then(function(dbTransaction){
      res.json(dbTransaction);
    });
  });

};