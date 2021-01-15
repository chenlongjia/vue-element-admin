<template>
  <el-card>
    <el-button
      @click="info.isShow = !info.isShow"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >新增</el-button
    >
    <el-divider />
    <!-- 调用列表List组件 -->
    <List :cateList="cateList" @updateList="updateList" />

    <!-- 调用Model组件 -->
    <Model :info="info" @updateList="updateList" />
  </el-card>
</template>

<script>
//导入子组件
import List from "./List";
import Model from "./Model";
//导入vuex辅助方法
import { mapState, mapActions } from "vuex";
export default {
  created() {
    //请求数据列表
    this.getCateListAction();
  },
  data() {
    return {
      info: {
        isShow: false,
      },
    };
  },
  components: {
    List,
    Model,
  },
  computed: {
    //简写版
    // ...mapState({
    //   cateList:state=>state.cate.cateList
    // })
    ...mapState({
      //系统自动注入  数据存储对象
      cateList: function (state) {
        return state.cate.cateList;
      },
    }),
  },
  methods: {
    ...mapActions("cate", ["getCateListAction"]),
    updateList() {
      this.getCateListAction();
    },
  },
};
</script>

<style>
</style>