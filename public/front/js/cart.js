$(function () {  
  $.ajax({
    type: "get",
    url: "/cart/queryCart",
    dataType: "json",
    success: function (info) {
      
      var str =template('tmp',{list:info})
      console.log({list:info});
      $('.lt_main .mui-scroll').html(str);
    }
  });


  $('#')



})