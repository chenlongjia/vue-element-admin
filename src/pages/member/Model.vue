<template>
  <el-dialog @close="reset" title="修改会员信息" :visible.sync="info.isShow">
    <el-form :model="formData" :rules="rules" ref="formRef">
      <el-form-item label="用户ID" label-width="80px" prop="uid">
        <el-input v-model="formData.uid" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" label-width="80px" prop="nickname">
        <el-input v-model.trim="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机号" label-width="80px" prop="phone">
        <el-input v-model.trim="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" label-width="80px" prop="addtime">
        <el-input v-model="formData.addtime" disabled></el-input>
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
      formData: {
        uid: "",
        nickname: "",
        phone: "",
        status: "",
        addtime: "",
      },
      rules: {
        nickname: {
          required: true,
          trigger: "blur",
          message: "用户昵称不能为空",
        },
        phone: {
          required: true,
          trigger: "blur",
          message: "手机号不能为空",
        },
        status: {
          required: true,
          trigger: "blur",
          message: "请选择状态",
        },
      },
    };
  },
  //时间格式化
  filters: {
    dateFmt(time, divider = "-") {
      //   console.log(time);
      const date = new Date(Number(time));
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const h = date.getHours();
      const mm = date.getMinutes();
      const s = date.getSeconds();
      return `${y}${divider}${m}${divider}${d} ${h}:${mm}:${s}`;
    },
  },
  methods: {
    editList(obj) {
      // console.log(obj);
      //将数据填充到formData上
      this.formData = { ...obj };
    },
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          //表单校验通过
          this.$http.post("/memberedit", this.formData).then((res) => {
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
        uid: "",
        nickname: "",
        phone: "",
        status: "",
        addtime: "",
      };
      //重置表单状态
      this.$refs.formRef.resetFields();
      //2.关闭模态框
      this.info.isShow = false;
    },
  },
};
</script>

<style>
</style>