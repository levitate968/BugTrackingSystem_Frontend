<template>
  <div id="myChart" style="width:60%;height: 300px"></div>
</template>

<script>
// import ECharts from 'vue-echarts'  // 在 webpack 环境下指向 components/ECharts.vue
/* 引入echarts工具 */
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
export default {
  name: 'EmployeeChart',
  data(){
    return{
      query:{},
      employee:{},
      dict:[],
    }
  },
  mounted(){
    var employeeString=localStorage.getItem("employee");
    this.employee=JSON.parse(employeeString);
    this.query.teamId=this.employee.teamId;

    this.$http.post("http://localhost:8989/chart/getEmployeeChart", this.query).then(res => {
      if(res.data.code=="000"){
        console.log(res.data.data);
        let xAxisdict=res.data.data.xaxisData;
        let yAxisdict=res.data.data.yaxisData;
        this.initData(xAxisdict,yAxisdict);
      }else{
        alert(res.data.data);
      }
    });
  },
  methods:{
    initData(xAxisData,yAxisData){
      var myChart = this.$echarts.init(document.getElementById('myChart'));//获取容器元素
      var option = {
        title : {
          text: '员工解决缺陷数量一览',//主标题
          x:'center',//x轴方向对齐方式
        },
        legend: {//图例
          data: ['解决数量'],//与series的name对应
          left: '75%',//图例的位置，可以用像素，可以用百分比，也可以用center，right等
          top: 12.5,//图例的位置
          itemWidth: 10,//图例图标的宽
          itemHeight: 10,//图例图标的高
          textStyle: {
            color: '#878787',//值的具体的颜色
          },
        },
        xAxis: {//x轴
          type: 'category',
          data:xAxisData,//x轴的数据
          //data: ['3月', '4月', '5月', '6月', '7月'],
          //splitLine: {show: false},//去除网格分割线
          // splitArea: {show: true},//保留网格区域
          axisLine: {//坐标线
            lineStyle: {
              type: 'solid',
              color: '#d8d8d8',//轴线的颜色
              width:'1'//坐标线的宽度
            }
          },
          axisTick: {//刻度
            show: false//不显示刻度线
          },
          axisLabel: {
            textStyle: {
              color: '#878787',//坐标值的具体的颜色
            }
          },
          splitLine: {
            show: false//去掉分割线
          },
        },
        backgroundColor: '#fff',//图得背景色
        yAxis: {
          name: '单位：次',//轴的名字，默认位置在y轴上方显示
          max: 30,//最大刻度
          type: 'value',
          axisLine: {//线
            show: false
          },
          axisTick: {//刻度
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#878787',//坐标值得具体的颜色
            }
          },
          minInterval: 5,//标值的最小间隔
          splitLine: {
            lineStyle: {
              color: ['#f6f6f6'],//分割线的颜色
            }
          }
        },
        series: [{
          name: '解决数量',//每组数据的名字，与图例对应
          data: yAxisData,//数据
          //data: [20, 20, 22, 18, 22],
          type: 'bar',//柱状图
          itemStyle: {
            normal: {
              color: '#FD6B71',//设置柱子颜色
              label: {
                show: true,//柱子上显示值
                position: 'top',//值在柱子上方显示
                textStyle: {
                  color: '#FD6B71'//值得颜色
                }
              }
            }
          },
          barWidth: 15//设置柱子宽度，单位为px
        }],
      };
      myChart.setOption(option);//设置option
    }
  },

}
</script>

<style scoped >
  #myChart{
    position: absolute;
    left: 20%;

  }
</style>
