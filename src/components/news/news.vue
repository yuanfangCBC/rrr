<template>
  <div class="news">
    <div class="header">
      <h1 class="title">资讯</h1>
    </div>
    <my-search class="search-cell"></my-search>
    <div class="fu-title">
      <ul>
        <li>
          <div>
            <router-link to="/news/item/001">
              <p>推荐</p>
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/news/item1/002">
              <p>供应信息</p>
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/news/item2/003">
              <p>求购信息</p>
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/news/item3/003">
              <p>价格行情</p>
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/news/item3/003">
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
    mounted() {
      
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
.news
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
  .fu-title
    padding: 0 20px;
    background: #fff
    height: 43px
    border-bottom: 1px solid #d9d9d9
    position: fixed
    z-index: 5
    width: 100%
    top: 90px
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
  .itemtab
    position:absolute
    top:130px
    left:0
    width:100%
    height:70%
</style>