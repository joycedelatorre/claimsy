var db = require("../models");

module.exports = function(app){

//-------- list all transactions
  app.get("/api/transactions/:id", function(req, res){
    var userId = req.params.id;
    db.Transaction.findAll({
      where:{
        UserId: userId
      }
    }).then(function(dbTransaction){
      res.json(dbTransaction);
    });
  });

//--------- create new transactions
  app.post("/api/new", function(req, res) {
    db.Transaction.create(req.body).then(function(dbTransaction) { 
      res.json(dbTransaction);
    });
  });

//---------- delete
  app.delete("/api/transactions/:id", function(req, res){
    db.Transaction.destroy({
      where:{
        id:req.params.id
      }
    }).then(function(dbTransaction){
      res.json(dbTransaction);
    });
  });

//----------- edit/ update
   app.put("/api/transactions", function(req, res) {
    db.Transaction.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTransaction) {
        res.json(dbTransaction);
      });
  });

};