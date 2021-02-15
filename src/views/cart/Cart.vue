<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ count }})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />

    <!-- 底部的汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from '@components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    /* cartLength () {
      return this.$store.getters.cartLength
    } */
    ...mapGetters({ count: 'cartLength' })
  }
}
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>