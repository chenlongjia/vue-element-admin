<template>
  <el-card>
    <el-button
      @click="info.isShow = !info.isShow"
      type="primary"
      icon="el-circle-plus-outline"
      >新增</el-button
    >
    <el-divider />
    <!-- 导入列表组件 -->
    <List
      @updatePage="updatePage"
      :goodsList="goodsList"
      :goodsTotal="goodsTotal"
      :size="size"
      @updateList="updateList"
    />
    <!-- 导入模态框组件 -->
    <Model :info="info" @updateList="updateList" />
  </el-card>
</template>

<script>
//导入vuex辅助方法
import { mapState, mapActions } from "vuex";
//导入子组件List
import List from "./List";
//导入子组件Model
import Model from "./Model";
export default {
  created() {
    this.getGoodsListAction({ page: this.page, size: this.size });
    this.getGoodsTotalAction();
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goods.goodsList,
      goodsTotal: (state) => state.goods.goodsTotal,
    }),
  },
  data() {
    return {
      info: {
        isShow: false,
      },
      page: 1, //页码
      size: 4, //页数
    };
  },
  components: {
    List,
    Model,
  },
  methods: {
    ...mapActions("goods", ["getGoodsListAction", "getGoodsTotalAction"]),
    updateList(page) {
      if (page) {
        this.page = page; //更新页码
      }
      //重新请求数据列表
      this.getGoodsListAction({ page: this.page, size: this.size });
      this.getGoodsTotalAction();
    },
    //自定义事件
    updatePage(page) {
      //更新页码
      this.page = page;
      //重新请求数据列表
      this.getGoodsListAction({
        page: this.page,
        size: this.size,
      });
    },
  },
};
</script>

<style>
</style>