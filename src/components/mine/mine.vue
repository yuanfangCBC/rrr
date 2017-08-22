<template>
  <div class="mine">
    <div class="header">
      <h1 class="title">我的</h1>
    </div>
    <div class="jb-info-div">
      <img src="" alt="" id="headimg" :onerror="errorImg01">
      <div class="names">
        <p>{{name}}</p>
        <p>{{beizhu}}</p>
      </div>
      <div class="ab"><span>我的粉丝<strong>0</strong></span><span>我的关注<strong>0</strong></span></div>
    </div>
    
    <div class="info-to mar-top15">
      <mt-cell title="我的资料" to="/mineinfo" is-link></mt-cell>
    </div>
    <div class="guanzhu mar-top15">
      <mt-cell title="我的提问" to="/ask" is-link></mt-cell>
      <mt-cell title="我的回答" to="/ask" is-link></mt-cell>
      <mt-cell title="我的收藏" to="/minecoll" is-link></mt-cell>
      <mt-cell title="我关心的品类" to="/ask" is-link></mt-cell>
    </div>
    <div class="mar-top15">
      <mt-cell title="修改密码" to="/ask" is-link></mt-cell>
    </div>
    <div class="dengc mar-top15">
      <mt-button type="primary" @click="toexit">退出登录</mt-button>
    </div>
    
  </div>
</template>

<script>
import selected from 'components/register/selectComp.vue'
import {exit,saveHeadimg} from 'common/js/localStorage.js'
import axios from 'axios'
import { HOST} from 'common/js/constdata.js'
export default {
  data() {
    return {
      selected:'',
      name:'',
      beizhu:'',
      errorImg01: 'this.src="' + require('../.././assets/logo.png') + '"'
    }
  },
  mounted() {
    if(localStorage.getItem("uid")){
      this.name = localStorage.getItem("name")
      this.beizhu = localStorage.getItem("beizhu")
      let $img = document.getElementById("headimg");
      // if(localStorage.getItem("headimg")){
      //   $img.src = localStorage.getItem("headimg");
      // }else{
        axios.post("/api/userinfo",{"_id":localStorage.getItem("uid")}).then((result) => {
          if(result.data.state == "1"){
            var imgurl = result.data.data.headimg;
            this.vimgurl = HOST + imgurl;
            saveHeadimg(HOST + imgurl)
          }
        })
      //}
      
    }
  },
  methods:{
    toexit(){
      exit();
      document.getElementById('app_login').style.left = 0 + 'px';
    }
    
  },
  components: {
    selected
  }
}
</script>

<style lang="stylus">
image[lazy=loading] {
  width: 50px;
  height: 50px;
  margin: auto;
  background:#ccc;
}
.mar-top15
  margin-top:15px
hr
  margin:0
  color:#ccc
  background:#ccc
.mine
    background:#f2f2f2
    height:100%
    width:100%
    position:absolute
    top:0
    left:0
    .header
      position: fixed
      top: 0
      left: 0
      height: 44px
      width: 100%
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1)
      background-color: #fff
      z-index: 8
      color: #666
      .title 
        font-size: 16px
        line-height: 44px
        text-align: center
        margin: 0 auto
    .jb-info-div
      background:#fff
      margin-top:40px
      display:flex
      padding:20px 10px
      img
        flex:0 0 50px
        width:50px
        height:50px
        border-radius:50%
      .names
        flex:1
        margin-left:10px
        margin-top:5px
        & p:nth-child(2)
          font-size:10px
          margin-top:5px
      .ab
        flex:0 0 150px
        padding-top:18px
        span
          line-height:20px
          margin-left:5px
          font-size:0.8em
          strong
            font-size:0.9em
            margin-left:4px
    .dengc
        padding:10px 20px
        .mint-button
          width:100%
</style>