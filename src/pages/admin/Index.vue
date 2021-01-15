<template>
  <el-card>
    <el-button
      @click="info.isShow = !info.isShow"
      icon="el-icon-circle-plus-outline"
      type="primary"
      >新增</el-button
    >
    <el-divider />
    <!-- 调用列表组件 -->
    <List
      @updatePage="updatePage"
      :size="size"
      :adminList="adminList"
      :adminTotal="adminTotal"
      @updateList="updateList"
    />
    <!-- 调用模态框组件 -->
    <Model @updateList="updateList" :info="info" />
  </el-card>
</template>

<script>
//导入vuex辅助方法
import { mapState, mapActions } from "vuex";
//导入列表组件
import List from "./List";
//导入模态框组件
import Model from "./Model";
export default {
  created() {
    this.getAdminListAction({ page: this.page, size: this.size });
    this.getAdminTotalAction();
  },
  data() {
    return {
      info: {
        //控制模态框显示/隐藏状态
        isShow: false,
      },
      // 页码数
      page: 1,
      //每页显示的条数
      size: 2,
    };
  },
  components: {
    List,
    Model,
  },
  computed: {
    ...mapState({
      adminList: (state) => state.admin.adminList,
      adminTotal: (state) => state.admin.adminTotal,
    }),
  },
  methods: {
    ...mapActions("admin", ["getAdminListAction", "getAdminTotalAction"]),
    //自定义事件
    updatePage(page) {
      //更新页码
      this.page = page;
      //重新请求数据列表
      this.getAdminListAction({
        page: this.page,
        size: this.size,
      });
    },
    //自定义事件updateList的事件处理函数
    updateList() {
      //更新数据列表
      this.getAdminListAction({ page: this.page, size: this.size });
      //更新数据总条数
      this.getAdminTotalAction();
    },
  },
};
</script>

<style scoped>
</style>