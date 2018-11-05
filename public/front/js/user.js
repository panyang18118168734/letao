$(function () {  
  $.ajax({
    type: "GET",
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function (info) {
      console.log(info);
      var  str =template('tmp',info);
      $('#userInfo').html(str)
    }
  });

  $('#logout').on('click',function () {  
   $.ajax({
     type: "get",
     url: "/user/logout",
     dataType: "json",
     success: function (info) {
      //  console.log(info);
       if (info.success) {
         location.href="login.html"
       }
     }
   });
  })
})