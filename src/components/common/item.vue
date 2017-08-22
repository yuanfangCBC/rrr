<template>
  <div class="item">
    <div class="new-item-wrapper" ref="contentWrap">
      <ul>
        <li v-for="(item,index) in itemarr" @click="clickli">
          <item-cell-a :itema="itemarr[index]" v-if="itemarr[index].tag==1"></item-cell-a>
          <item-cell-b :itemb="itemarr[index]"  v-if="itemarr[index].tag==2"></item-cell-b>
          <item-cell-c :itemc="itemarr[index]"  v-if="itemarr[index].tag==3"></item-cell-c>
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
import itemCellA from 'components/common/itemCellA.vue'
import itemCellB from 'components/common/itemCellB.vue'
import itemCellC from 'components/common/itemCellC.vue'
import BScroll from 'better-scroll'
import popoverComp from 'components/common/popoverComp.vue'
// <span>{{$route.params.id}}</span>
export default {
  data() {
    return {
      itemarr:[],
      tag:2,
      scrollY : 0,
      popoverVisible : false,
      currentPage : 1,
      pagesize : 3,
      loadmore : false,
      nomore : false,
      refreshDelay: 20
    }
  },
  mounted() {
    this.initData();
  },
  methods:{
    initData(){
      let params = {"page" : this.currentPage,"pagesize":this.pagesize}
      axios.post("/api/gettjInfo",params).then((result) => {
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
          this.currentPage = this.currentPage+1;
          this.$nextTick(() => {
            //dom更新了 可以调用better-scroll了
            this.initScroll();
          })
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
        this.contentScroll = new BScroll(this.$refs.contentWrap,{
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
      axios.post("/api/gettjInfo",params).then((result) => {
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
          });
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
    clickli(){
      if(!event._constructed){
        return;
      }
      let obj = event.target;
      let top = obj.offsetTop;
      let left = obj.offsetLeft;
      let movey = this.scrollY
      console.log("item-movey:" + movey)
      //调用子组件的方法
      if(!this.popoverVisible){
        this.$refs.popover.show(left,top,movey)
      }
      this.popoverVisible = !this.popoverVisible;
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.contentScroll && this.contentScroll.refresh()
    }
    
  },
  components: {
    itemCellA,
    itemCellB,
    itemCellC,
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
.item
  background:white
  .new-item-wrapper
    height:70%
    width:100%
    position:fixed
    top:134px
    left:0
    ul
      position: absolute
      top: 0
      left: 0
      width: 100%
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
  
</style>