<template>
  <div class="judian-search">

    <div class="search-input">
      <div class="icon-sear">
        <span class="icon-left iconfont icon-sousuo-sousuo"></span>
      </div>
      <input class="sear-inp" @keyup="keyup($event)" placeholder="Search..." type="tel" v-model="searchText"/>
      <div class="go-search" v-show="stateCle">
          <p @click="toSearch">搜索</p>
      </div>
    </div>
    
    <div class="searh-list" v-if="stateCle">
      <ul>
        <h1>热门搜索</h1>
        <li v-for="val in list">
          {{val}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {checkPhone} from 'common/js/util.js'
export default {
  props: {
    
  },
  data() {
    return {
      searchText:'',
      stateCle: false,
      list : ['abc','abcd','bc','bcd']
    }
  },
  methods:{
    keyup(ev) {
      this.stateCle = true;
      if(this.searchText == ''){
        this.stateCle = false
      }

    },
    clear() {
      this.searchText = '';
      this.stateCle = false
    },
    toSearch(){
      alert(this.searchText)
      this.clear();
    }
  }

}
</script>

<style lang="stylus">
.judian-search
  background:white
  position:relative
  .searh-list
    position:absolute
    top:46px
    left:0
    z-index:10
    background:#fdfdfd
    width:100%
    ul
      h1
        padding: 20px 15px 10px 15px
        font-size: 16px
        color:#108ee9
      li
        line-height:40px
        border-bottom: 1px solid #d9d9d9
        padding:0 20px
  .search-input
    position:absolute
    top:0px
    left:0
    z-index:10
    background:white
    width:96%
    display:flex
    height:30px
    font-size:14px
    line-height:30px
    border: 8px solid #f2f2f2
    .sear-inp
      flex:1
      outline: 0
      line-height:30px
      .mint-cell-wrapper
        padding: 0 0
    .icon-sear
      flex:0 0 30px
      text-align:center
      .icon-left
        padding:12px 0
        font-size:16px
    .go-search
      flex:0 0 50px
      text-align:center
      border-left:2px solid #f9f9f9
      margin:5px 0
      line-height:20px
      p
        line-height:20px
        font-size:14px
        color: #108ee9
</style>