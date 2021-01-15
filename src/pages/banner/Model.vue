<template>
  <el-dialog
    @close="reset"
    :title="formData.id > 0 ? '编辑' : '新增'"
    :visible.sync="info.isShow"
  >
    <el-form :model="formData" :rules="rules" ref="formRef">
      <el-form-item label="图片名称" label-width="80px" prop="title">
        <el-input v-model.trim="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="图片" label-width="80px" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :limit="1"
          :on-exceed="limitTips"
          :on-preview="handlePictureCardPreview"
          :on-change="imgChange"
          :file-list="imgList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态" label-width="80px" prop="status">
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
export default {
  props: ["info"],
  data() {
    return {
      //图片上传属性
      imgList: [], //商品图片预览数组
      dialogImageUrl: "",
      dialogVisible: false,
      formData: {
        id: "",
        title: "",
        img: "",
        status: "",
      },
      rules: {
        title: {
          required: true,
          trigger: "blur",
          message: "图片名称不能为空",
        },
        status: {
          required: true,
          trigger: "blur",
          message: "请选择状态",
        },
      },
    };
  },
  methods: {
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //限制图片上传个数
    limitTips() {
      this.$error("此处只能上传一张照片");
    },
    //监听用户上传图片
    imgChange(file) {
      //手动同步数据
      this.formData.img = file.raw;
    },
    sendBannerData(obj) {
      //填充数据
      this.formData = obj;
      this.imgList =
        obj.img !== "" ? [{ url: this.$imgBaseUrl + obj.img }] : [];
      //弹出模态框
      this.info.isShow = true;
    },
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          //表单校验通过
          //转换为formData对象
          const fd = new FormData();
          delete this.formData.id;
          for (let key in this.formData) {
            fd.append(key, this.formData[key]);
          }
          const url = this.formData.id > 0 ? "/banneredit" : "/banneradd";
          this.$http.post(url, fd).then((res) => {
            if (res.code == 200) {
              //提示修改成功
              this.$success(res.msg);
              //通知父组件更新视图
              this.$emit("updateList");
              //关闭模态框
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
      //1.重置表单
      this.formData = {
        id: "",
        title: "",
        img: "",
        status: "",
      };
      //重置表单状态
      this.$refs.formRef.resetFields();
      //2.关闭模态框
      this.info.isShow = false;
      //删除图片预览
      this.imgList = [];
    },
  },
};
</script>

<style>
</style>