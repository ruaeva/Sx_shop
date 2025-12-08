<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 定义响应式数据
const discountCouponCount = ref(0)
const couponCount = ref(0)

// 模拟API获取优惠券数量
const fetchCouponCounts = async () => {
  try {
    // // 这里应该是实际的API调用
    // const res = await api.getCouponCounts()
    // discountCouponCount.value = res.discountCoupons
    // couponCount.value = res.coupons

    // 模拟数据
    discountCouponCount.value = 1
    couponCount.value = 3
  } catch (error) {
    console.error('获取优惠券数量失败:', error)
  }
}

onMounted(() => {
  fetchCouponCounts()
})

const goToCoupon = () => {
  uni.navigateTo({
    url: '/pages/coupon/coupon'
  })
}

</script>

<template>
  <view class="coupon-section">
    <view class="coupon-item" @click="goToCoupon">
      <image class="coupon-bg" src="/static/img/user/honbao.png"></image>
      <text class="coupon-label">抵扣券</text>
      <text class="coupon-text">
        <text class="coupon-count">{{ discountCouponCount }}</text>
        张
      </text>
    </view>
    <view class="coupon-item" @click="goToCoupon">
      <image class="coupon-bg" src="/static/img/user/honbao.png"></image>
      <text class="coupon-label">优惠券</text>
      <text class="coupon-text">
        <text class="coupon-count">{{ couponCount }}</text>
        张
      </text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.coupon-section {
  display: flex;
  gap: 24rpx;
  border-radius: 32rpx;
  margin: 24rpx;
}

.coupon-item {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 32rpx;
  background-color: #ffffff;
  border-radius: 32rpx;

}

.coupon-bg {
  position: absolute;
  width: 160rpx;
  height: 160rpx;
  object-fit: contain;
  margin-bottom: 16rpx;
  right: -30rpx;
  transform: rotate(30deg);
}

.coupon-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 8rpx;
  font-weight: bold;
}

.coupon-count {
  font-size: 36rpx;
  font-weight: bold;
  color: #ff4d4f;
}

.coupon-text {
  font-size: 26rpx;
  color: #666;
}
</style>