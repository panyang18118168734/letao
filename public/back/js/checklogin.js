 //一进页面就需要判断一下是否已经登录
 $(function () {  
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function (info) {
      console.log(info);
      if (info.success) {
        console.log('已登录');
      }
      if (info.error==400) {
        location.href='login.html'
      }
    }
  });
})