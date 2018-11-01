$(function () {  
  var currentPage=1;
  var pageSize=5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page:currentPage,
        pageSize:pageSize
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var str=template('tmp',info) 
        // console.log(str);
        $('tbody').html(str);
        
  
        // 分页功能实现  根据数据库ajax返回的数据动态渲染
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            // console.log(page);
            currentPage=page;
            render(page)
            
          }
        });
      }
    });
    
  }

  //点击添加分类按钮   模板引擎显示
  $('#addClass').on('click',function () {  
    $('#addModal').modal('show');
  })
  //使用表单校验插件
$('#form').bootstrapValidator({
  //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  excluded: [':disabled', ':hidden', ':not(:visible)'],

  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    categoryName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入一级分类'
        },
        
      }
    },
  }

});

$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    type: "post",
    url: "/category/addTopCategory",
    data: $('#form').serialize(),
    dataType: "json",
    success: function (info) {
      // console.log(info);
      if (info.success) {
        $('#addModal').modal('hide');
        currentPage=1;
        render();
        $("#form").data('bootstrapValidator').resetForm(true)
      }
          
    }
  });
});
  
})