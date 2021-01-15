<template>
  <div class="container">
    <img :src="url" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      url:
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3778871930,1376563598&fm=26&gp=0.jpg",
    };
  },
};
</script>

<style scoped>
.container img {
  width: 100%;
}
</style>