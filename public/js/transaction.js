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
       "</td><td class='edit_td'><input disabled class='edit_Input' type=text value='"+ rows[i].status +"'/></td><td>"+ rows[i].createdAt+
       "</td><td> <button class='btn btn-success edit'> Edit </button></td> <td> <button class='btn btn-success delete'>Delete</button> </td></tr>"
      );
    }
    addDeleteEvent();
    addEditEvent();
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


//ref:https://codepedia.info/remove-table-row-tr-in-jquery/
//--------------------------- DELETE TRANSACTION DATA
  function addDeleteEvent() {
    $(".table-striped").on("click", ".delete", function() {
      // console.log("test");
      var rowId = $(this).parent("td").parent("tr").attr('id');
      console.log(rowId);
      $(this).closest("tr").remove();  //------------- CHECK OUT THIS LINE STIL WORKS!!!! this removes the row when delete is clicked
      $.ajax({
        method:"DELETE",
        url:"/api/transactions/" + rowId
      }).done(getTransactions());
    });
  }


//ref: https://stackoverflow.com/questions/22745903/enable-disable-controls-in-a-table-row

// whenever I separate the saveUpdate and cancel update into different functions 
// gets called many times
  function addEditEvent(){
    $(".table-striped").on("click", ".edit", function(){
      event.preventDefault();
      $(this).closest('tr').find('.edit_Input').prop('disabled', false);
      $(this).closest('tr').find('.edit').html('Save');
      $(this).closest('tr').find('.edit').addClass('save');
      $(this).closest('tr').find('.edit').removeClass('edit');
      $(this).closest('tr').find('.delete').html('Cancel');
      $(this).closest('tr').find('.delete').addClass('cancel');
      $(this).closest('tr').find('.delete').removeClass('delete');
    });


    // saveUpdate();
    $(".table-striped").on("click", ".save", function(){
      var saveInstanceId = $(this).parent("td").parent("tr").attr('id');
      console.log(saveInstanceId);
      console.log($(".edit_Input").val());
      $.ajax({
        method:"PUT",
        url:"/api/transactions",
        data:
        {
        id:saveInstanceId,
        status:$(".edit_Input").val().trim()
        }
      }).done();
      $(this).closest('tr').find('.edit_Input').prop('disabled', true);
      $(this).closest('tr').find('.cancel').html('Delete');
      $(this).closest('tr').find('.cancel').addClass('delete');
      $(this).closest('tr').find('.cancel').removeClass('cancel');

      $(this).closest('tr').find('.save').html('Edit');
      $(this).closest('tr').find('.save').addClass('edit');
      $(this).closest('tr').find('.save').removeClass('save');
    });
    // cancelUpdate
     $(".table-striped").on("click", ".cancel", function(){
      $(this).closest('tr').find('.edit_Input').prop('disabled', true);
      $(this).closest('tr').find('.cancel').html('Delete');
      $(this).closest('tr').find('.cancel').addClass('delete');
      $(this).closest('tr').find('.cancel').removeClass('cancel');

      $(this).closest('tr').find('.save').html('Edit');
      $(this).closest('tr').find('.save').addClass('edit');
      $(this).closest('tr').find('.save').removeClass('save');
      getTransactions();
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

//---------------------------- user logout

  $("#LogOut").on("click", function(event){
    event.preventDefault();
    window.location = "/";
  });

});













