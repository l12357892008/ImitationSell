<template>
  <div class="n-tag">
    <h1>所有标签</h1>
    <button @click="shuffle">shuffle</button>
    <transition-group name="cell" tag="div" class="container">
      <div v-for="cell in cells" :key="cell.id" class="cell">
        {{cell.number}}
      </div>
    </transition-group>
  </div>
</template>

<script>
  import * as _ from 'lodash'
  export default {
    data() {
      return {
        cells: Array.apply(null, {
          length: 81
        }).map(function(ss,index) {
          return {
            id: index,
            number: index % 9 + 1
          };
        })
      }
    },
    created() {
      this.shuffle()
    },
    methods: {
      shuffle(){
        this.cells = _.shuffle(this.cells);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .n-tag {
    background: #fff;
    padding: 20px;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    width: 238px;
    margin-top: 10px;
  }
  .cell {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 25px;
    height: 25px;
    border: 1px solid #aaa;
    margin-right: -1px;
    margin-bottom: -1px;
  }
  .cell:nth-child(3n) {
    margin-right: 0;
  }
  .cell:nth-child(27n) {
    margin-bottom: 0;
  }
  .cell-move {
    transition: transform 1s;
  }
</style>
