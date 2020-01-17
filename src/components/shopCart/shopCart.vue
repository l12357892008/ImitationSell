<template>
  <div id="shopCart">
    <div class="wrapper">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper" @click="showCart">
            <div class="logo" :class="{highlight : totalCount > 0}">
              <i class="iconfont icon-ziyuan"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight : totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay" :style="{pointerEvents:isDisable}">
          <div class="pay" :class="{highlight : totalPrice > minPrice}">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <transition-group name="ballRoll" @before-enter='beforeEnter' @enter='Enter' @after-enter='afterEnter'>
          <div v-for="item in balls" :key='item.id' v-show="item.show" class="ball">
            <div class="inner"></div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        balls: Array.apply(null, { // 生成1个小球
          length: 1,
        }).map((array1, index) => {
          return {
            id: index,
            show: false
          }
        }),
        dropBall: [], // 已经在下落的小球 
      }
    },
    props: {
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      },
      selectFoods: {
        type: Array,
        default () { // 未获取到数据时默认的值，避免需要用到该属性时为undefined
          return []
        }
      }
    },
    computed: {
      totalPrice() { // 购物车商品价格总和
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() { // 购物车商品数量总数
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() { // 结算描述
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      isDisable() {  // 结算按钮是否可点击
        if(this.totalPrice >= this.minPrice){
          return 'auto'
        }else {
          return 'none'
        }
      }
    },
    methods: {
      drop(el) { // 小球下落动画
        this.$emit('disable', 'none')  // 一次只下落一个小球，通知小球下落时间内增减按钮不可点击
        setTimeout(() => {
          this.$emit('disable', 'auto')
        },500)
        for (let i = 0; i < this.balls.length; i++) {
          if (!this.balls[i].show) {
            this.balls[i].show = true
            this.balls[i].el = el // 将点击的按钮的dom元素信息存入小球
            this.dropBall.push(this.balls[i])
            console.log(this.dropBall)
            break
          }
        }
      },
      beforeEnter(el) { // 下落动画开始前
        let count = this.dropBall.length - 1
        let ball = this.dropBall[count]
        let rect = ball.el.getBoundingClientRect() // 获取点击的按钮的位置信息
        let rect2 = el.getBoundingClientRect()
        let x = rect.left
        let y = rect.top
        // el.style.display = '';
        el.style.transform = `translate3d(0, -${y}px, 0)`

        let inner = el.getElementsByClassName('inner')[0]
        inner.style.transform = `translate3d(${x}px,0,0)`
      },
      Enter(el) { // 下落动画进行中
        let hh = el.offestHeight // 浏览器重绘
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0, 0, 0)'
          let inner = el.getElementsByClassName('inner')[0]
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter(el) { // 下落动画结束
        let ball = this.dropBall.shift()
        ball.show = false
      },
      pay() {
        alert('醒醒,你哪来的钱')
      },
      showCart() { // 显示购物车

      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "../../commom/scss/myMixin";

  .ballRoll-move {
    transition: all 0.4s cubic-bezier(.83, -0.57, 1, .59);
  }

  #shopCart {
    height: 48px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 30;
  }
  .wrapper{
    position: relative;
  }
  .content {
    display: flex;
    flex-direction: row;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: auto;
      display: flex;
      flex-direction: row;

      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        padding: 6px;
        margin: 0 12px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #2b343c;
          text-align: center;

          .icon-ziyuan {
            color: #80858a;
            font-size: 24px;
            line-height: 44px;
          }

          &.highlight {
            background: rgb(0, 160, 220);

            .icon-ziyuan {
              color: white;
            }
          }
        }

        .num {
          position: absolute;
          background: rgb(240, 20, 20);
          top: 0px;
          right: 2px;
          padding: 2px 4px;
          font-size: 12px;
          border-radius: 16px;
          text-align: center;
          font-weight: 700;
          color: white;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        line-height: 24px;
        margin-top: 12px;
        height: 24px;
        font-size: 16px;
        font-weight: 700;
        box-sizing: border-box;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        line-height: 24px;
        height: 24px;
        margin: 12px 0 0 12px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        background: #2b333b;

        &.highlight {
          background: #00b43c;
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 16px;
        background: red;
        transition: all 0.4s linear;
      }
    }
  }
</style>
