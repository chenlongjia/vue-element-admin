<template>
  <el-card>
    <el-button
      @click="info.isShow = !info.isShow"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >新增</el-button
    >
    <el-divider />
    <el-table :data="bannerList" style="width: 100%">
      <el-table-column
        prop="title"
        label="轮播图名称"
        min-width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="img" label="图片" min-width="180" align="center">
        <template v-slot="props">
          <img :src="$imgBaseUrl + props.row.img" alt="" height="60px" />
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        min-width="180"
        align="center"
      >
        <template v-slot="props">
          <el-tag type="success" v-if="props.row.status == 1">正常</el-tag>
          <el-tag type="success" v-else>禁用</el-tag>
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
    <Model :info="info" @updateList="updateList" ref="model" />
  </el-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Model from "./Model";
export default {
  created() {
    this.getBannerListAction();
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
      bannerList: (state) => state.banner.bannerList,
    }),
  },
  methods: {
    ...mapActions("banner", ["getBannerListAction"]),
    edit(row) {
      this.$refs.model.sendBannerData(row);
    },
    //更新轮播图数据
    updateList() {
      this.getBannerListAction();
    },
    //删除功能
    del(id) {
      this.$myConfirm(() => {
        this.$http.post("/bannerdelete", { id }).then((res) => {
          if (res.code == 200) {
            //提示
            this.$success(res.msg);
            this.getBannerListAction();
            return false;
          }
          this.$error(res.msg);
        });
      });
    },
  },
};
</script>

<style>
</style>