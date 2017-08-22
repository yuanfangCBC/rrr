<template>
  <div class="item-cell-c">
    <div class="tu-wen">
      <div class="author-div">
        <author-comp :itemc="itemc"></author-comp>
        <p class="title-p">{{itemc.title}}</p>
      </div>
      <div class="imgdiv">
        <img :src="itemc.img" alt="" :onerror="errorImg01">
      </div>
    </div>
    <div class="hudong">
      <span class="label">{{itemc.label}}</span>&nbsp
      <span>阅读{{itemc.read}}</span>&nbsp
      <span>评论{{itemc.talk}}</span>
    </div>
    
  </div>
</template>

<script>
import authorComp from 'components/common/authorComp.vue'
export default {
  props: {
    itemc: {
        type:Object
    }
  },
  data() {
    return {
       errorImg01: 'this.src="' + require('../.././assets/logo.png') + '"',
       authorinfo:{}
    }
  },
  mounted(){
    
  },
  components:{
    authorComp
  }
}
</script>

<style lang="stylus">
.item-cell-c
  background:white
  border-bottom:1px solid #ccc
  padding:15px 20px
  .label
    color: #2b9aeb
    border: 1px solid #2b9aeb
    border-radius: 5px
    padding: 2px 5px
    margin-left: 5px
    font-size:12px
  .hudong
    margin-top:10px
    font-size:12px
  .tu-wen
    display:flex
    .imgdiv
      flex:0 0 70px
      width:70px
      height:60px
      img
        width:100%
        height:100%
    .author-div
      flex:1
      .title-p
        font-size:15px
        margin-left:0px
        margin-top:10px

  
</style>