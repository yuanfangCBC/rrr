<template>
  <div class="item-cell-b">
    <div class="text">
      <p>{{itemb.title}}</p>
      <p><span>{{itemb.label}}</span>{{itemb.time}}</p>
    </div>
    <div class="imgdiv">
      <img :src="itemb.img" alt="" :onerror="errorImg01">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemb: {
        type:Object
    }
  },
  data() {
    return {
      errorImg01: 'this.src="' + require('../.././assets/logo.png') + '"'
    }
  }
}
</script>

<style lang="stylus">
.item-cell-b
  background:white
  display:flex
  padding:15px 20px
  border-bottom:1px solid #ccc
  .imgdiv
    flex:0 0 70px
    width:70px
    height:60px
    img
      width:100%
      height:100%
  .text
    flex:1
    & p:nth-child(2)
      font-size:12px
      margin-top:15px
    span
      color: #2b9aeb
      border: 1px solid #2b9aeb
      border-radius: 5px
      padding: 2px 5px
      margin-right: 5px
  
</style>