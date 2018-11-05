$(function () {

  var key = getSearch("key");
  // console.log(key);
  $('.input_btn').val(key);

  render();

  function render() {

    $('#productUl').html("<div class="+"loading"+"></div>")

    var obj = {};
    obj.proName = $('.input_btn').val();
    obj.page = 1;
    obj.pageSize = 100;
    // console.log(obj);
    if ($('.lt_sort a.current').length > 0) {
      var sortName = $('.lt_sort a.current').data('type');
      var sortValue = $('.lt_sort a.current').find('i').hasClass('fa-angle-down') ? 2 : 1;
      obj[sortName] = sortValue;
    }
    setTimeout(function () {  
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: obj,
        dataType: "json",
        success: function (info) {
          console.log(info);
          var str = template('tmp', info);
          $('#productUl').html(str);
        }
      });

    },1000)

  }


  //点击按钮搜索关键字
  $('.search_btn ').on('click', function () {
    render()
  })

  //点击a标签来控制商品的升降级
  $('.lt_sort a[data-type]').on('click', function () {
    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
      
    }else{
      $(this).addClass('current').siblings().removeClass('current');
    }
    render();
  })


})