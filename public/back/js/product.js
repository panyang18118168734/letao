$(function () {
  var currentPage = 1; //当前页
  var pageSize = 2 //当前一页数量
  // 1.渲染页面
  render();

  //申明一个数组
  var picArr = [];

  function render() {
    $.ajax({
      type: "GET",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        //进行数据绑定
        var str = template('productTmp', info);
        $('tbody').html(str);

        //进行分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            // console.log(page);
            currentPage = page;
            render()
          }
        });
      }
    });

  }
  //2.点击添加商品 弹出模态框
  $('#addBtn').on('click', function () {
    $('#addModal').modal('show');
    //点击添加商品发送ajax请求
    $.ajax({
      type: "GET",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        console.log(info);

        //进行数据绑定
        var str = template('dropdownTmp', info);
        $('.dropdown-menu').html(str);
      }
    });
  });

  //3.点击a让选择按钮的文字改为下拉栏的文字
  $('.dropdown-menu').on('click', 'a', function () {
    // alert('msg');
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
    $("#form").data('bootstrapValidator').updateStatus('brandId', 'VALID');

  });

  //文件上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data.result);
      var obj = data.result;    
      var objUrl = obj.picAddr;
      picArr.unshift(obj);
      console.log(picArr);
      
      $('#imgBox').prepend('<img src="' + objUrl + '" alt="">');
      if (picArr.length > 3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      //如果上传的图片正好是3张,就将校验状态改为√
      if (picArr.length == 3) {
        $("#form").data('bootstrapValidator').updateStatus('picStatus', 'VALID')
      }

    }
  });

  //文件上传表单校验
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
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          },

        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          },

        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品描述'
          },

        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式必须是 xx-xx 的格式, 例如: 32-40'
          }

        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          },

        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品现价'
          },

        }
      },
      picStatus: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传3张图片'
          },

        }
      },
    }

  });

  //表单校验成功
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var str=$('#form').serialize();
    str+='&picName1='+picArr[0].picName +'$picAddr1='+ picArr[0].picAddr;
    str+='&picName1='+picArr[1].picName +'$picAddr1='+ picArr[1].picAddr;
    str+='&picName1='+picArr[2].picName +'$picAddr1='+ picArr[2].picAddr;
    // console.log(str);
    
  	$.ajax({
      type: "post",
      url: "/product/addProduct",
      data: str,
      dataType:'json' ,
      success: function (info) {
        // console.log(info);
        if (info.success) {
          $('#addModal').modal('hide');
          currentPage=1;
          render();
          $("#form").data('bootstrapValidator').resetForm(true);
          $('#dropdownText').text('请选择二级分类');
          
          $('#imgBox img').remove();
        }
      }
    });
});



})