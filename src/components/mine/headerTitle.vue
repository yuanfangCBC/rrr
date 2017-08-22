<template>
  <div class="header-title">
    <mt-header :title="title">
      <router-link :to="link" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type:String,
      default:'我的标题'
    },
    link: {
      type : String,
      default : '/mine'
    }
  }
}
</script>

<style lang="stylus">
  .header-title
    .mint-header
      color:rgb(104, 104, 104)
      background:#fff
      border-bottom:1px solid #ccc
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
      font-size:18px
      letter-spacing:2px
      label,span
        color:#26a2ff
</style>