$(function () {
  // 获取穿过来的id
  var productId = getSearch('productId');
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    dataType: "json",
    success: function (info) {
      console.log(info);
      var str = template('tmp', info);
      $('.lt_main .mui-scroll').html(str)
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
      mui('.mui-numbox').numbox()
    }
  });

  //点击事件
  $('.lt_main .mui-scroll').on('click','.lt_size span' ,function () {  
    // alert('msg');
    $(this).addClass('current').siblings().removeClass('current')
  })

  // 点击购物车跳转页面   如果登录过就跳转个人页面
  //                  如果没有登录跳转跳转登录页面
  /*
  - 接口名称
  添加购物车 （需要登录）
- 接口地址
  /cart/addCart
- 请求方式
  POST
- 参数说明

  参数名称     	是否必须	说明  
  productId	是   	产品id
  num      	是   	产品数量
  size     	    	    
  */ 
 $('#addCart').on('click',function () {  
   var productId=getSearch('productId');
  //  console.log(productId);
  var num=$('input[type="number"]').val();
  // console.log(num);
  var size=$('.lt_size span.current').text();
  if (!size) {
    mui.toast('请选择尺码');
    return;  
  }
  $.ajax({
    type: "POST",
    url: "/cart/addCart",
    data:{
      productId:productId,
      num:num,
      size:size
    },
    dataType: "json",
    success: function (info) {
      console.log(info);
      if (info.error==400) {
        //跳转到登录页面并且在登录完成后返回产品页
        location.href="login.html?retUrl"+location.href;

      }
      if (info.success) {
        mui.confirm( '添加成功', '温馨提示', ['去购物车','继续浏览'],function (e) {  

          console.log(e);
          if (e.index==0) {
            
            location.href="user.html"
          }
          
        })


      }
    }
  });
  
  
   
 })

})