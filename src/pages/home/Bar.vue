<template>
  <v-echarts :options="barOptions" />
</template>

<script>
//导入vue-echarts
import VueEcharts from "vue-echarts";
//导入标题组件
import "echarts/lib/component/title";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
//布局缩放的工具栏
import "echarts/lib/component/toolbox";
export default {
  created() {
    this.getEchartData();
  },
  components: {
    "v-echarts": VueEcharts,
  },
  data() {
    return {
      barOptions: {
        title: {
          text: "柱状图",
        },
        color: "#c23531",
        //布局缩放,下载的工具
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          data: [],
          // data: [
          //   "1月",
          //   "2月",
          //   "3月",
          //   "4月",
          //   "5月",
          //   "6月",
          //   "7月",
          //   "8月",
          //   "9月",
          //   "10月",
          //   "11月",
          //   "12月",
          // ],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [],
            // data: [
            //   100000,
            //   990000,
            //   220000,
            //   132000,
            //   200000,
            //   409000,
            //   590008,
            //   600010,
            //   200000,
            //   800000,
            //   600000,
            //   400000,
            // ],
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220,220,220,0.8)",
            },
          },
        ],
      },
    };
  },
  methods: {
    //请求图表数据
    getEchartData() {
      this.$http.get("/charts").then((res) => {
        if (res.code == 200) {
          // console.log(res.list);
          const xData = [];
          const series = [];
          res.list.forEach((item) => {
            xData.push(item.month + "月");
            series.push(item.total);
          });
          //更新配置对象
          const config = {
            xAxis: {
              data: xData,
            },
            series: {
              data: series,
            },
          };
          //对象合并
          this.barOptions = Object.assign(this.barOptions, config);
        }
      });
    },
  },
};
</script>

<style scoped>
.echarts {
  width: 1040px;
  margin: 0 auto;
}
</style>