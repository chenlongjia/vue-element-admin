<template>
  <el-dialog
    :title="formData.id == 0 ? '新增' : '编辑'"
    @close="reset"
    :visible.sync="info.isShow"
  >
    <el-form label-width="80px" :model="formData" :rules="rules" ref="formRef">
      <el-form-item label="角色名称" prop="rolename">
        <el-input placeholder="角色名称" v-model="formData.rolename"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" prop="menus">
        <el-tree
          ref="treeRef"
          :data="menuList"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps"
        >
        </el-tree>
      </el-form-item>
      <el-form-item label="角色状态" prop="status">
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
import vm from "../../utils/vm";
export default {
  props: ["info"],
  created() {
    //初始化数据menuList
    if (this.menuList.length == 0) {
      this.getMenuListAction();
    }
    //监听自定义事件
    vm.$on("sendRoleData", (obj) => {
      console.log(obj);
      //1.更新this.formData
      this.formData = obj;
      //2.显示模态框
      this.info.isShow = true;
      //3.勾选当前角色操作权限
      setTimeout(() => {
        this.$refs.treeRef.setCheckedKeys(this.formData.menus.split(","));
      }, 50);
    });
  },
  computed: {
    ...mapState({
      menuList: (state) => state.menu.menuList,
    }),
  },
  methods: {
    ...mapActions("menu", ["getMenuListAction"]),
    //表单提交
    submit() {
      //终极表单校验
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          //1.获取用户勾选的节点(分割为数组)
          const keys = this.$refs.treeRef.getCheckedKeys().join(",");
          //2.手动更新formData.menus
          this.formData.menus = keys;
          //3.提交数据
          const url = this.formData.id > 0 ? "/roleedit" : "/roleadd";
          this.$http.post(url, this.formData).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$success(res.msg);
              //通过自定义事件通知父组件更新数据列表
              this.$emit("updateList");
              //重置数据
              this.reset();
              return false;
            }
            this.$error(res.msg);
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
        rolename: "",
        status: "",
        menus: "",
      };
      //清空树形控件的勾选项
      this.$refs.treeRef.setCheckedKeys([]);
      //2.关闭模态框
      this.info.isShow = false;
    },
  },
  data() {
    //自定义表单校验规则方法
    var validMenus = (rule, value, callback) => {
      const keys = this.$refs.treeRef.getCheckedKeys();
      if (keys.length <= 0) {
        return callback(new Error("请选择操作权限"));
      }
      //表单校验通过
      callback();
    };
    return {
      data: [],
      //和表单元素进行绑定
      formData: {
        id: 0,
        rolename: "", //角色名称
        status: "", //角色状态
        menus: "", //角色权限
      },
      //表单校验规则
      rules: {
        rolename: {
          required: true,
          message: "请输入角色名称",
          trigger: "blur",
        },
        status: {
          required: true,
          message: "请选择状态",
          trigger: "blur",
        },
        menus: {
          validator: validMenus,
          trigger: "blur",
        },
      },
      defaultProps: {
        children: "children",
        //自定义树形节点
        label: "title",
      },
    };
  },
};
</script>

<style>
</style>