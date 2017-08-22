<template>
  <div class="item-cell-a">
    <div class="text">
      <p>{{itema.title}}</p>
      <p>{{itema.time}}</p>
    </div>
    <div class="imgdiv">
      <img :src="itema.img" alt="" :onerror="errorImg01">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itema: {
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
.item-cell-a
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
  
</style>