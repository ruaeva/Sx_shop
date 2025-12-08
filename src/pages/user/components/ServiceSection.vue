<script setup lang="ts">
const serviceList = [
  {
    icon: '/static/service/icon_service_1.png',
    text: '我的钱包',
    url: '/pages/wallet/wallet'
  },
  {
    icon: '/static/service/icon_service_3.png',
    text: '钥匙盒',
    url: '/pages/service/service'
  },
  {
    icon: '/static/service/icon_service_2.png',
    text: '收藏',
    url: '/pages/collection/collection'
  },

  {
    icon: '/static/service/icon_service_4.png',
    text: '开发票',
    url: '/pages/help/help'
  }
  ,
  {
    icon: '/static/service/icon_service_5.png',
    text: '售后',
    url: '/pages/about/about'
  }
  ,
  {
    icon: '/static/service/icon_service_6.png',
    text: '账单',
    url: '/pages/feedback/feedback'
  }
]

const handleClick = (handler) => {
  handler();
}

</script>

<template>
  <view class="service-section">
    <text class="section-title">常用服务</text>
    <view class="service-grid">
      <view
          v-for="(item, index) in serviceList"
          :key="index"
          class="service-item"
          @click="handleClick(item.handler)"
      >
        <image class="service-icon" :src="item.icon"></image>
        <text class="service-text">{{ item.text }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.service-section {
  background-color: #fff;
  padding: 20rpx;
  margin: 20rpx;
  border-radius: 24rpx;
}

</style>