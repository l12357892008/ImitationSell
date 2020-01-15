<template lang="pug">
  div.header
    div.centent-wrapper
      div.avatar
        img(width="64" height="64" :src="seller.avatar")
      div.content
        div.title
          span.brand
          span.name {{seller.name}}
        div.description {{seller.description}}/{{seller.deliveryTime}}分钟送达
        div.support
          span.icon(:class="classMap[seller.supports[0].type]")
          span.text {{seller.supports[0].description}}
      div.support-count(v-if="seller.supports" @click="showDetail(true)")
        span.count {{seller.supports.length}}个
        span.iconfont.icon-jiantou(style="font-size:8px;")
    <!-- 公告栏 -->
    div.bulletin-wrapper(@click="showDetail(true)")
      span.bulletin-title
      span.bulletin-text {{seller.bulletin}}
      span.iconfont.icon-jiantou
    div.background
      img(width="100%" height="100%" :src="seller.avatar")
    <!-- 过渡动画 -->
    transition(name="fade")
      <!-- 详情遮罩层 -->
      div.detail(v-show="detailShow")
        div.detail-wrapper.clearfix
          div.detail-content
            h1.name {{seller.name}}
            star.star(:size="48" :score="seller.score")
            div.title
              div.line
              div.text 优惠信息
              div.line
            ul.supports(v-if="seller.supports")
              li.support-item(v-for="(item,index) in seller.supports")
                span.icon(:class="classMap[item.type]")
                span.text {{item.description}}
            div.title
              div.line
              div.text 商家公告
              div.line
            div.bulletin
              p.content {{seller.bulletin}}
        div.detail-close
          span.iconfont.icon-cha(@click="showDetail(false)")
</template>

<script>
import star from '../star/star.vue'
export default {
  data() {
    return {
      detailShow: false // 是否显示详情层
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() { // 优惠图标数组
    this.classMap = ['decrease', 'discount', 'special', 'invoic', 'guarantee']
  },
  methods: {
    showDetail(e) { // 显示关闭详情遮罩层
      this.detailShow = e
    }
  },
  components: {
    star
  }
}
</script>

<style lang="scss" scoped>
@import "../../commom/scss/myMixin";
.fade-enter-active, .fade-leave-active { // 过渡过程中的效果
  transition: all 0.5s ease;
}
.fade-enter, .fade-leave-to { //  出现开始时以及消失结束时的状态
  opacity: 0;
}
.header{
  color: #fff;
  position: relative;
  background: rgba(7, 17, 27, 0.5);
  overflow: hidden;
  .centent-wrapper{
    padding: 1.5rem 0.75rem 1.125rem 1.5rem;
    font-size: 0;
    // background: #42B983;
    position: relative;
    .avatar{
      display: inline-block;
      background: #42B983;
      vertical-align: top;
      img{
        border-radius: 5px;
      }
    }
    .content{
      display: inline-block;
      margin-left: 1rem;
      .title{
        margin: 2px 0 8px 0;
        .brand{
          display: inline-block;
          width: 30px;
          height: 18px;
          @include bg-image('./img/brand')
          background-size: 30px 18px;
          background-repeat: no-repeat;
          vertical-align: top;
        }
        .name{
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description{
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support{
        .icon{
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: top;
          &.decrease{
            @include bg-image('./img/decrease_1')
          }
          &.discount{
            @include bg-image('./img/discount_1')
          }
          &.guarantee{
            @include bg-image('./img/guarantee_1')
          }
          &.invoic{
            @include bg-image('./img/invoice_1')
          }
          &.special{
            @include bg-image('./img/special_1')
          }
        }
        .text{
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .support-count{
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count{
        vertical-align: top;
        font-size: 10px;
        margin-right: 2px;
      }
    }
  }
  .bulletin-wrapper{
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background: rgba(7, 17, 27, 0.2);
    .bulletin-title{
      display: inline-block;
      height: 12px;
      width: 22px;
      @include bg-image('./img/bulletin')
      background-size: 22px 12px;
      background-repeat: no-repeat;
      vertical-align: top;
      margin-top: 8px;
    }
    .bulletin-text{
      margin: 0 4px;
      font-size: 10px;
      vertical-align: top;
    }
    .icon-jiantou{
      position: absolute;
      font-size: 8px;
      top: 1px;
      right: 12px;
    }
  }
  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail{
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    backdrop-filter: blur(10px);
    .detail-wrapper{
      min-height: 100%;
      width: 100%;
      .detail-content{
        margin-top: 64px;
        padding-bottom: 64px;
        .name{
          line-height: 16px;
          text-align: center;
          font-weight: bold;
        }
        .star{
          margin-top: 18px;
        }
        .title{
          display: flex;
          flex-direction: row;
          width: 80%;
          margin: 28px auto 24px auto;
          .line{
            flex: 1;
            top: -6px;
            @include border-1px(rgba(255, 255, 255, 0.2))
          }
          .text{
            padding: 0 12px;
            font-weight: bold;
            font-size: 14px;
          }
        }
        .supports{
          width: 80%;
          margin: 0 auto;
          .support-item{
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child{
              margin-bottom: 0;
            }
            .icon{
              display: inline-block;
              width: 16px;
              height: 16px;
              margin-right: 6px;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              vertical-align: middle;
              &.decrease{
                @include bg-image('./img/decrease_2')
              }
              &.discount{
                @include bg-image('./img/discount_2')
              }
              &.guarantee{
                @include bg-image('./img/guarantee_2')
              }
              &.invoic{
                @include bg-image('./img/invoice_2')
              }
              &.special{
                @include bg-image('./img/special_2')
              }
            }
            .text{
              font-size: 12px;
              line-height: 12px;
              vertical-align: middle;
            }
          }
        }
        .bulletin{
          width: 80%;
          margin: 0 auto;
          .content{
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }
    .detail-close{
      position: relative;
      width: 32px;
      height: 32px;
      margin: -36px auto 0 auto;
    }
  }
}
</style>
