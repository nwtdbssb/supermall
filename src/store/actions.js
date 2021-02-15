import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addToCart ({ state, commit }, payload) {
    // 1.查找之前数组中是否有该商品
    let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    // 2.判断oldProduct
    if (oldProduct) {
      commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      commit(ADD_TO_CART, payload)
    }
  }
}