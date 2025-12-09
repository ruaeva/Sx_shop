<script setup lang="ts">

</script>

<template>
  <view class="navbar">
    <view class="nav-left">
      <text class="title">购物车</text>
      <text class="quantity" v-if="cartItems.length > 0"> ({{ cartItems.length }})</text>
    </view>
    <view class="header-right">
      <text v-if="!isManaging" class="manage-btn" @click="toggleManageMode">管理</text>
      <text v-else class="manage-btn" @click="toggleManageMode">退出管理</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
/* 头部 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  padding-top: 84rpx;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  //background-image: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(252, 80, 100, 0.2));
  //backdrop-filter: blur(30px);
  z-index: 1;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.07);
}

.nav-left,
.nav-right {
  margin: 24rpx 32rpx;
  display: flex;
  align-items: end;
}

.title {
  color: #000000;
  font-size: 36rpx;
  font-weight: bold;
}

.count {
  color: #999;
  margin-left: 10rpx;
  font-size: 32rpx;
}

.manage-btn {
  font-size: 28rpx;
  color: #333;
}

</style>