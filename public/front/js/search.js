$(function () {


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
})