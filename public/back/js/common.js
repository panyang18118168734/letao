// 配置禁用小圆环
NProgress.configure({
  showSpinner: false
});
$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {

  //模拟网络加载的时间
  setTimeout(function () {
    // console.log(1);

    NProgress.done();
  }, 500);

});







$(function () {
  //  切换二级菜单
  $('.lt_aside .nav .category').on('click', function () {
    $(this).next().stop().slideToggle();
  });
  //顶部菜单切换
  $('.lt_main .it_topbar .icon_menu').on('click', function () {
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.it_topbar').toggleClass('hidemenu');
  });

  //退出模态框
  $('#logbtn').on('click', function () {
    // alert('msg');
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function (info) {
        console.log(info);

        if (info.success) {
          location.href = 'login.html'
        }

      }
    });
  });
})