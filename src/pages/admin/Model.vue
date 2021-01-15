<template>
  <el-dialog
    @close="reset"
    :title="formData.id > 0 ? '编辑' : '新增'"
    :visible.sync="info.isShow"
  >
    <el-form ref="formRef" label-width="80px" :model="formData" :rules="rules">
      <el-form-item label="角色" prop="roleid">
        <el-select v-model="formData.roleid">
          <!-- <el-option label="请选择" :value="0"></el-option> -->
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input
          placeholder="请输入账号"
          v-model="formData.username"
          :disabled="formData.id > 0 ? true : false"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="formData.password"
        ></el-input>
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
//导入vuex辅助方法
import { mapState, mapActions } from "vuex";
//导入事件中心
import vm from "../../utils/vm";
export default {
  created() {
    this.getRoleListAction();
    //监听自定义事件sendData事件
    vm.$on("sendAdminData", (obj) => {
      console.log(obj);
      //更新表单数据模型
      this.formData = obj;
      obj.password = "";
      //显示模态框
      this.info.isShow = true;
    });
  },
  computed: {
    //开启子模块,需要使用对象的写法
    ...mapState({
      roleList: (state) => state.role.roleList,
    }),
  },
  props: ["info"],
  data() {
    return {
      formData: {
        roleid: "", //角色id
        username: "", //账号
        password: "", //密码
        status: "", //角色状态
      },
      //表单校验规则
      rules: {
        roleid: { required: true, message: "请选择角色", trigger: "blur" },
        username: { required: true, message: "请输入账号", trigger: "blur" },
        // password: { required: true, message: "请输入密码", trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
    };
  },
  methods: {
    ...mapActions("role", ["getRoleListAction"]),
    //表单提交
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const url = this.formData.id > 0 ? "/useredit" : "/useradd";
          //发请求
          this.$http.post(url, this.formData).then((res) => {
            if (res.code == 200) {
              this.$success(res.msg);
              //更新数据列表:通知父组件更新数据列表
              this.$emit("updateList");
              //重置信息
              this.reset();
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    //数据重置
    reset() {
      //重置表单数据模型
      this.formData = {
        roleid: "", //角色id
        username: "", //账号
        passward: "", //密码
        status: "", //角色状态
      };
      //重置表单状态
      this.$refs.formRef.resetFields();
      //隐藏模态框
      this.info.isShow = false;
    },
  },
};
</script>

<style>
</style>