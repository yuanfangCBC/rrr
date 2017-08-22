<template>
  <div class="judian-popover" id="judian_popover" v-show="popoverVisible">
    <div class="judian-warpper">
      <ul>
      <li>置顶</li>
      <li>关注</li>
      <li>收藏</li>
      <li>举报</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popoverVisible: {
      type : Boolean
    }
  },
  data() {
    return {
       errorImg01: 'this.src="' + require('../.././assets/logo.png') + '"'
    }
  },
  methods:{
    show(left,top,scrollY){
      top = top + 146 - scrollY
      left = left - 15
      //console.log('left:'+ left +"-top:"+top)
      let $mypop = document.getElementById('judian_popover');
      $mypop.style.top = top + 'px';
      $mypop.style.left = left + 'px';
    }
  },
  mounted(){
  }

}
</script>

<style lang="stylus">
.judian-popover
  z-index: 999
  position: fixed
  top:0
  left:0
  // top: 160px
  // left: 310px
  width: 55px
  .judian-warpper
    background: #fff
    position: relative
    margin-top:20px
    box-shadow: 1px 2px 5px #d9d9d9
    border: 1px solid #cccccc
    border-radius:5px
    padding:10px 5px
    &:before
      content: '' 
      width: 0
      height: 0 
      border: 6px solid transparent
      border-bottom-color: #cccccc  
      position: absolute 
      left: 50% 
      top: -12px  
    &:after   
      content: "" 
      width: 0  
      height: 0  
      border: 6px solid transparent
      border-bottom-color: #FFFFFF  
      position: absolute  
      left: 50% 
      top: -10px
    ul
      width:100%
      li
        width:100%
        text-align:center
        font-size:14px
        padding:5px 0

</style>