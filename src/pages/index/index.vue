<template>
  <view class="index-page">
    <view class="header">
      <Navbar/>
      <NewUser/>
      <CategoryPanel/>
    </view>

    <view class="content">


      <GoodsList/>
    </view>

  </view>
</template>

<script lang="ts" setup>
import Navbar from "@/pages/index/components/navbar.vue";
import GoodsList from "@/pages/index/components/GoodsList.vue";
import NewUser from "@/pages/index/components/NewUser.vue";
import CategoryPanel from "@/pages/index/components/CatetoryPanel.vue";
</script>

<style lang="scss" scoped>
.index-page {
  background-color: $uni-bg-color;
}

.header {
  background-image: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(252, 80, 100, 0.2));
}


.content {
  padding: 0 20rpx 44rpx;

}
</style>
