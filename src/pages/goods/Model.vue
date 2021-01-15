<template>
  <el-dialog
    :title="formData.id > 0 ? '编辑' : '新增'"
    :visible.sync="info.isShow"
    width="100%"
    @close="reset"
  >
    <el-form ref="formRef" label-width="100px" :model="formData" :rules="rules">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="一级分类" prop="first_cateid">
            <el-select
              @change="firstCateChange"
              v-model="formData.first_cateid"
            >
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
                v-for="item in secondCateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsname">
            <el-input
              placeholder="请输入商品名称"
              v-model="formData.goodsname"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="img">
            <el-upload
              action="#"
              :auto-upload="false"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :limit="1"
              :on-exceed="limitTips"
              :on-change="imgChange"
              :file-list="imgList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input
              placeholder="请输入商品价格"
              v-model="formData.price"
            ></el-input>
          </el-form-item>
          <el-form-item label="市场价格" prop="market_price">
            <el-input
              placeholder="请输入市场价格"
              v-model="formData.market_price"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="specsid">
            <el-select @change="specsChange" v-model="formData.specsid">
              <el-option
                v-for="item in specsList"
                :key="item.id"
                :value="item.id"
                :label="item.specsname"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性值" prop="specsattr">
            <el-select v-model="formData.specsattr" multiple>
              <el-option
                v-for="(item, index) in specsAttrs"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否新品" prop="isnew">
            <el-radio-group v-model="formData.isnew">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否热卖" prop="ishot">
            <el-radio-group v-model="formData.ishot">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="second">
          <el-form-item prop="description" label-width="0">
            <vueWangeditor
              ref="description"
              id="editor"
              width="100%"
              height="360"
              style="height: 400px"
              v-model="formData.description"
            ></vueWangeditor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
//导入vue-wangeditor
import vueWangeditor from "vue-wangeditor";
//导入vuex辅助方法
import { mapState, mapActions } from "vuex";
//导入事件中心
import vm from "../../utils/vm";
export default {
  created() {
    //商品分类列表初始化
    this.getCateListAction();
    //商品规格列表初始化
    this.getSpecsListAction();
    //监听自定义事件sendData
    vm.$on("sendGoodsData", (obj) => {
      console.log(obj);
      //如果下拉框启用了多选,则默认需要提供数组格式
      obj.specsattr = obj.specsattr.split(",");
      //1.更新表单数据模型
      this.formData = obj;
      //显示模态框
      this.info.isShow = true;
      //手动设置富文本编辑器的内容(执行事件会延迟)
      //this.$nextTick() 将某个操作延迟到视图渲染完毕后执行
      setTimeout(() => {
        this.$refs.description.setHtml(obj.description);
      }, 500);
      //手动触发一级分类change事件
      this.firstCateChange(obj.first_cateid, false);
      //手动调用商品规格change事件回调函数
      this.specsChange(obj.specsid, false);
      //手动更新商品预览数组
      this.imgList =
        obj.img !== "" ? [{ url: this.$imgBaseUrl + obj.img }] : [];
    });
  },
  props: ["info"],
  data() {
    //自定义富文本编辑器校验规则
    const validDesc = (rule, value, callback) => {
      //校验不通过
      if (this.$refs.description.getHtml() == "<p><br></p>") {
        return callback(new Error("请输入商品描述"));
      }
      //校验通过
      callback();
    };
    return {
      //图片预览
      dialogVisible: false,
      dialogImageUrl: "",
      isShow: true,
      activeName: "first",
      imgList: [], //商品图片预览数组
      secondCateList: [], //二级分类列表
      specsAttrs: [], //商品规格可选属性
      //表单绑定数据模型
      formData: {
        first_cateid: "", //一级分类id
        second_cateid: "", //二级分类id
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片
        description: "", //商品描述
        specsid: "", //规格id
        specsattr: "", //规格属性值
        isnew: "", //是否新品
        ishot: "", //是否热卖
        status: "", //状态
      },
      //表单校验规则
      rules: {
        first_cateid: { required: true, trigger: "blur", message: "请选择" },
        second_cateid: { required: true, trigger: "blur", message: "请选择" },
        goodsname: {
          required: true,
          trigger: "blur",
          message: "请输入商品名称",
        },
        price: { required: true, trigger: "blur", message: "请输入商品价格" },
        market_price: {
          required: true,
          trigger: "blur",
          message: "请输入市场价格",
        },
        description: {
          validator: validDesc,
          trigger: "blur",
        },
        specsid: { required: true, trigger: "blur", message: "请选择规格" },
        specsattr: {
          required: true,
          trigger: "blur",
          message: "请选择规格属性值",
        },
        isnew: {
          required: true,
          trigger: "blur",
          message: "请选择状态",
        },
        ishot: {
          required: true,
          trigger: "blur",
          message: "请选择状态",
        },
        status: {
          required: true,
          trigger: "blur",
          message: "请选择状态",
        },
      },
    };
  },
  computed: {
    ...mapState({
      cateList: (state) => state.cate.cateList,
      specsList: (state) => state.specs.specsList,
    }),
  },
  components: {
    vueWangeditor,
  },
  methods: {
    ...mapActions("cate", ["getCateListAction"]),
    ...mapActions("specs", ["getSpecsListAction"]),
    //监听一级分类
    firstCateChange(id, flag = true) {
      console.log(id);
      //根据id查找索引
      const index = this.cateList.findIndex((item) => item.id == id);
      //更新二级分类列表
      if (flag) {
        //重置二级分类secondCateList
        this.secondCateList = [];
      }
      this.secondCateList = this.cateList[index].children;
    },
    //监听商品规格更新
    //区分当前方法是用户手动调用还是通过鼠标点击
    //flag:true 鼠标点击  flag:false 手动调用
    specsChange(id, flag = true) {
      //根据id查找索引
      const index = this.specsList.findIndex((item) => item.id == id);
      //更新specsAttrs
      if (flag) {
        //重置默认的规格属性值
        this.formData.specsattr = [];
      }
      this.specsAttrs = this.specsList[index].attrs;
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    limitTips() {
      this.$error("此处只能上传一张图片");
    },
    //监听用户上传图片
    imgChange(file) {
      console.log(file);
      //手动同步数据
      this.formData.img = file.raw;
    },
    //表单提交
    submit() {
      //手动同步富文本编辑器的内容
      this.formData.description = this.$refs.description.getHtml();
      this.$refs.formRef.validate((valid) => {
        // console.log(this.formData);
        if (valid) {
          //发请求提交数据
          const fd = new FormData();
          delete this.formData.firstcatename;
          delete this.formData.secondcatename;
          for (let key in this.formData) {
            fd.append(key, this.formData[key]);
          }
          const url = this.formData.id > 0 ? "/goodsedit" : "/goodsadd";
          this.$http.post(url, fd).then((res) => {
            if (res.code == 200) {
              this.$success(res.msg);
              //通知父组件更新列表
              this.$emit("updateList");
              //重置数据
              this.reset();
            }
          });
        } else {
          this.$error(res.msg);
        }
      });
    },
    //数据重置
    reset() {
      //重置表单
      this.formData = {
        first_cateid: "", //一级分类id
        second_cateid: "", //二级分类id
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片
        description: "", //商品描述
        sepcsid: "", //规格id
        specsattr: "", //规格属性值
        isnew: "", //是否新品
        ishot: "", //是否热卖
        status: "", //状态
      };
      //重置表单状态
      this.$refs.formRef.resetFields();
      //清空富文本编辑器
      this.$refs.description.setHtml("");
      //隐藏模态框
      this.info.isShow = false;
      //删除图片预览
      this.imgList = [];
    },
  },
};
</script>

<style>
</style>