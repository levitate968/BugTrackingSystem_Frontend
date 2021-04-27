<template>
  <div>
    <div class="pie">
      <div id="pie1">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main1" style="float:left;width:100%;height: 300px"></div>
      </div>
      <div id="pie2">
        <div id="main2" style="float:left;width:100%;height: 300px"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')


export default {
  name: "StatusChart",
  data(){
    return{
      query:{},
      employee:{},
      dict:[],
    }
  },
  created(){
    //this.getData();

  },
  mounted(){
    var employeeString=localStorage.getItem("employee");
    this.employee=JSON.parse(employeeString);
    this.query.teamId=this.employee.teamId;

    this.$http.post("http://localhost:8989/chart/getStatusChart", this.query).then(res => {
      //console.log(res.data);
      if(res.data.code=="000"){
        console.log(res.data.data);
        let dict=res.data.data;
        this.initData(dict);
      }else{
        alert(res.data.data);
      }
    });

  },
  methods:{
    //初始化数据
    initData(resultDict) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'));

      // 绘制图表
      myChart.setOption({
        title : {
          text: '缺陷清单状态一览',//主标题
          // subtext: '纯属虚构',//副标题
          x:'center',//x轴方向对齐方式
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
          data: ['已提交','已审核','已解决','已驳回']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:resultDict,
            // data:[
            //   {value:"335", name:'已提交'},
            //   {value:310, name:'已审核'},
            //   {value:234, name:'已解决'},
            //   {value:135, name:'已驳回'},
            // ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
    getData(){

    },

  }
}
</script>

<style scoped>

</style>
