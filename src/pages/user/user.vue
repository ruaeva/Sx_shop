<template>
  <view class="user-page">
    <view class="header">

      <CustomNavbar />
      <UserSection/>
    </view>

    <view class="content">


      <!-- 优惠展示 -->
      <CouponSection/>

      <!-- 常用服务展示 -->
      <ServiceSection/>
    </view>

  </view>
</template>

<script setup lang="ts">

import {ref,onMounted} from 'vue'
import {onLoad} from "@dcloudio/uni-app";

import UserSection from "@/pages/user/components/UserSection.vue";
import CouponSection from "@/pages/user/components/CouponSection.vue"
import ServiceSection from "@/pages/user/components/ServiceSection.vue"

onMounted(() => {

})



</script>


<style scoped lang="scss">
.user-page {
  background-color: $uni-bg-color;
  height: 10000px;


}

.header {
  padding-top: 144px;
  background-image: linear-gradient(to bottom, #fd7f9d, #F5F7FC);
}
</style>
