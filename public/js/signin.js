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

});