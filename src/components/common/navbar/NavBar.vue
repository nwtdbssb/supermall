<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  line-height: 44px;
  text-align: center;
  font-size: 20px;
  box-shadow: 0px 2px 2px rgba(100, 100, 100, 0.08);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>