<template lang="pug">
  div#app
    <!-- 头部栏 -->
    v-header(v-if="seller.supports" :seller="seller")
    <!-- 导航栏 -->
    div.tab
      div.tab-item
        router-link.luYou(to="/goods") 商品
      div.tab-item
        router-link.luYou(to="/ratings") 评价
      div.tab-item
        router-link.luYou(to="/seller") 商家
    <!-- 内容 -->
    router-view(keep-alive :seller="seller")
</template>

<script>
import header from './components/header/header'
const ERR_OK = 0

export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    // 获取数据
    this.$http.get('/api/seller').then((response) => {
      const res = response.body
      if (res.errno === ERR_OK) {
        this.seller = res.data
      }
    }, (response) => {
      alert('请求数据失败，请检查网络设置后再重试')
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="scss">
@import "./commom/scss/myMixin";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .tab{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    @include border-1px(rgba(7,17,27,0.1));
    .tab-item{
      flex: 1;
      text-align: center;
      .luYou{
        display: block;
        font-size: 14px;
        font-weight: bold;
        color: rgb(77,85,93);
      }
      .router-link-active{
        color: rgb(240,20,20);
        font-size: 16px;
      }
    }
  }
}
</style>
