<template>
  <div id="app">
    <v-shuffle></v-shuffle>
  </div>
</template>

<script>
import shuffle from '../shuffle/shuffle.vue'
export default {
  data() {
    return {
    }
  },
  props: {
  },
  created() {
  },
  methods: {
  },
  components: {
    'v-shuffle': shuffle
  }
}
</script>

<style lang="scss" scoped>
</style>
