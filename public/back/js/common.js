 $(function () {
   $(document).ajaxStart(function () {
     NProgress.start();
   });
   $(document).ajaxStop(function () {

     //模拟网络加载的时间
     setTimeout(function () {
       NProgress.done();

     }, 500)
   });




 })