<template>
  <div class="user-info">
    <mt-header title="我的资料">
      <router-link to="/mine" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="jb-info-div">
      <div class="sc-tx">
        <img id="tx_img" src="" alt="" :onerror="errorImg01">
        <input type="file" name="file" @change="onfilechange">
      </div>
      <div class="names">
        <p>{{name}}</p>
        <p>{{beizhu}}</p>
      </div>
    </div>
    <div class="title-small">
      <span class="text">种养殖规模</span>
    </div>
    <div class="write-row">
      <span>工作单位</span>
      <span>咸阳市艺员站</span>
    </div>
    <div class="write-row">
      <span>职称</span>
      <span>高级农艺师</span>
    </div>
    <div class="title-small">
      <span class="text">擅长品类</span>
    </div>
    <div class="pinlei-tag">
      <ul>
        <li v-for="item in userPinlei"><span>{{item}}</span></li>
        <li><span @click="showpop">➕</span></li>
      </ul>
    </div>
    <div class="pinlei-choose-pop">
      <mt-popup v-model="popupVisible" position="bottom" pop-transition="popup-fade">
        <div class="pop">
          <p @click="hidepop">关闭</p>
          <p class="choose" @click="choosepl">选择</p>
          <div class="pl-list">
            <ul id="choose_list">
              <li v-for="(item,_index) in pinleis"><span @click="toggleCho(item)">{{item}}</span></li>
            </ul>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui' 
import { HOST} from 'common/js/constdata.js'
import {saveHeadimg} from 'common/js/localStorage.js'
export default {
  data() {
    return {
      selected:'',
      name : '',
      beizhu : '',
      popupVisible : false,
      pinleis : [],//所有品类
      pinleiC : [],//选择品类,
      userPinlei : [],//用户擅长品类
      uid : '',
      txPhoto :'',
      errorImg01: 'this.src="' + require('../.././assets/logo.png') + '"'
    }
  },
  mounted() {
    if(localStorage.getItem("uid")){
      this.uid = localStorage.getItem("uid");
      this.name = localStorage.getItem("name")
      this.beizhu = localStorage.getItem("beizhu")
      if(localStorage.getItem("headimg")){
        let $img = document.getElementById("tx_img");
        $img.src = localStorage.getItem("headimg");
      }
    }else{
      alert("no login")
    }
    //获取用户擅长品类
    axios.post("/api/getUserpinleis",{"uid":this.uid}).then((result) => {
      if(result.data.state == "1"){
        let arr = result.data.data;
        this.userPinlei = arr[0].pinlei;
      }else{
        //失败
      }
        
    })

  },
  methods: {
    showpop(){
      this.popupVisible = true;
      //获取全部品类
      axios.post("/api/getpinleis").then((result) => {
        if(result.data.state == "1"){
          let arr = result.data.data;
          let namearr = [];
          for(var index in arr){
            namearr.push(arr[index].name)
          }
          this.pinleis = namearr;
          // let ul = document.getElementById("choose_list")
          // let obj=ul.getElementsByTagName("span");
          // console.log(obj)
          // for(var [key,v] of namearr){
          //   // if(this.userPinlei.indexOf(v)){
          //   //   console.log(key+":"+v)
          //   //   obj[key].className = 'on';
          //   // }
          // }
        }else{
          //失败
        }
        
      })

    },
    hidepop(){
      this.popupVisible = false;
      //把之前所有选择的去掉
      let ul = document.getElementById("choose_list")
      let obj=ul.getElementsByTagName("span"); 
      console.log(obj)
      for(let item of obj){
        let cls = item.className
        if(cls != null && cls.indexOf(' on') > -1){
          item.className = cls.replace(' on', '');
        }
      }
      
    },
    choosepl(){
      //用户更新所擅长品类
      axios.post("/api/updateUserPinlei",{"pinlei":this.pinleiC,"uid":this.uid}).then((result) => {
        if(result.data.state == "1"){
          Toast({
              message: "ok",
              position: 'center',
              duration: 2000
          });
          this.popupVisible = false;
          let Upinlei = result.data.data[0].pinlei;
          this.userPinlei = Upinlei;
        }
      })
    },
    toggleCho(item){
      let obj = event.target;
      let cls = obj.className;
      if(cls != null && cls.indexOf(' on') > -1){
          obj.className = cls.replace(' on', '');
          this.pinleiC.pop(item)
      }else{
          obj.className = cls + ' on';
          this.pinleiC.push(item)
      }
      //obj.className = "on";
      // obj.style.color = "#26a2ff";
      // obj.style.border = "1px solid #26a2ff"

    },
    onfilechange: function (e) {  //获取到图片文件
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)return;
      this.txPhoto = files[0];
      
      //去上传
      let file = e.target.files[0];           
      let param = new FormData(); //创建form对象
      param.append('file',file,file.name);//通过append向form对象添加数据
      param.append('uid',this.uid);//添加form表单中其他数据
      //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };  //添加请求头
      axios.post('/api/uploadHeadimg',param,config)
      .then(response=>{
        if(response.data.state == "1"){
          console.log(response.data.data[0].headimg);
          //设置头像img
          let $img = document.getElementById("tx_img");
          //var windowURL = window.URL || window.webkitURL;
          //var dataURL = windowURL.createObjectURL(files[0]);
          var imgurl = response.data.data[0].headimg;
          $img.src = HOST + imgurl;
          saveHeadimg(HOST + imgurl);
        }
      })

    }
  }
}
</script>

<style lang="stylus">
.user-info
    background:#f2f2f2
    position:fixed
    top:0
    left:0
    width:100%
    height:100%
    z-index:10
    .title-small
      padding:10px 20px
      border-bottom:1px solid #ebebeb
      .text
          font-size:14px
          color: #9d9d9d
    .write-row
      background:#fff
      padding:10px 20px
      font-size:12px
      display:flex
      border-bottom:1px solid #ebebeb
      & span:nth-child(1)
        flex:0 0 70px
    .pinlei-tag
      background:#fff
      padding:10px 20px
      font-size:12px
      ul
        width:100%
        li
          display:inline-block
          span
            border:1px solid #26a2ff
            line-height:35px
            padding:5px
            border-radius:6px
            margin-right:20px
            color:#26a2ff
        & li:last-child span
              padding:5px 10px
    .pinlei-choose-pop
      .mint-popup-bottom
        width: 100%
        height: 50%
        top:50%
        background: #fff
      .v-modal
        opacity: 0.2
      .pop
        p
          color:#26a2ff
          padding:10px 20px
          float:left
        .choose
          float:right
        .pl-list
          clear:both
          padding:10px 20px
          margin-top:30px
          width:100%
          ul
            width:100%
            li
              display:inline-block
              span
                border:1px solid #999
                height:44px
                line-height:44px
                padding:5px
                border-radius:6px
                margin-right:8px
                color:#333
                &.on
                  border:1px solid #26a2ff
                  color:#26a2ff
    .mint-header
      color:rgb(104, 104, 104)
      background:#fff
      border-bottom:1px solid #ccc
      font-size:18px
      letter-spacing:2px
      label,span
        color:#26a2ff
    .jb-info-div
      background:#fff
      display:flex
      padding:15px 20px
      .sc-tx
        flex:0 0 50px
        width:50px
        height:50px
        position:relative
        img
          width:100%
          height:100%
          border-radius:50%
        input
          opacity:0
          position:absolute
          top:0
          left:0
          width:100%
          height:100%
      .names
        flex:1
        margin-left:10px
        margin-top:5px
        & p:nth-child(2)
          font-size:12px
          margin-top:10px
</style>