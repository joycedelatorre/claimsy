$(document).ready(function(){
  //$(document).on("click","#listTransac", getTransac);

  //function getTransac(event){
  $("#listTransac").on("click", function(event){
    event.preventDefault();
    //console.log("whatever doesnt matter semicolon ah");
    var userId = GetQueryStringParams("userId");
    $.get("/api/transactions/"+userId, function(data){
      //console.log(data[0]);
      var rowsToAdd =[];
      for(var i =0; i < data.length; i++){
        rowsToAdd.push(data[i]);
      }
      renderTransacList(rowsToAdd);
    })
  });

  function renderTransacList(rows){
    //console.log(rows[0]);
    // if(rows.length){
      //console.log(rows);
        //$(".data-row").append(rows[0].description);
        for(var i=0; i<rows.length; i++){
          $(".data-prov").append(rows[i].provider);
          $(".data-desc").append(rows[i].description);
          $(".data-amt").append(rows[i].amount);
          $(".data-stat").append(rows[i].status);
          $(".data-date").append(rows[i].createdAt);
        }
    // }
    // else {
      //renderEmpty();
      // console.log("empty");
    // }
  }

});



function GetQueryStringParams(sParam){
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

