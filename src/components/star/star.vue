<template lang="pug">
  div.star(:class="starType")
    span.star-item(v-for="itemClass in itemClasses" :class="itemClass")
</template>

<script>
const LENGTH = 5 // 总星星数
const CLS_ON = 'on' // 星星点亮
const CLS_HALF = 'half' // 半星
const CLS_OFF = 'off' // 星星未点亮
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() { // 根据组件使用场景设置星星大小
      return 'star-' + this.size
    },
    itemClasses() { // 根据评分打星
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0 /* 计算是否存在半星 */
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++){
        result.push(CLS_ON)
      }
      if (hasDecimal){
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH){
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../commom/scss/myMixin";
.star{
  font-size: 0;
  text-align: center;
  .star-item{
    display: inline-block;
    background-repeat: no-repeat;
    height: 100%;
    background-size: 100% 100%;
  }
  &.star-48{
    height: 20px;
    .star-item{
      width: 20px;
      margin-right: 22px;
    }
    .on{
      @include bg-image('./img/star48_on')
    }
    .half{
      @include bg-image('./img/star48_half')
    }
    .off{
      @include bg-image('./img/star48_off')
    }
  }
  &.star-36{
    height: 15px;
    background-size: 15px 15px;
    .star-item{
      width: 15px;
      margin-right: 16px;
    }
    .on{
      @include bg-image('./img/star36_on')
    }
    .half{
      @include bg-image('./img/star36_half')
    }
    .off{
      @include bg-image('./img/star36_off')
    }
  }
  &.star-24{
    height: 10px;
    .star-item{
      width: 10px;
      margin-right: 3px;
    }
    .on{
      @include bg-image('./img/star24_on')
    }
    .half{
      @include bg-image('./img/star24_half')
    }
    .off{
      @include bg-image('./img/star24_off')
    }
  }
}
</style>
