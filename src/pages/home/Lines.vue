<template>
  <v-echarts :options="lineOptions" />
</template>

<script>
//导入vue-echarts
import VueEcharts from "vue-echarts";
import "echarts/lib/chart/line";
//导入标题组件
import "echarts/lib/component/title";
//布局缩放的工具栏
import "echarts/lib/component/toolbox";

export default {
  components: {
    "v-echarts": VueEcharts,
  },
  data() {
    return {
      lineOptions: {
        title: {
          text: "折线图",
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
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [860, 910, 900, 910, 1320, 1400, 1420],
            type: "line",
            areaStyle: {},
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.echarts {
  width: 1040px;
  margin: 0 auto;
}
</style>