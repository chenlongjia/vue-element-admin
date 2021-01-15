<template>
  <div>
    <el-table :data="adminList" style="width: 100%">
      <el-table-column prop="id" label="id" min-width="80"> </el-table-column>
      <el-table-column prop="rolename" label="角色" min-width="140">
      </el-table-column>
      <el-table-column prop="username" label="账号" min-width="140">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="props">
          <el-tag v-if="props.row.status == 1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="props">
          <el-button
            @click="edit(props.row)"
            icon="el-icon-edit"
            size="mini"
            type="success"
            circle
          ></el-button>
          <el-button
            @click="del(props.row.uid)"
            icon="el-icon-delete"
            size="mini"
            type="danger"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 
     total:数据总条数 
     page-size:每页显示的数据条数
     current-change:分页按钮点击的事件
     -->
    <el-pagination
      @current-change="pageUpdate"
      :page-size="size"
      background
      layout="prev, pager, next"
      :total="adminTotal"
    >
    </el-pagination>
  </div>
</template>

<script>
import vm from "../../utils/vm";
export default {
  props: ["adminTotal", "adminList", "size"],
  methods: {
    //分页按钮被点击时的事件处理函数
    pageUpdate(page) {
      // console.log(page, "1111");
      //通过this.$emit() 将页码传递给父组件Index
      this.$emit("updatePage", page);
    },
    //编辑
    edit(row) {
      // console.log(row);
      //通过自定义事件将数据传递给兄弟model组件
      vm.$emit("sendAdminData", { ...row }); //拷贝对象,使用扩展运算符,对象则不会受影响.
    },
    //删除
    del(uid) {
      // console.log(uid);
      this.$myConfirm(() => {
        this.$http.post("/userdelete", { uid }).then((res) => {
          if (res.code == 200) {
            this.$success(res.msg);
            //更新数据列表
            this.$emit("updateList");
            //当前处于最后一页并且最后一页只有一条数据
            if (
              Math.ceil(this.adminTotal / this.size) == this.page &&
              this.adminTotal % this.size == 1
            ) {
              //请求上一页数据
              this.$emit("updatePage", this.page - 1);
            }
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