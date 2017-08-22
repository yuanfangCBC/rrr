import Vue from 'vue'
import Router from 'vue-router'
import news from 'components/news/news.vue'
import ask from 'components/ask/ask.vue'
import find from 'components/find/find.vue'
import mine from 'components/mine/mine.vue'
import userInfo from 'components/mine/mine_info.vue'
import userColl from 'components/mine/mine_collection.vue'
import item from 'components/common/item.vue'
import askitem from 'components/common/askitem.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/news' },//设置默认路由
    {
      path: '/news',//资讯
      component: news,
      redirect: '/news/item/001',
      children:[
          { path: '/news/item/:id', component: item},
          { path: '/news/item1/:id', component: item},
          { path: '/news/item2/:id', component: item},
          { path: '/news/item3/:id', component: item}
      ]
    },
    {
      path: '/ask',//问答
      component: ask,
      redirect: '/ask/item/001',
      children:[
          { path: '/ask/item/:id', component: askitem},
          { path: '/ask/item1/:id', component: askitem},
          { path: '/ask/item2/:id', component: askitem},
          { path: '/ask/item3/:id', component: askitem},
          { path: '/ask/item4/:id', component: askitem},
          { path: '/ask/item5/:id', component: askitem}
      ]
    },
    {
      path: '/find',//发现
      component: find
    },
    {
      path: '/mine',//我的
      component: mine
    },
    {
      path:'/mineinfo',//我的资料
      component: userInfo
    },
    {
      path:'/minecoll',//我的收藏
      component: userColl
    }
    
  ]
})
