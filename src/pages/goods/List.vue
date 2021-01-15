<template>
  <div>
    <!-- 表格数据 -->
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column prop="id" label="id" width="80"> </el-table-column>
      <el-table-column prop="firstcatename" label="一级分类" width="180">
      </el-table-column>
      <el-table-column prop="secondcatename" label="二级分类" min-width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" min-width="180">
      </el-table-column>
      <el-table-column prop="img" label="商品图片" min-width="180">
        <template v-slot="props">
          <img
            :src="$imgBaseUrl + props.row.img"
            alt=""
            height="80px"
            width="60px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="商品价格" min-width="180">
        <template v-slot="props"> &yen;{{ props.row.price }} </template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" min-width="180">
        <template v-slot="props"> &yen;{{ props.row.market_price }} </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" min-width="180">
        <template v-slot="props">
          <el-tooltip
            :content="props.row.isnew == 0 ? '否' : '是'"
            placement="top"
          >
            <el-switch
              @change="statusChange(props.row, 'isnew')"
              v-model="props.row.isnew"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" min-width="180">
        <template v-slot="props">
          <el-tooltip
            :content="props.row.ishot == 0 ? '否' : '是'"
            placement="top"
          >
            <el-switch
              @change="statusChange(props.row, 'ishot')"
              v-model="props.row.ishot"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="180">
        <template v-slot="props">
          <el-tag type="success" v-if="props.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
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
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev,pager,next"
      :total="goodsTotal"
      :page-size="size"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
//导入事件中心
import vm from "../../utils/vm";
export default {
  props: ["goodsList", "goodsTotal", "size"],
  methods: {
    //监听分页按钮点击事件
    pageChange(page) {
      //通知父组件更新数据
      this.$emit("updateList", page);
    },
    //监听状态的事件处理函数
    statusChange(row, attr) {
      //1:是 2:否
      //需要将数据转换成formData
      const fd = new FormData();
      //   for (let key in row) {
      //     fd.append(key, row[key]);
      //   }
      fd.append("id", row.id);
      fd.append(attr, row[attr]); //row:商品对象 attr:isnew/ishot
      this.$http.post("/goodsedit", fd).then((res) => {
        if (res.code == 200) {
          //更新列表
          this.$emit("updateList");
          return this.$success(res.msg);
        }
        this.$error(res.msg);
      });
    },
    //编辑功能
    edit(row) {
      //通过自定义事件将待编辑的商品对象传递给Model
      vm.$emit("sendGoodsData", { ...row });
    },
    //删除功能
    del(id) {
      this.$myConfirm(() => {
        this.$http.post("/goodsdelete", { id }).then((res) => {
          if (res.code == 200) {
            this.$success(res.msg);
            //更新列表
            this.$emit("updateList");
            //当前处于最后一页并且最后一页只有一条数据
            if (
              Math.ceil(this.goodsTotal / this.size) == this.page &&
              this.goodsTotal % this.size == 1
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