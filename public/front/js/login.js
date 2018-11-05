$(function () {

  $('#loginBtn').on('click', function () {
    var name = $('#username').val().trim();
    var password = $('#password').val().trim();
    if (name === '') {
      mui.toast('用户名或密码错误');
      return;
    }
    if (password === '') {
      mui.toast('用户名或密码错误');
      return;
    }
    $.ajax({
      type: "POST",
      url: "/user/login",
      data: {
        username: name,
        password: password
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        // console.log(info);
        if (info.error===403) {
          mui.toast('用户名或密码错误');
          return;
        }
        if (info.success) {
          if (location.search.indexOf('retUrl')!=-1) {
            var retUrl=location.search.replace('?retUrl','');
            location.href=retUrl;
          }else{
            location.href="user.html"
          }
          
        }


      }
    });



  })
})