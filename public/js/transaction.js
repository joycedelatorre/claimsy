var userId = GetQueryStringParams("userId");


  function getFirstNameLastName(){
    $.get("/api/users/"+userId, function(data){
      console.log(data);
      $("#transacUname").html(data.firstName + " " + data.lastName);
    });
  }

  function getTransactions(){
    $.get("/api/transactions/"+userId, function(data){
      //console.log(data[0]);
      var rowsToAdd =[];
      for(var i =0; i < data.length; i++){
        rowsToAdd.push(data[i]);
        //console.log(data[i]);
      }
      renderTransacList(rowsToAdd);
    });
  }

//ref:https://stackoverflow.com/questions/7196238/populate-html-table-with-jquery  
  function renderTransacList(rows){ //this will render all the transactions of a user
    //console.log(rows[0]);
    $( ".lTransac" ).remove();
    var counter =0;
    for(var i=0; i<rows.length; i++){
      counter += 1;
      $(".table-striped").append("<tr class='lTransac' id="+rows[i].id+"><td>" + rows[i].provider +
       "</td><td>"+rows[i].description+"</td><td>"+ rows[i].amount+
       "</td><td><input disabled type=text value='"+ rows[i].status +"'/></td><td>"+ rows[i].createdAt+
       "</td><td> <button class='btn btn-success edit'> Edit </button></td> <td> <button class='btn btn-success delete'>Delete</button> </td></tr>"
      );
    }
    addDeleteEvent();
  }

//ref: *** http://www.jquerybyexample.net/2012/05/how-to-get-querystring-value-using.html
//https://stackoverflow.com/questions/4656843/jquery-get-querystring-from-url

  function GetQueryStringParams(sParam){ // this is to extract the userId from the query parameter
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++)
      {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
          return sParameterName[1];
        }
      }
  }


  function insertTransaction(transactionData){
    $.post("/api/new", transactionData)
      .then(getTransactions);
  }

//--------------------------- DELETE TRANSACTION DATA
  function addDeleteEvent() {
    $(".table-striped").on("click", ".delete", function() {
      // console.log("test");
      var rowId = $(this).parent("td").parent("tr").attr('id');
      console.log(rowId);
      $(this).closest("tr").remove();
      $.ajax({
        method:"DELETE",
        url:"/api/transactions/" + rowId
      }) .done(getTransactions());
    });
  }


  function addEditEvent(){
    $(".table-striped").on("click", ".edit", function(){
      var rowId = $(this).parent("td").parent("tr").attr('id');
    });
  }

$(document).ready(function(){

  getFirstNameLastName();

//--------------------- READ TRANSACTION DATA
  $("#listTransac").on("click", function(event){ //to get all the transaction data from DB
    // event.preventDefault();
    getTransactions();
  });


//--------------------------- CREATE TRANSACTION DATA
  $("#add").on("click", function(event){
  event.preventDefault();
    insertTransaction(
      {
        provider:$("#providerInput").val().trim(),
        description:$("#descriptionInput").val().trim(),
        amount:$("#amountInput").val().trim(),
        status:$("#statusInput").val().trim(),
        UserId:userId
      }
    );
  });


//--------------------------- UPDATE TRANSACTION DATA


//---------------------------- user logout

  $("#LogOut").on("click", function(event){
    event.preventDefault();
    window.location = "/";
  })

});













