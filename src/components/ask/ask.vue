<template>
  <div class="ask">
    <div class="header">
      <h1 class="title">问答</h1>
    </div>
    <my-search class="search-cell"></my-search>
    <div class="fu-title">
      <ul>
        <li>
          <div>
            <router-link to="/ask/item/001">
              <p>全部</p>
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/ask/item1/002">
              <p>黄瓜</p>
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/ask/item2/003">
              <p>番茄</p>
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/ask/item3/003">
              <p>水稻</p>
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/ask/item4/004">
              <p>葡萄</p>
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/ask/item5/005">
              <p>更多</p>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import mySearch from 'components/common/mySearch.vue'
export default {
  data() {
      return {
        searchResult: [{"title":'abc',"value":"123"}],
        searchValue:''
      }
    },
    
    watch: {
      searchValue:function(){
        console.log(this.searchValue)
      }
    },
    methods: {
      tj(){

      }
    },
    components:{
      mySearch
    }
}
</script>

<style lang="stylus">
.ask
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
    z-index: 1000
    color: #666
    .title 
      font-size: 16px
      line-height: 44px
      text-align: center
      margin: 0 auto
  .search-cell
    margin-top:44px
  .fu-title
    padding:0 20px
    background:white
    height:43px
    border-bottom:1px solid #d9d9d9
    position:fixed
    z-index:5
    width:100%
    top:90px
    ul
      width:100%
      position:relative
      li
        display:inline-block
        line-height:43px
        .router-link-active
          p
            color:#108ee9
        p
          padding-right:15px
          &.on
            color:#108ee9
        &:last-child
          position:absolute
          top:0
          right:20px
    
    
</style>