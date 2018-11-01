$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var str = template('tmp', info);
        $('tbody').html(str);

        //配置分页插件
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            // console.log(page);
            currentPage = page;
            render(currentPage)

          }
        });
      }
    });

  }

  //显示模态框
  $('#addClass').on('click', function () {
    $('#addModal').modal('show');

    $.ajax({
      type: "GET",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var str = template('dropdownTmp', info);
        $('.dropdown-menu').html(str);
      }
    });




  });

  // 注册事件委托
  $('.dropdown-menu').on('click', 'a', function () {
    // alert('msg');
    var txt = $(this).text();
    // console.log(txt);
    $('#dropdownText').text(txt);
    var id = $(this).data('id');
    $("[name='categoryId']").val(id);
    //手动给隐藏域修改状态
    $("#form").data('bootstrapValidator').updateStatus('categoryId', 'VALID')
  });


  //配置文件上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data.result);
      var picAddr = data.result.picAddr;
      $('#imgBox img').attr('src', picAddr);
      $('[name="brandLogo"]').val(picAddr);
      $("#form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
  });

  //表单校验
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          },
         
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类'
          },
         
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传图片'
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
      url: "/category/addSecondCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (info) {
        if (info.success) {
          $('#addModal').modal('hide');
          currentPage=1;
          render();
          $("#form").data('bootstrapValidator').resetForm(true);
          $('#dropdownText').val('请选择一级分类');
          $('#imgBox img').attr('src',"./images/none.png")

        }
        
      }
    });
  	
});


})