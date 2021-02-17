<template>
  <div class="bottom-menu">
    <CheckButton
      class="select-all"
      @checkBtnClick="checkBtnClick"
      v-model="isSelectAll"
    />
    <span>全选</span>
    <span class="total-price">合计: ¥{{ totalPrice }}</span>
    <span class="buy-product" @click="calcClick"
      >去计算({{ checkLength }})</span
    >
  </div>
</template>

<script>
import CheckButton from './CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      return this.cartList.length == 0 ? false : this.cartList.every(item => item.checked)
      // return !this.cartList.find(item => !item.checked);
      // return this.cartList.length == this.checkLength
    }
  },
  methods: {
    checkBtnClick () {
      // 1.判断是否有未选中的按钮
      // let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

      // 2.有未选中的内容, 则全部选中
      /*       if (isSelectAll) {
              this.$store.state.cartList.forEach(item => {
                item.checked = true;
              });
            } else {
              this.$store.state.cartList.forEach(item => {
                item.checked = false;
              });
            }*/
      /* if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false);
      } else {
        this.cartList.forEach(item => item.checked = true);
      } */
      this.isSelectAll ? this.cartList.forEach(item => item.checked = false) : this.cartList.forEach(item => item.checked = true)
    },
    calcClick () {
      if (this.cartList.every(item => !item.checked)) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 40px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #888;
  line-height: 40px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 40px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  float: right;
}
</style>
