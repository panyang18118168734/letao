$(function () {


  //获取本地数据

  function getHistory() {
    var jsonStr = localStorage.getItem('search_list') || "[]";
    var arr = JSON.parse(jsonStr);
    return arr;
  }
  //渲染页面
  function render() {
    var arr = getHistory();
    var str = template('tmp', {
      info: arr
    });
    console.log({
      info: arr
    });
    $('.lt_history').html(str)
  }
  //功能一:搜索历史记录渲染

  render();

  //清空数据
  $('.lt_history').on('click', '.btn_clear', function () {
    // alert('msg');
    //清空数据
    mui.confirm('你确定要清空历史记录嘛?', '温馨提示', ['取消', "确定"], function (e) {

      // console.log(e);
      if (e.index === 1) {
        localStorage.removeItem('search_list');
        render();
      }


    })


  });


  //删除单个功能
  $('.lt_history').on('click', '.btn_delete', function () {

    mui.confirm('你确定要清空历史记录嘛?', '温馨提示', ['取消', "确定"], function (e) {

      // console.log(e);
      if (e.index === 1) {
        // localStorage.removeItem('search_list');
        var arr = getHistory();
        var index = $(this).data('index');
        arr.splice(index, 1);
        localStorage.setItem('search_list', JSON.stringify(arr));
        render();
      }


    })
  });

  //添加搜索历史功能
  $('.search_btn ').on('click', function () {
    var key =$('.input_btn').val().trim();
    // console.log(key);

    //当前没有添加值
    if (key==="") {
      mui.toast('请输入搜索关键字');
      return;
    }

    //当前有添加值
    var arr=getHistory();
    var index=arr.indexOf(key);
    if (index!=-1) {
      arr.splice(index,1)
    }
    if (arr.length>=10) {
      arr.pop();
    }

    arr.unshift(key);

    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
    $('.input_btn').val('');

    location.href="searchList.html?key="+key;


  });


})