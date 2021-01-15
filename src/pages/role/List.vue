<template>
  <el-table :data="roleList" stripe style="width: 100%">
    <el-table-column prop="id" label="id" min-width="80"> </el-table-column>
    <el-table-column prop="rolename" label="角色名称" min-width="100">
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template v-slot="props">
        <el-tag type="success" v-if="props.row.status == 1">正常</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot="props">
        <el-button
          icon="el-icon-edit"
          size="mini"
          type="success"
          @click="edit(props.row)"
          circle
        ></el-button>
        <el-button
          icon="el-icon-delete"
          size="mini"
          type="danger"
          @click="del(props.row.id)"
          circle
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
//导入事件中心
import vm from "../../utils/vm";
export default {
  props: ["roleList"],
  methods: {
    //角色编辑
    edit(obj) {
      //   console.log(obj);
      //通过vm.$emit()将待编辑的对象传递给model
      vm.$emit("sendRoleData", { ...obj });
    },
    //删除
    del(id) {
      this.$myConfirm(() => {
        //1.发送数据请求
        this.$http.post("/roledelete", { id }).then((res) => {
          if (res.code == 200) {
            this.$success(res.msg);
            //更新数据列表
            this.$emit("updateList");
          } else {
            this.$error(res.msg);
          }
        });
      });
    },
  },
};
</script>

<style>
</style>