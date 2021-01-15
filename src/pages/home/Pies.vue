<template>
  <v-echarts :options="pieOptions" />
</template>

<script>
//导入vue-echarts
import VueEcharts from "vue-echarts";
//导入标题组件
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
//绘制折线图的工具
import "echarts/lib/chart/pie";
export default {
  created() {
    this.getEchartData();
  },
  components: {
    "v-echarts": VueEcharts,
  },
  data() {
    return {
      pieOptions: {
        title: {
          text: "饼状图",
        },
        //鼠标悬浮的提示
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          top: 40,
          data: [],
        },
        series: [
          {
            name: "所占比重",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
                color: "auto",
              },
            },
            labelLine: {
              show: false,
            },
            data: [],
            // data: [
            //   { value: 335, name: "直接访问" },
            //   { value: 310, name: "邮件营销" },
            //   { value: 234, name: "联盟广告" },
            //   { value: 135, name: "视频广告" },
            //   { value: 1548, name: "搜索引擎" },
            // ],
          },
        ],
      },
    };
  },
  methods: {
    //图表数据请求
    getEchartData() {
      this.$http.get("/charts").then((res) => {
        if (res.code == 200) {
          //更新数据对象
          // console.log(res.list);
          const legend = [];
          const series = [];
          res.list.forEach((item) => {
            legend.push(item.month + "月");
            series.push({ value: item.total, name: item.month + "月" });
          });
          // console.log(legend, series);
          //更新配置对象
          const config = {
            legend: {
              data: legend,
            },
            series: {
              data: series,
            },
          };
          //对象合并
          this.pieOptions = Object.assign(this.pieOptions, config);
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