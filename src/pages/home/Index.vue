<template>
  <el-card>
    <Editor />
    <el-divider />
    <Bar />
    <el-divider />
    <Lines />
    <el-divider />
    <Pies />
  </el-card>
</template>

<script>
import Bar from "./Bar";
import Lines from "./Lines";
import Pies from "./Pies";
import Editor from "./Editor";
export default {
  components: {
    Bar,
    Lines,
    Pies,
    Editor,
  },
};
</script>

<style>
</style>