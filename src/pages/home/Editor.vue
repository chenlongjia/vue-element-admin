<template>
  <div>
    <!-- 调用时一定要添加一个id属性,否则富文本编辑器不会显示 -->
    <vueWangeditor
      id="editor"
      ref="editor"
      style="height: 430px"
      width="100%"
      v-model="content"
    />
    <el-button @click="getContent" type="primary">获取内容</el-button>
    <el-button @click="setContent" type="success">设置内容</el-button>
  </div>
</template>

<script>
//导入vue-wangeditor
import vueWangeditor from "vue-wangeditor";
export default {
  data() {
    return {
      content: `大家好,我是慕筱佳,该项目还存在很多问题和不足,
      希望你们能提出宝贵意见,你们的意见就是我前进最大动力,谢谢你们,欢迎star.
      `,
    };
  },
  components: {
    vueWangeditor,
  },
  methods: {
    //获取内容
    getContent() {
      //操作组件元素,用ref属性
      const content = this.$refs.editor.getHtml();
      console.log(content);
    },
    //设置内容
    setContent() {
      const content = `
        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3395864961,1527657332&fm=26&gp=0.jpg" />
      `;
      this.$refs.editor.setHtml(content);
    },
  },
};
</script>

<style>
</style>