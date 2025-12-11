<template>
  <view class="index-page">
    <view class="header">

      <CustomNavbar/>
      <NewUser/>
      <CategoryPanel/>
    </view>

    <view class="content">


      <GoodsList/>
    </view>

  </view>
</template>

<script setup>
import CustomNavbar from "@/pages/index/components/CustomNavbar.vue"
import GoodsList from "@/pages/index/components/GoodsList.vue";
import NewUser from "@/pages/index/components/NewUser.vue";
import CategoryPanel from "@/pages/index/components/CatetoryPanel.vue";
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  height: 44px;
  width: 100%;
  background-color: #e5e5e5;
  z-index: 99;
}

.index-page {
  background-color: $uni-bg-color;
}

.header {
  background-image: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(252, 80, 100, 0.2));
}


.content {
  //padding: 0 0 44rpx;

}
</style>
