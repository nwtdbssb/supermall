<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addCart" />
    <back-top @click.native="btClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from '@components/common/scroll/Scroll'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '@network/detail'
import GoodsList from '@components/content/goods/GoodsList'
import { itemListenerMixin, backTopMixin } from '@common/mixin'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    GoodsParam,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopYs: [],
      currentIndex: 0,
    }
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      const data = res.result
      // _1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      // _2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // _3.创建店铺信息
      this.shop = new Shop(data.shopInfo)

      // _4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // _5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // _6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
    })
  },
  methods: {
    ...mapActions(['addToCart']),
    detailImageLoad () {
      this.$refs.scroll.refresh()

      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    contentScroll (position) {
      // 1.获取y值
      const positionY = -position.y
      // 2.positionY和主题中的值进行对比
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }

      // 3.是否显示回到顶部
      this.listenShowBackTop(position)
    },
    addCart () {
      // 1.获取购物车需要展示的商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      // 一定要传iid
      product.iid = this.iid

      // 2.将商品添加到购物车里
      /* this.$store.dispatch('addToCart', product).then(res => {
        console.log(res)
      }) */
      this.addToCart(product).then(res => {
        // console.log(res)
        this.$toast.show(res)
      })
    }
  },
  mounted () {
  },
  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9998;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
</style>