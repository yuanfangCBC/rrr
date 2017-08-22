<template>
  <div class="ask-item" @click="hidepop()">
    <div class="wrapper" ref="askWrapper">
      <ul>
        <li v-for="(item,index) in itemarr">
          <div class="author-ask">
            <author-comp :itemc="itemarr[index]" class="author"></author-comp>
            <span class="more" @click="clickItemMore">...</span>
          </div>
          <div class="content-ask">
            <p>{{itemarr[index].title}}</p>
            <div class="img-ask" v-if="itemarr[index].img.length!=0">
              <div class="a" v-for="imgs in itemarr[index].img"><img :src="urls+imgs" alt="" :onerror="errorImg01"></div>
            </div>
            <div class="right-cz">
              <span>回答{{itemarr[index].asknum}}</span>&nbsp
              <span>关注{{itemarr[index].gznum}}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="loading-wrapper" >
          <mt-spinner v-show="loadmore" color="#26a2ff" type="triple-bounce"></mt-spinner>
          <p v-show="nomore">没有更多啦</p>
      </div>
    </div>
    <popover-comp ref="popover" :popoverVisible="popoverVisible"></popover-comp>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import authorComp from 'components/common/authorComp.vue'
import popoverComp from 'components/common/popoverComp.vue'
import { HOST} from 'common/js/constdata.js'
export default {
  
  data() {
    return {
      errorImg01: 'this.src="' + require('../.././assets/logo.png') + '"',
      itemarr:[],
      loadmore : false,
      nomore : false,
      currentPage : 1,
      pagesize : 3,
      pullup: true,
      urls : '',
      popoverVisible : false,
      scrollY : 0,
      refreshDelay: 20
    }
  },
  mounted() {
      this.initData();
      this.urls = HOST;
  },
  methods:{
    
    initData(){
      let params = {"page" : this.currentPage,"pagesize":this.pagesize}
      axios.post("/api/getaskInfo",params).then((result) => {
        if(result.data.state == "1"){
          let arr = result.data.data
          this.loadmore = false;
          if(this.itemarr == ''){
          this.itemarr = arr ; 
          }else{
            for(let item of arr){
              this.itemarr.push(item)
            }
          }
          this.$nextTick(() => {
            //dom更新了 可以调用better-scroll了
            this.initScroll();
          })
          this.currentPage = this.currentPage+1;
        }else if(result.data.state == '0'){
          setTimeout(() => {
            this.loadmore = false;
          }, 3000)
        }
      })
    },
    initScroll(){
      if(this.contentScroll){
        this.contentScroll.refresh();
      }else{
        this.contentScroll = new BScroll(this.$refs.askWrapper,{
          probeType:3,
          click:true
        });
      }
      this.contentScroll.on('scroll',(pos)=>{
        this.scrollY = Math.abs(Math.round(pos.y));
        //console.log("====scrollY" + this.scrollY)
      });
      this.contentScroll.on('touchend', (pos) => {
        // 下拉动作
        if (pos.y > 50) {
          //console.log('xiala')
        }
      });
      this.contentScroll.on('scrollEnd', () => {
        // 滚动到底部
        if (this.contentScroll.y <= (this.contentScroll.maxScrollY + 50)) {
          //console.log('shang')
          this.loadData();
        }
      })
    },
    loadData(){
      this.loadmore = true;
      this.nomore = false;
      let params = {"page" : this.currentPage,"pagesize":this.pagesize}
      axios.post("/api/getaskInfo",params).then((result) => {
        if(result.data.state == "1"){
          let arr = result.data.data
          setTimeout(() => {
            this.loadmore = false;
            if(this.itemarr == ''){
            this.itemarr = arr ; 
            }else{
              for(let item of arr){
                this.itemarr.push(item)
              }
            }
            
          }, 1500)
          this.$nextTick(() => {
            //dom更新了 可以调用better-scroll了
            this.initScroll();
          })
          this.currentPage = this.currentPage+1;
        }else if(result.data.state == '0'){
          setTimeout(() => {
            this.loadmore = false;
            this.nomore = true;
            setTimeout(() => {
              this.nomore = false;
            }, 1000)
          }, 1500)
        }
      })
    },
    clickItemMore(event){
      event.stopPropagation();//取消事件冒泡
      //网页  点击事件只执行一次
      if(!event._constructed){
        return;
      }
      let obj = event.target;
      let top = obj.offsetTop;
      let left = obj.offsetLeft;
      let scrollY = this.scrollY
      
      //调用子组件的方法
      if(!this.popoverVisible){
        this.$refs.popover.show(left,top,scrollY)
      }
      this.popoverVisible = !this.popoverVisible;
    },
    hidepop(){
      if(this.popoverVisible){
        this.popoverVisible = false;
      }
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.contentScroll && this.contentScroll.refresh()
    }
  },
  components:{
    authorComp,
    popoverComp
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    itemarr() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style lang="stylus">
.ask-item
  color:#666
  font-size:15px
  position:relative
  width:100%
  .wrapper
    height:70%
    width:100%
    position:fixed
    top:134px
    left:0
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
        border-bottom:1px solid #d9d9d9 
        margin-bottom:10px
        background:white
        .author-ask
          display:flex
          border-bottom:1px solid #d9d9d9
          padding:10px 20px
          .author
            flex:1
          .more
            flex:0 0 30px
            text-align:center
            font-size:20px
            font-weight:700
        .content-ask
          margin:10px 20px
          .img-ask
            display: flex
            flex-direction: row
            margin:10px 0
            .a
              flex:1
              height:60px
              img
                width:90%
                height:100%
                margin:0 5%
          .right-cz
            margin:10px 0
            text-align:right
            span
              font-size:14px
              color:#6d6d6d


  
</style>