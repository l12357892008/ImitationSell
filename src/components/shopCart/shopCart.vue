<template>
  <div id="shopCart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight : totalCount > 0}">
            <i class="iconfont icon-ziyuan"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight : totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{highlight : totalPrice > minPrice}">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
      }
    },
    props:{
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      },
      selectFoods: {
        type: Array,
        default() { // 未获取到数据时默认的值，避免需要用到该属性时为undefined
          return [{
            price: 11,
            count: 1
          }]
        }
      }
    },
    computed:{
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
      payDesc() {
        if(this.totalPrice === 0){
          return `￥${this.minPrice}元起送`
        } else if(this.totalPrice < this.minPrice){
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      }
    },
    methods:{

    }
  }
</script>

<style lang='scss' scoped>
  @import "../../commom/scss/myMixin";

  #shopCart {
    height: 48px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 30;
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

          .icon-ziyuan{
            color: #80858a;
            font-size: 24px;
            line-height: 44px;
          }

          &.highlight{
            background: rgb(0, 160, 220);

            .icon-ziyuan{
              color: white;
            }
          }
        }

        .num{
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

        &.highlight{
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

      .pay{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        background: #2b333b;

        &.highlight{
          background: #00b43c;
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }
</style>
