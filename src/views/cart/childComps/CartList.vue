<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"
        class="cart-list-item"
      />
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'


import Scroll from '@components/common/scroll/Scroll'

import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>
.cart-list {
  margin-top: 44px;
  height: calc(100vh - 44px - 40px - 49px);
}
.content {
  height: 100%;
}
</style>