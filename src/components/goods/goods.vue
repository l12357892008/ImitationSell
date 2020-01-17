<template lang="pug">
  div#goods
    div.menu-wrapper(ref='menuWrapper')
      ul
        li.menu-item(v-for="(item,index) in goods" :class='{current:currentIndex === index}' @click='selectMenu(index, $event)')
          span.icon(v-show="item.type > 0" :class="classMap[item.type]")
          span.text {{item.name}}
    div.foods-wrapper(ref='foodsWrapper')
      ul
        li.food-list.food-list-hook(v-for="(item,index1) in goods")
          h1.title {{item.name}}
          ul
            li.food-item(v-for="(food,index2) in item.foods")
              div.icon
                img(:src="food.icon")
              div.content
                h2.name {{food.name}}
                p.desc {{food.description}}
                div.extra
                  span.count 月售{{food.sellCount}}份
                  span  好评率{{food.rating}}%
                div.price
                  span.now ￥{{food.price}}
                  span.old(v-show="food.oldPrice") ￥{{food.oldPrice}}
                div.cartControl-wrapper
                  v-cartControl( :food="food" :isDisable='isDisable' @increase='bounceBall')
    v-shopCart( ref='shopCartR' :deliveryPrice = "seller.deliveryPrice" :minPrice = "seller.minPrice" :selectFoods="selectFoods" @disable='disable')
</template>

<script>
  import BScroll from 'better-scroll'; // 组件滑动库，详见http://ustbhuangyi.github.io/better-scroll/doc/api.html
  import shopCart from '../shopCart/shopCart.vue'
  import cartControl from '../cartControl/cartControl.vue'
  import Vue from 'vue'

  const ERR_OK = 0
  export default {
    data() {
      return {
        goods: [],
        listHeight: [], // 各分类商品高度数组
        scrollY: 0, // 当前滚动位置
        isDisable: 'auto',  // 是否可点击增加按钮
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoic', 'guarantee']
      this.$http.get('/api/goods').then((res) => {
        let response = res.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => { // 在create钩子函数中dom元素还没渲染完成，想对dom进行操作一定要放到nextTick函数中延迟操作,相当于放进mounted钩子函数
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    computed: {
      currentIndex() {  // 当前在哪一栏目位置
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
      },
      selectFoods() {
        let selected = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count > 0){
              selected.push(food)
            }
          })
        })
        return selected
      }
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, { // 初始化，使控件menuWrapper可以滑动
          click: true   // better-scroll默认会阻止点击事件，要手动设置允许点击
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, { // probeType设置滑动事件监听等级，1滑动一定时间后触发,2滑动时触发,3手指离开滑动动画进行时也触发
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => { // 监听滑动事件
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() { // 初始化商品每个栏目位置
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += (item.clientHeight + 18); // 每个栏目最后一个food-item有18px的margin没有被算进去，手动加上
          this.listHeight.push(height)
        }
      },
      selectMenu(index, event) { // 左侧列表点击联动右侧列表滑动
        /* better-scroll在允许点击后，在PC端和某些移动端上因为没有将touchend事件move掉,点击事件会执行两次*/
        /* better-scroll派发的event事件和原生js的event,其中只有better-scroll派发的event事件有_constructed属性*/
        /* 其值为true,所以为了保证点击事件只执行一次，判断为js原生事件时return不执行任何操作 */
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 100) // 滑动到el的dom元素位置，300ms动画时间
      },
      bounceBall(e) { // 获取点击增加按钮的元素对象
        this.$refs.shopCartR.drop(e)
      },
      disable(input) {
        this.isDisable = input
      }
    },
    components: {
      'v-shopCart': shopCart,
      'v-cartControl': cartControl
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../commom/scss/myMixin";
  #goods {
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;

    .menu-wrapper {
      flex: none;
      width: 80px;
      // overflow-y: auto;
      // overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      background: #f3f5f7;

      .menu-item {
        display: table;
        height: 54px;
        width: 54px;
        line-height: 14px;
        padding: 0 13px;

        &.current {
          position: relative;
          background: cyan;
          margin-top: -1px;
          z-index: 10;
          font-weight: 700;

          .text {
            border: none;
          }
        }

        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          margin-top: 14px;

          &.decrease {
            @include bg-image('./img/decrease_3')
          }

          &.discount {
            @include bg-image('./img/discount_3')
          }

          &.guarantee {
            @include bg-image('./img/guarantee_3')
          }

          &.invoic {
            @include bg-image('./img/invoice_3')
          }

          &.special {
            @include bg-image('./img/special_3')
          }
        }

        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
        }
      }
    }

    .foods-wrapper {
      flex: auto;
      -webkit-overflow-scrolling: touch;

      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }

      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 10px;

        @include border-1px(rgba(7, 17, 27, 0.2))
        .icon {
          flex: none;
          width: 57px;
          margin-right: 10px;

          img {
            width: 100%;
          }
        }

        .content {
          flex: auto;

          .name {
            font-size: 14px;
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            color: rgb(7, 17, 27);
          }

          .desc {
            margin-bottom: 8px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }

          .extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);

            .count {
              margin-right: 12px;
            }
          }

          .price {
            font-weight: bold;
            line-height: 24px;

            .now {
              margin-right: 18px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }

            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }

          .cartControl-wrapper{
            position: absolute;
            right: 0;
            bottom: 4px;
          }
        }
      }
    }
  }
</style>
