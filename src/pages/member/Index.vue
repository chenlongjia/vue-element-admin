<template>
  <el-card>
    <el-table :data="memberList" style="width: 100%">
      <el-table-column
        prop="uid"
        label="用户ID"
        width="340"
        align="center"
      ></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="addtime"
        label="注册时间"
        width="180"
        align="center"
      >
        <template v-slot="props">
          {{ props.row.addtime | dateFmt }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="props">
          <el-button
            @click="edit(props.row)"
            type="success"
            size="mini"
            icon="el-icon-edit"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 调用List组件 -->
    <Model :info="info" ref="model" @updateList="updateList" />
  </el-card>
</template>

<script>
import Model from "./Model";
//导入vuex辅助方法
import { mapState, mapActions } from "vuex";
export default {
  created() {
    this.getMemberListAction();
    this.$emit("sendData", (obj) => {
      console.log(obj);
    });
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
  computed: {
    ...mapState({
      memberList: (state) => state.member.memberList,
    }),
  },
  methods: {
    ...mapActions("member", ["getMemberListAction"]),
    //编辑功能
    edit(row) {
      this.$refs.model.editList(row);
      this.info.isShow = true;
    },
    //更新会员列表
    updateList() {
      this.getMemberListAction();
    },
  },
};
</script>

<style scoped>
</style>