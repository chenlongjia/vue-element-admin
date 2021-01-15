<template>
  <el-dialog
    @close="reset"
    :title="formData.id > 0 ? '编辑' : '添加'"
    :visible.sync="info.isShow"
  >
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="活动名称" prop="title">
        <el-input v-model.trim="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" prop="phone">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          :start-placeholder="formData.begintime | dateFmt"
          :end-placeholder="formData.endtime | dateFmt"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="formData.first_cateid" @change="getSecondList">
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="formData.second_cateid">
          <el-option
            v-for="item in secondList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择商品" prop="goodsid">
        <el-select v-model="formData.goodsid" @change="getGoodsList">
          <el-option
            v-for="item in goodsList"
            :key="item.id"
            :label="item.goodsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  created() {
    this.getCateListAction();

    // setTimeout(() => {
    //   console.log(this.cateList);
    // }, 500);
  },
  computed: {
    ...mapState({
      cateList: (state) => state.cate.cateList,
    }),
  },
  props: ["info"],
  data() {
    return {
      secondList: [], //二级分类
      goodsList: [], //商品分类
      formData: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "",
      },
      rules: {
        title: {
          required: true,
          trigger: "blur",
          message: "用户昵称不能为空",
        },
        status: {
          required: true,
          trigger: "blur",
          message: "请选择状态",
        },
        first_cateid: {
          required: true,
          trigger: "blur",
          message: "请选择一级商品",
        },
        second_cateid: {
          required: true,
          trigger: "blur",
          message: "请选择二级商品",
        },
        goodsid: {
          required: true,
          trigger: "blur",
          message: "请选择商品",
        },
      },
      //日期选择器
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
    };
  },
  methods: {
    ...mapActions("cate", ["getCateListAction"]),
    //获取二级分类
    getSecondList(id) {
      //通过id查找索引
      const index = this.cateList.findIndex((item) => item.id == id);
      this.secondList = this.cateList[index].children;
      this.getGoodsList();
    },
    //获取商品分类
    getGoodsList() {
      this.$http.get("/getindexgoods").then((res) => {
        if (res.code == 200) {
          this.goodsList = res.list[2].content;
        }
      });
    },
    //提交表单数据
    submit() {
      // console.log(this.formData);
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const url = this.formData.id > 0 ? "/seckedit" : "/seckadd";
          this.$http.post(url, this.formData).then((res) => {
            if (res.code == 200) {
              //1.通知父组件更新视图
              this.$emit("updateList");
              //2.提示添加成功
              this.$success(res.msg);
              this.reset();
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    //编辑功能
    sendSecData(row) {
      this.formData = row;
      this.getSecondList(row.first_cateid);
    },
    //删除功能
    delList(id) {
      //通过id查找索引
      this.$myConfirm(() => {
        this.$http.post("/seckdelete", { id }).then((res) => {
          if (res.code == 200) {
            this.$success(res.msg);
            //通知父组件更新视图
            this.$emit("updateList");
            //关闭模态框
            this.info.isShow = false;
          } else {
            this.$error(res.msg);
          }
        });
      });
    },
    //数据重置
    reset() {
      //1.重置表单
      this.formData = {
        id: "",
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "",
      };
      //重置表单状态
      this.$refs.formRef.resetFields();
      //2.关闭模态框
      this.info.isShow = false;
    },
  },
  watch: {
    value2() {
      this.formData.begintime = Date.parse(this.value2[0]);
      this.formData.endtime = Date.parse(this.value2[1]);
    },
  },
};
</script>

<style scoped>
.el-input__inner {
  width: 534px;
}
</style>