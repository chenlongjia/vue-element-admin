<template>
  <el-card>
    <el-button
      @click="showModel"
      icon="el-icon-circle-plus-outline"
      type="primary"
      >新增</el-button
    >
    <el-divider />
    <!-- tree-props:指定二级菜单数据存储的属性节点名称 -->
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column prop="icon" label="图标">
        <!-- 接受组件内部发送的数据  props:属性的集合 -->
        <template v-slot="props">
          <i :class="props.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="props">
          <el-tag v-if="props.row.status == 1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="props">
          <el-button
            circle
            @click="edit(props.row)"
            size="mini"
            icon="el-icon-edit"
            type="success"
          ></el-button>
          <el-button
            circle
            @click="del(props.row.id)"
            size="mini"
            icon="el-icon-delete"
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 调用子组件Model -->
    <Model ref="modelRef" :info="info" @updateList="updateList" />
  </el-card>
</template>

<script>
import Model from "./Model";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  created() {
    this.getMenuListAction();
  },
  methods: {
    ...mapActions("menu", ["getMenuListAction"]),
    showModel() {
      this.info.isShow = true;
    },
    //编辑功能
    edit(obj) {
      console.log(obj);
      //打开模态框
      this.info.isShow = true;
      //通过ref属性操作组件model
      this.$refs.modelRef.setFormData(obj);
    },
    //删除功能
    del(id) {
      this.$myConfirm(() => {
        //发请求删除数据
        this.$http.post("/menudelete", { id }).then((res) => {
          if (res.code == 200) {
            this.$success(res.msg);
            //更新数据列表
            this.getMenuListAction();
            return false;
          }
          this.$error(res.msg);
        });
      });
    },
    //自定义事件的处理函数
    updateList() {
      this.getMenuListAction();
    },
  },
  created() {
    this.getMenuListAction();
  },
  components: {
    Model,
  },
  data() {
    return {
      info: {
        isShow: false,
      },
    };
  },
};
</script>

<style>
</style>