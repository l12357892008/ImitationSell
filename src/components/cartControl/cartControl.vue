<template>
  <div id="cartControl">
    <transition name="roll">
      <div class="cart-decrease iconfont icon-jian" v-show="food.count > 0" @click="decreaseCount($event)" :style="{pointerEvents:isDisable}">
      </div>
    </transition>
    <div class="cart-number" v-show="food.count > 0"> {{ food.count }} </div>
    <div class="cart-increase  iconfont icon-jia" @click="increaseCount($event)" :style="{pointerEvents:isDisable}"></div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    data() {
      return {}
    },
    props: {
      food: {  // 商品信息
        type: Object
      },
      isDisable: {  // 是否可点击，小球下落动画过程中使按钮不可点击
        type: String,
        default() {
          return 'auto'
        }
      },
      origin: {   // 是否触发小球下落动画,在购物车详情中使用该组件不触发小球动画
        type: Boolean,
        default() {
          return true
        }
      }
    },
    created() {},
    methods: {
      increaseCount(event) {  // 增加选中数量
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        if(this.origin){  // 触发小球下落动画
          this.$emit('increase', event.target)
        }
      },
      decreaseCount(event) {  // 减少选中数量
        if (!event._constructed) {
          return
        }
        this.food.count--
      }
    }
  }
</script>

<style lang="scss" scoped>
  .roll-enter-active,
  .roll-leave-active {
    transition: all 0.4s linear;
  }

  .roll-enter,
  .roll-leave-to {
    opacity: 0;
    transform: translate3d(24px, 0, 0) rotate(360deg);
  }

  .roll-leave,
  .roll-enter-to {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0deg);
  }


  #cartControl {
    display: flex;
    flex-direction: row;
    font-size: 0;
    line-height: 24px;

    .cart-decrease,
    .cart-increase {
      flex: 1;
      padding: 6px;
      font-size: 24px;
      z-index: 1;

      &.icon-jian,
      &.icon-jia {
        color: #00a0dc;
      }
    }

    cart-increase: {
      z-index: 2;
    }

    .cart-number {
      flex: 1;
      font-size: 15px;
      color: rgb(147, 153, 159);
      display: flex;
      align-items: center;
    }
  }
</style>
