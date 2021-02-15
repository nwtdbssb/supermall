import { debounce } from './utils'
import BackTop from '@components/content/backTop/BackTop'

export const itemListenerMixin = {
  mounted () {
    const newRefresh = debounce(this.$refs.scroll.refresh, 10)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    btClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop (position) {
      this.isShowBackTop = (-position.y) > 2500
    }
  },
}