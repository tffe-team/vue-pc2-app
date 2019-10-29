<template>
  <div id="notFound" class="m-notFound">
    <div class="pic">
      <img src="../assets/home.png" alt="">
    </div>
    <div class="content">
      <h2 class="title">404</h2>
      <p class="subtitle">抱歉，您访问的页面不存在</p>
      <Button type="primary" class="back" @click="backHome">返回首页</Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NotFound extends Vue {
  backHome() {
    this.$router.push({path: '/home'})
  }
}
</script>
<style scoped lang="scss">
.m-notFound {
  .pic {
    float: left;
    width: 50%;
    text-align: right;
    padding-top: 150px;
    img {
      height: 340px;
    }
  }
  .content {
    display: block;
    margin-left: 60%;
    padding-top: 250px;
    text-align: left;
    .title {
      font-size: 50px;
      color: #545a5a;
    }
    .subtitle {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
    .back {
      margin-top: 10px;
    }
  }
}
</style>


