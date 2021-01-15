<template>
  <el-dialog
    @close="reset"
    :title="formData.id > 0 ? '编辑' : '新增'"
    :visible.sync="info.isShow"
  >
    <el-form ref="formRef" label-width="80px" :model="formData" :rules="rules">
      <el-form-item label="上级" prop="pid">
        <el-select v-model="formData.pid">
          <el-option :value="0" label="顶级分类"></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :value="item.id"
            :label="item.catename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="catename">
        <el-input
          placeholder="请输入名称"
          v-model="formData.catename"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="img" v-if="formData.pid !== 0">
        <!-- 
               action:指定图片上传的数据接口 
               auto-upload:指定是否自动上传图片,默认自动上传
               on-preview:图片预览事件 
               on-change:用户选择的文件发生改变时触发的事件
               limit:最大允许上传个数
               on-exceed:文件超出个数限制时的钩子函数
               file-list:设置默认展示的图片列表
           -->
        <el-upload
          action="#"
          :auto-upload="false"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-change="fileChange"
          :limit="1"
          :on-exceed="limitTips"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
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
import { mapState } from "vuex";
import vm from "../../utils/vm";
export default {
  created() {
    //监听自定义事件
    vm.$on("sendCateData", (row) => {
      // console.log(row);
      // 显示模态框
      this.info.isShow = true;
      //更新数据formData
      this.formData = row;
      //更新fileList
      this.fileList = [{ url: this.$imgBaseUrl + row.img }];
    });
  },
  computed: {
    ...mapState({
      cateList: (state) => state.cate.cateList,
    }),
  },
  props: ["info"],
  data() {
    return {
      //上传组件相关属性
      dialogImageUrl: "",
      dialogVisible: false,
      //upload组件默认需要展示的列表
      fileList: [],
      //和表单进行绑定的数据对象
      formData: {
        pid: 0,
        catename: "",
        img: "",
        status: "",
      },
      //表单校验规则
      rules: {
        pid: { required: true, message: "请选择上级", trigger: "blur" },
        catename: {
          required: true,
          message: "请输入分类名称",
          trigger: "blur",
        },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
    };
  },
  methods: {
    //上传组件相关方法
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //表单终极校验提交
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          //将this.formData对象转换为formData对象
          //创建formData实例对象
          const fd = new FormData();
          //删除多余的数据(删除对象的某一个属性)
          delete this.formData.children;

          for (let key in this.formData) {
            fd.append(key, this.formData[key]);
          }
          const url = this.formData.id > 0 ? "/cateedit" : "/cateadd";
          this.$http.post(url, fd).then((res) => {
            if (res.code == 200) {
              this.$success(res.msg);
              //更新数据列表:通知父组件
              this.$emit("updateList");
              this.reset();
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    //重置表单,关闭模态框
    reset() {
      //重置数据对象formData
      this.formData = {
        pid: 0,
        catename: "",
        img: "",
        status: "",
      };
      this.$refs.formRef.resetFields();
      this.info.isShow = false;
    },
    //监听用户选择文件 file:系统自动注入,表示用户选择的文件对象
    fileChange(file) {
      console.log(file);
      //手动更新数据
      this.formData.img = file.raw;
    },
    //图片数量超过限制
    limitTips() {
      this.$error("最多只能上传一张");
    },
  },
};
</script>

<style>
</style>