<template>
  <nav-bar class="nav-bar">
    <div slot="left" class="back" @click="backClick">
      <img src="@assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(title, index) in titles"
        class="title-item"
        :class="{ active: currentIndex === index }"
        @click="titleClick(index)"
      >
        {{ title }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from '@components/common/navbar/NavBar'


export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick () {
      this.$router.back()
    }
  },
}
</script>

<style scoped>
.nav-bar {
  background-color: #fff;
}
.back img {
  vertical-align: middle;
}
.title {
  display: flex;
  font-size: 16px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>