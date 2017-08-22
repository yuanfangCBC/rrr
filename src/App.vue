<template>
  <div id="app">
    <div id="app_login"><login @main="mainLis"></login></div>
    <div class="main-index">
      <div class="tabbar">
        <div class="tab-item">
          <router-link to="/news">
            <span class="icon iconfont icon-zixun"></span>
            <p class="text">资讯</p>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ask">
            <span class="icon iconfont icon-wenda"></span>
            <p class="text">问答</p>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="/find">
            <span class="icon iconfont icon-faxian"></span>
            <p class="text">发现</p>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="/mine">
            <span class="icon iconfont icon-wode"></span>
            <p class="text">我的</p>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import login from 'components/login/login.vue';
import {saveToLocal, loadFromLocal} from 'common/js/store';
import {exit} from 'common/js/localStorage.js'
export default {
  name: 'app',
  data() {
    return {
      selected:''
    }
  },
  mounted() {
    //本地存储 查看用户是否登录 默认上
    // if(loadFromLocal(this.userid, 'logined', false)){
    //   this.loginNo=false
    //   this.registerNo=false
    //   this.mainNo=true
    // }else{
    //   this.loginNo=true
    //   this.registerNo=false
    //   this.mainNo=false
    // }
    if(localStorage.getItem("logined")){
      document.getElementById('app_login').style.left = 500 + 'px';
    }else{
      document.getElementById('app_login').style.left = 0 + 'px';
    }
    this.$http.get().then((response) => {
      response=response.body;

    });
  },
  components:{
    login
  },
  methods:{
    mainLis: function(msg){
      document.getElementById('app_login').style.left = 500 + 'px';
    },
    toexit(){
      exit();
      document.getElementById('app_login').style.left = 0 + 'px';
    }
    
  }
}
</script>

<style lang="stylus">
@import 'common/stylus/icon.css'
@import 'common/stylus/reset.css'
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  .mint-cell:last-child
    background-image: -webkit-linear-gradient(bottom, #fff, #fff 50%, transparent 50%) 
    background-image: linear-gradient(0deg, #fff, #fff 50%, transparent 50%)
  .mint-cell-wrapper
    background-image: -webkit-linear-gradient(top, #fff, #fff 50%, transparent 50%)
    background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%)
  #app_login
    z-index:11
    position:fixed
    top:0
    left:0
    width:100%
    height:100%
  .main-index
    .tabbar
      z-index:9
      position:fixed
      left:0
      bottom:0
      width:100%
      height:48px
      display:flex
      background-color: rgba(242, 242, 242, 1);
      border-top:1px solid rgba(216, 216, 216, 1);
      .tab-item
        flex:1
        display:inline-block
        height:50px
        line-height:50px
        position:relative
        .router-link-active
          color:#108EE9
        .icon
          position: absolute
          top: 8px
          left: 40px
          font-size: 20px
          height: 20px
          line-height: 20px
        .text
          position: absolute
          top: 30px
          left: 35px
          font-size: 14px
          height: 14px
          line-height: 14px
          

</style>
