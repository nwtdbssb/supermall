<template>
  <div class="tab-bar-item" :style="activeStyle" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      // isActive: false
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : null
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path).catch(() => { })
    }
  },

}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  /* tabbar常用高度 */
  height: 49px;
  /* line-height: 49px; */
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  margin-top: 6px;
  vertical-align: middle;
}
</style>

