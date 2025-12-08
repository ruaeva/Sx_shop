<script setup lang="ts">

</script>

<template>
<view class="custom-navbar">
  <up-navbar
      leftText="返回"
      title="个人中心"
      :safeAreaInsetTop="false"
  >
    <template #right>
     <slot></slot>
    </template>
    <template #left>
      <slot></slot>
    </template>
  </up-navbar>
</view>
</template>

<style scoped lang="scss">

</style>