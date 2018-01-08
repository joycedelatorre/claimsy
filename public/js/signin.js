$(document).ready(function() {

    $('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });
  $('#register-form-link').click(function(e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });

//--------------- login a user
  $("#login-submit").on("click", function(event){
    event.preventDefault();

    var uname = $("#username").val();
    var paswrd = $("#password").val();

    $.ajax({
      method:"POST",
      url:"/api/users/authenticate",
      data: {username:uname, password:paswrd}
    }).done(function(msg){
      console.log(msg);
      if(msg.auth === true){
//ref:https://stackoverflow.com/questions/4744751/how-do-i-redirect-with-javascript
        window.location = "/transactions?userId="+msg.userId; // this will redirect to transactions.html
      } else {
        alert("invalid username/password");
      }
    });
  });

//--------------register or create a user 
  $("#register-submit").on("click", function(event){
    event.preventDefault();
    var fname = $("#register_firstname").val();
    var lname = $("#register_lastname").val();
    var uname = $("#register_username").val();
    var paswrd = $("#register_password").val();
    var conf_password = $("#confirm-password").val();
    console.log(conf_password);
    console.log(paswrd);

    if(conf_password === paswrd){
      //ajax should go here
      $.ajax({
        method:"POST",
        url:"/api/new/user",
        data:{
          firstName: fname,
          lastName: lname,
          username: uname,
          password: paswrd
        }
      }).done(function(msg){
        window.location="/"; 
        });
      // confirm use that registering was successful else ask user to check credentials
      // redirect user to the login page

    } else{
      alert("Please check your credentials");
    }
  });

});



//Notes: Add trim to password