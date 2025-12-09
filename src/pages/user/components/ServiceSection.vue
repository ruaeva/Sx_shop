<script setup lang="ts">

// 定义默认图标路径常量
const DEFAULT_ICON_PATH = '/static/logo.png';

const serviceList = [
  {
    icon: '/static/icon/service/wallet.png',
    text: '我的钱包',
    url: '/pages/wallet/wallet'
  },
  {
    icon: '/static/icon/service/refund.png',
    text: '退押金',
    url: '/pages/coupon/coupon'
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

// 页面白名单（可根据实际业务添加）
const ALLOWED_PAGES = [
  '/pages/wallet/wallet',
  '/pages/coupon/coupon',
  '/pages/service/service',
  '/pages/collection/collection',
  '/pages/help/help',
  '/pages/about/about',
  '/pages/feedback/feedback'
];

const handleClick = (handler) => {
  // 简化参数校验
  if (!handler || typeof handler !== 'object' || !handler.url || typeof handler.url !== 'string') {
    console.error('Invalid handler or URL');
    return;
  }

  // 白名单校验
  if (!ALLOWED_PAGES.includes(handler.url)) {
    console.warn(`Unauthorized navigation attempt to ${handler.url}`);
    return;
  }

  // 导航操作及异常处理
  uni.navigateTo({
    url: handler.url
  }).catch(() => {
    console.error('Navigation failed'); // 不打印详细错误信息
  });
};

const onImageError = (index) => {
  // 添加索引合法性校验
  if (typeof index === 'number' && index >= 0 && index < serviceList.length) {
    serviceList[index].icon = DEFAULT_ICON_PATH;
  } else {
    console.warn('Invalid index for image error fallback');
  }
};

</script>

<template>
  <view class="service-section">
    <text class="section-title">常用服务</text>
    <view class="service-grid">
      <view
          v-for="(item, index) in serviceList"
          :key="index"
          class="service-item"
          @click="handleClick(item)"
      >
        <image class="service-icon" :src="item.icon" @error="onImageError(index)"></image>
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

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-left: 16rpx;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16rpx;
  margin-top: 10rpx;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 32rpx;
  padding: 16rpx;
  text-align: center;
  white-space: nowrap;
}

.service-icon {
  width: 64rpx;
  height: 64rpx;
  object-fit: contain;
  margin-bottom: 12rpx;
}

.service-text {
  font-size: 26rpx;
  color: #333;
}
</style>