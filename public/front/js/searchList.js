$(function () {  

  var key=getSearch("key");
  // console.log(key);
  $('.input_btn').val(key);

  $.ajax({
    type: "get",
    url: "/product/queryProduct",
    data: {
      proName:key,
      page:1,
      pageSize:100,
    },
    dataType: "json",
    success: function (info) {
      console.log(info);
      
    }
  });

})