<template>
  <div class="user-coloection">
    <header-title title="我的收藏" link="/mine"></header-title>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" @click="getzx">资讯</mt-tab-item>
      <mt-tab-item id="2">问题</mt-tab-item>
      <mt-tab-item id="3">文章</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
      <scroller style="top: 0px"
          :on-infinite="infiniteZx">
          <div class="zx">
            <ul>
              <li v-for="(item,index) in zixunList">
                <div class="tw-cell">
                  <div class="wen">
                    <p>{{item.title}}</p>
                    <p>{{item.date}}</p>
                  </div>
                  <div class="tu">
                    <img src="http://192.168.2.115:3000/upload/img/5982c99cdd4a4f0c2ce3fb8c_IMG_7191.JPG" alt="">
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </scroller>
        
        
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        aaaaa        
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <scroller style="top: 0px"
          :on-refresh="refresh"
          :on-infinite="infinite">
          <div v-for="(item, index) in wendaList" class="row">
            {{ item }}
          </div>
        </scroller>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui' 
import headerTitle from 'components/mine/headerTitle.vue'
import {getClientHeight} from 'common/js/util.js'
export default {
  data() {
    return {
      selected : '1',
      zixunList : [],
      wendaList : [],
      allLoaded: false,
      scrollMode:"auto",
      tabitemHei : 0,
      currentPage : 1,
      pagesize : 5
    }
  },
  mounted() {
   
    // navbar点击事件 获取相应数据
    // let _navbar = document.getElementsByClassName('mint-navbar')[0];
    // let _item = _navbar.getElementsByTagName('a');
    // console.log(_item[0])
    // _item[0].click = function(){
    //   alert('sdfds')
    // }

    //设置tab内容高度
    this.tabitemHei = getClientHeight();
    let _tabitem = document.getElementsByClassName('mint-tab-container-item');
    for(let item of _tabitem){
      item.style.height = (this.tabitemHei-114) + 'px' //114 是title加tab的高度
    }
    //获取资讯list
    // axios.post("/api/getuserZixun").then((result) => {
    //   if(result.data.state == "1"){
    //     let arr = result.data.data;
    //     this.zixunList = arr;
    //     //是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，
    //     //要在修改某些数据后才能写，$nextTick
    //     this.$nextTick(function () {  
    //       this.scrollMode = "touch";  
    //     }); 
    //   }else{
    //     //失败
    //   }
    // })

    let params = {"page" : this.currentPage,"pagesize":this.pagesize}
    axios.post("/api/getzixun",params).then((result) => {
      console.log("======:" + this.currentPage)
      if(result.data.state == "1"){
        let arr = result.data.data;
        this.zixunList = arr; 
      }
    })

    
    
    for (var i = 1; i <= 20; i++) {
        this.wendaList.push('mounted - ' + i)
      }
      this.top = 1
      this.bottom = 20
    
  },
  methods : {

    infiniteZx(done){
      this.currentPage = ++this.currentPage;
      console.log("infiniteZx:" + this.currentPage)
      let params = {"page" : this.currentPage,"pagesize":this.pagesize}
      axios.post("/api/getzixun",params).then((result) => {
        if(result.data.state == "1"){
          let arr = result.data.data
          this.zixunList.push(arr); 
        }else{
          alert("nomore")
        }
      })
    },
    refresh (done) {
      //下拉
        setTimeout(() => {
          var start = this.top - 1
          for (var i = start; i > start - 10; i--) {
            this.wendaList.splice(0, 0, i + ' - refresh')
          }
          this.top = this.top - 10
          done()
        }, 1500)
      },

    infinite (done) {
      //上拉
      setTimeout(() => {
        var start = this.bottom + 1
        for (var i = start; i < start + 10; i++) {
          this.wendaList.push(i + ' - infinite')
        }
        this.bottom = this.bottom + 10
        done()
      }, 1500)
    },

    getzx : function(){
      alert("pp")
    }

    
  },
  components: {
     headerTitle
  }
}
</script>

<style lang="stylus">
.row
    width: 100%
    height: 50px
    padding: 10px 0
    font-size: 16px
    line-height: 30px
    text-align: center
    color: #444
    background-color: #fff

.user-coloection
    background:#f2f2f2
    position:fixed
    top:0
    left:0
    width:100%
    height:100%
    z-index:10
    .mint-navbar
      margin:20px
      border-radius:10px
      border: 1px solid #26a2ff
      .mint-tab-item
        border-right:1px solid #26a2ff
        color:#26a2ff
        padding:10px 0
        &:last-child
          border-right:none
        &:first-child.is-selected
          border-top-left-radius:10px
          border-bottom-left-radius:10px
        &:last-child.is-selected
          border-top-right-radius:10px
          border-bottom-right-radius:10px
        &.is-selected
          border-bottom:none
          margin-bottom: 0px
          background:#26a2ff
          color:#fff
    .zx
      ul
        li
          border-bottom:1px solid #f2f2f2
          .tw-cell
            background:#fff
            display:flex
            padding:15px 20px
            .tu
              flex:0 0 80px
              width:80px
              height:80px
              img
                width:100%
                height:100%
            .wen
              flex:1
              margin: 10px 20px 10px 0
              display:flex
              flex-direction: column
              height:60px
              & p:nth-child(1)
                flex:0 0 80%
                font-size:16px
                line-height: 20px
                color:#333
              & p:nth-child(2)
                flex:1
                font-size:12px
                color:#686868

</style>