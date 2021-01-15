<template>
  <el-card>
    <el-button
      @click="info.isShow = !info.isShow"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >新增</el-button
    >
    <el-divider />
    <!-- 调用子组件List -->
    <List
      @updateList="updateList"
      @sendData="sendData"
      :specsList="specsList"
      :specsTotal="specsTotal"
      :size="size"
    />
    <!-- 调用子组件Model -->
    <Model :info="info" @updateList="updateList" />
  </el-card>
</template>

<script>
import List from "./List";
import Model from "./Model";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      info: {
        isShow: false,
      },
      page: 1,
      size: 2,
    };
  },
  created() {
    //请求数据列表
    this.getSpecsListAction({ page: this.page, size: this.size });
    this.getSpecsTotalAction();
  },
  //数据映射vuex中管理的子模块的state
  computed: {
    ...mapState({
      specsList: (state) => state.specs.specsList,
      specsTotal: (state) => state.specs.specsTotal,
    }),
  },
  components: {
    List,
    Model,
  },
  methods: {
    ...mapActions("specs", ["getSpecsListAction", "getSpecsTotalAction"]),
    //自定义事件处理函数
    sendData(page) {
      //更新page
      this.page = page;
      //更新数据列表
      this.getSpecsListAction({ page: this.page, size: this.size });
    },
    updateList() {
      this.getSpecsListAction({ page: this.page, size: this.size });
      this.getSpecsTotalAction();
    },
  },
};
</script>

<style>
</style>