$(function () {
  render()
  function render() {
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
    
  }


  $('.lt_main .mui-scroll').on('click','.btn_delete',function () {  
    var id= $(this).data('id');
    // console.log(id);
    $.ajax({
      type: "get",
      url: "/cart/deleteCart",
      data: {
        id:[id]
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        render()
      }
    });
    
  })



})