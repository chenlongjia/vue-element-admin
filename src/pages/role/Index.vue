<template>
  <el-card>
    <el-button
      @click="info.isShow = !info.isShow"
      icon="el-icon-circle-plus-outline"
      type="primary"
      >新增</el-button
    >
    <el-divider />
    <!-- 调用List组件 -->
    <List :roleList="roleList" @updateList="updateList" />
    <!-- 调用模态框组件 -->
    <Model :info="info" @updateList="updateList" />
  </el-card>
</template>

<script>
//导入子组件
import Model from "./Model";
import List from "./List";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      roleList: (state) => state.role.roleList,
    }),
  },
  methods: {
    ...mapActions("role", ["getRoleListAction"]),
    updateList() {
      this.getRoleListAction();
    },
  },
  components: {
    Model,
    List,
  },
  created() {
    this.getRoleListAction();
  },
  data() {
    return {
      info: {
        //控制模态框的显示状态
        isShow: false,
      },
    };
  },
};
</script>

<style>
</style>