<template>
  <div class="author-div">
    <img :src="urls+itemc.authorimg" alt="" :onerror="errorImg01">
    <span class="author-span">{{itemc.authorname}}<span class="label">{{itemc.authorlabel}}</span></span>
    <p>{{itemc.time}}</p>
  </div>
</template>

<script>
import { HOST} from 'common/js/constdata.js'
export default {
  props: {
    itemc: {
        type:Object
    }
  },
  mounted(){
    this.urls = HOST;
  },
  data() {
    return {
       errorImg01: 'this.src="' + require('../.././assets/logo.png') + '"',
       urls : ''
    }
  }
}
</script>

<style lang="stylus">
.author-div
  .label
    color: #2b9aeb
    border: 1px solid #2b9aeb
    border-radius: 5px
    padding: 2px 5px
    margin-left: 5px
    font-size:12px
  img
    width:30px
    height:30px
    border-radius:50%
    float:left
  .author-span
    margin-left:10px
    font-size:16px
  p
    font-size:12px
    margin-top: 5px
    margin-left: 40px
  
</style>