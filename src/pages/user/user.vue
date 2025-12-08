<template>
  <view class="user-page">
    <view class="content">


      <!-- 优惠展示 -->
      <CouponSection/>

      <!-- 常用服务展示 -->
      <ServiceSection v-if="showComponents"/>

    </view>

  </view>
</template>

<script setup lang="ts">

import {defineAsyncComponent, nextTick, onMounted, ref} from 'vue'


const CouponSection = defineAsyncComponent(() => import("./components/Coupon.vue"))
const ServiceSection = defineAsyncComponent(() => import("./components/Service.vue"))

const showComponents = ref(false)

onMounted(() => {
  // 延迟加载非关键组件
  nextTick(() => {
    showComponents.value = true
  })
})


</script>


<style scoped lang="scss">
.user-page {
  background-color: $uni-bg-color;
  height: 100vh;
}

</style>
