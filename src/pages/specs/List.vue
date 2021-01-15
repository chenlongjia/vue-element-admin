<template>
  <div>
    <el-table :data="specsList" style="width: 100%">
      <el-table-column prop="id" label="id" min-width="80"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称" min-width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格可选值" min-width="180">
        <template v-slot="props">
          <el-tag
            type="success"
            v-for="(item, index) in props.row.attrs"
            :key="index"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="180">
        <template v-slot="props">
          <el-tag type="success" v-if="props.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="props">
          <el-button
            @click="edit(props.row)"
            type="success"
            size="mini"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="del(props.row.id)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            circle
          ></el-button
        ></template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="specsTotal"
      :page-size="size"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import vm from "../../utils/vm";
export default {
  props: ["specsList", "specsTotal", "size"],
  methods: {
    //监听分页按钮点击的事件
    pageChange(page) {
      //   console.log(page);
      //通过this.$emit()将page传递给Index
      this.$emit("sendData", page);
    },
    //编辑功能
    edit(row) {
      //1.将带编辑的数据传递给Model
      vm.$emit("sendSpecsData", { ...row });
    },
    //删除功能
    del(id) {
      this.$myConfirm(() => {
        //发请求删除数据
        this.$http.post("/specsdelete", { id }).then((res) => {
          if (res.code == 200) {
            this.$success(res.msg);
            //通知父组件更新数据列表
            this.$emit("updateList");
            //当前处于最后一页并且最后一页只有一条数据
            if (
              Math.ceil(this.specsTotal / this.size) == this.page &&
              this.specsTotal % this.size == 1
            ) {
              //请求上一页数据
              this.$emit("sendSpecsData", this.page - 1);
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

<style scoped>
.el-tag {
  margin: 0 4px;
}
</style>