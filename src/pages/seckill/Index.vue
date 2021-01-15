<template>
  <el-card>
    <el-button
      @click="info.isShow = !info.isShow"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >添加秒杀</el-button
    >
    <el-divider />
    <!-- 表格组件 -->
    <el-table :data="seckillList" style="width: 100%">
      <el-table-column
        prop="title"
        label="活动名称"
        min-width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="begintime"
        label="开始时间"
        min-width="160"
        align="center"
      >
        <template v-slot="props">
          {{ props.row.begintime | dateFmt }}
        </template>
      </el-table-column>
      <el-table-column
        prop="endtime"
        label="结束时间"
        min-width="160"
        align="center"
      >
        <template v-slot="props">
          {{ props.row.endtime | dateFmt }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        min-width="160"
        align="center"
      >
        <template v-slot="props">
          <el-tag type="success" v-if="props.row.status == 1">已启用</el-tag>
          <el-tag v-else>未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="160" align="center">
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
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框组件 -->
    <Model :info="info" @updateList="updateList" ref="model" />
  </el-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Model from "./Model";
export default {
  created() {
    this.seckillListAction();
  },
  computed: {
    ...mapState({
      seckillList: (state) => state.seckill.seckillList,
    }),
  },
  data() {
    return {
      info: {
        isShow: false,
      },
    };
  },
  components: {
    Model,
  },
  methods: {
    ...mapActions("seckill", ["seckillListAction"]),
    //更新秒杀列表
    updateList() {
      this.seckillListAction();
    },
    //编辑功能
    edit(row) {
      // console.log(row);
      this.$refs.model.sendSecData(row);
      this.info.isShow = true;
    },
    //删除功能
    del(id) {
      this.$refs.model.delList(id);
    },
  },
};
</script>

<style>
</style>