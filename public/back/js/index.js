 // 基于准备好的dom，初始化echarts实例
 var myChart = echarts.init(document.querySelector('.echarts_1'));

 // 指定图表的配置项和数据
 var option = {
   title: {
     text: 'ECharts 入门示例'
   },
   tooltip: {},
   legend: {
     data: ['人数', '销量']
   },
   xAxis: {
     data: ["1月", "2月", "3月", "4月", "5月", "6月"]
   },
   yAxis: {},
   series: [{
       name: '人数',
       type: 'bar',
       data: [1000, 500, 800, 300, 1500, 2000]
     },
     {
       name: '销量',
       type: 'bar',
       data: [5000, 4000, 4800, 3000, 2500, 6500]
     }
   ]
 };

 // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option);


 var myChart1 = echarts.init(document.querySelector('.echarts_2'));
 var option1 = {
   title: {
     text: '热门品牌销售',
     subtext: '2017年4月',
     x: 'center'
   },
   tooltip: {
     trigger: 'item',
     formatter: "{a} <br/>{b} : {c} ({d}%)"
   },
   legend: {
     orient: 'vertical',
     left: 'left',
     data: ['耐克', '阿迪', '新百伦', '李宁', '新百伦']
   },
   series: [{
     name: '访问来源',
     type: 'pie',
     radius: '55%',
     center: ['50%', '60%'],
     data: [{
         value: 335,
         name: '耐克'
       },
       {
         value: 310,
         name: '阿迪'
       },
       {
         value: 234,
         name: '新百伦'
       },
       {
         value: 135,
         name: '李宁'
       },
       {
         value: 1548,
         name: '新百伦'
       }
     ],
     itemStyle: {
       emphasis: {
         shadowBlur: 10,
         shadowOffsetX: 0,
         shadowColor: 'rgba(0, 0, 0, 0.5)'
       }
     }
   }]
 };


 myChart1.setOption(option1);