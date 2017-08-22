<template>
  <div class="find">
    <div class="header">
      <h1 class="title">发现</h1>
    </div>
    <my-search class="search-cell"></my-search>
    <scroll class="wrapper"
            :data="zixunList"
            :pullup="pullup"
            @scrollToEnd="loadData" :listenScroll="true" @scroll="scroll">
      <ul class="content">
        <li v-for="(item,index) in zixunList">
          <div class="tw-cell">
            <div class="wen">
              <p>{{item.title}}</p>
              <p>{{item.date}}</p>
            </div>
            <div class="tu">
              <img src="http://localhost:3000/upload/img/5982c99cdd4a4f0c2ce3fb8c_IMG_7191.JPG" alt="">
            </div>
          </div>
        </li>
      </ul>
      <div class="loading-wrapper" >
        <mt-spinner v-show="loadmore" color="#26a2ff" type="triple-bounce"></mt-spinner>
        <p v-show="nomore">没有更多啦</p>
      </div>
    </scroll>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import scroll from 'components/common/scroll.vue'
import mySearch from 'components/common/mySearch.vue'
export default {
  data() {
    return {
      zixunList : [],
      currentPage : 1,
      pagesize : 3,
      pullup: true,
      loadmore : false,
      nomore : false
    }
  },
  mounted() {
    this.initData();
  },
  methods:{
    scroll(pos){
      console.log(Math.abs(Math.round(pos.y)))
    },
    initData(){
      let params = {"page" : this.currentPage,"pagesize":this.pagesize}
      axios.post("/api/getzixun",params).then((result) => {
        if(result.data.state == "1"){
          let arr = result.data.data
          this.loadmore = false;
          if(this.zixunList == ''){
          this.zixunList = arr ; 
          }else{
            for(let item of arr){
              this.zixunList.push(item)
            }
          }
          this.currentPage = this.currentPage+1;
        }else if(result.data.state == '0'){
          setTimeout(() => {
            this.loadmore = false;
          }, 3000)
        }
      })
    },
    loadData(){
      this.loadmore = true;
      this.nomore = false;
      let params = {"page" : this.currentPage,"pagesize":this.pagesize}
      axios.post("/api/getzixun",params).then((result) => {
        //console.log("======:" + this.currentPage)
        if(result.data.state == "1"){
          let arr = result.data.data
          setTimeout(() => {
            this.loadmore = false;
            if(this.zixunList == ''){
            this.zixunList = arr ; 
            }else{
              for(let item of arr){
                this.zixunList.push(item)
              }
            }
            this.currentPage = this.currentPage+1;
          }, 1500)
        }else if(result.data.state == '0'){
          setTimeout(() => {
            this.loadmore = false;
            this.nomore = true;
          }, 1500)
        }
      })
    }
  },
  components:{
    scroll,
    mySearch
  }
}
</script>

<style lang="stylus">
.find
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
  .search-cell
    margin-top:44px
  .wrapper
    height:75%
    position:relative
    top:46px
    .loading-wrapper
      text-align:center
      height:24px
      width:100%
      position:absolute
      left:0
      bottom:-24px
      p
        width:100%
        line-height:24px
        font-size:14px
        color:#686868
    ul
      position:absolute
      top:0
      left:0
      width:100%
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