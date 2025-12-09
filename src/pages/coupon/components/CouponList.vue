<!-- src/components/CouponList.vue -->
<template>
  <view class="coupon-list">
    <view
        v-for="(item, index) in coupons"
        :key="item.id"
        class="coupon-item"
        :class="{ used: item.status === 'used', expired: item.status === 'expired' }"
    >
      <view class="coupon-left">
        <text class="amount">¥{{ item.amount }}</text>
        <text class="condition">{{ item.condition }}</text>
      </view>
      <view class="coupon-right">
        <text class="title">{{ item.title }}</text>
        <text class="expire">{{ item.expireDate }} 到期</text>
        <text class="desc">{{ item.description }}</text>
      </view>
      <view class="action-section">
        <button
            v-if="item.status === 'available'"
            class="action-btn use-btn"
            @click="$emit('use-coupon', item.id)"
        >
          使用
        </button>
        <button
            v-else
            class="action-btn status-btn"
            :class="item.status"
        >
          {{ getStatusText(item.status) }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type CouponStatus = 'available' | 'used' | 'expired';

interface Coupon {
  id: string;
  title: string;
  amount: number;
  condition: string;
  expireDate: string;
  description: string;
  status: CouponStatus;
}

// 状态文本映射
const statusTextMap: Record<CouponStatus, string> = {
  available: '可用',
  used: '已使用',
  expired: '已过期'
};

defineProps<{
  coupons: Coupon[]
}>();

defineEmits<{
  (e: 'use-coupon', id: string): void
}>();

function getStatusText(status: CouponStatus): string {
  return statusTextMap[status] || '未知状态';
}
</script>

<style scoped lang="scss">
.coupon-list {
  padding: 20rpx;
}

.coupon-item {
  display: flex;
  background: linear-gradient(90deg, #fff9f9, #ffffff);
  border-radius: 24rpx;
  margin-bottom: 20rpx;
  padding: 24rpx;
  position: relative;
  overflow: hidden;
}

.coupon-item.used {
  opacity: 0.6;
  background: #fff;
  border-color: #ccc;
}

.coupon-item.expired {
  opacity: 0.6;
  background: #fff;
  border-color: #999;
}

.coupon-left {
  width: 200rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px dashed #ff4d4f;
  padding-right: 20rpx;
  margin-right: 20rpx;
}

.amount {
  font-size: 48rpx;
  font-weight: bold;
  color: #ff4d4f;
}

.condition {
  font-size: 24rpx;
  color: #ff4d4f;
  margin-top: 10rpx;
}

.coupon-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.expire {
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
}

.desc {
  font-size: 24rpx;
  color: #666;
  margin-top: 10rpx;
}

.action-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: 24rpx;
  min-height: 48rpx;
  padding: 14rpx 16rpx;
  border-radius: 24rpx;
  min-width: 100rpx; /* 设置固定宽度 */
}

.action-btn:after {
  border: none;
}

.use-btn {
  background-color: #ff4d4f;
  color: white;
}

.status-btn {
  background-color: #f5f5f5;
  color: #999;
  border: none;
}

.status-btn.used {
  border: 1px solid #ff4d4f;
  background-color: transparent;
  color: #ff4d4f;
}

.status-btn.expired {
  border: 1px solid #ff4d4f;
  background-color: transparent;
  color: #ff4d4f;
}
</style>
