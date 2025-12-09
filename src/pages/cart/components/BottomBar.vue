<script setup lang="ts">

</script>

<template>
  <view v-if="cartItems.length > 0" class="bottom-bar">
    <view class="settlement">
      <view class="checkbox" :class="{ 'checkbox-checked': allSelected }"
            @click="toggleSelectAll">
        <text v-if="allSelected" class="checkmark">✓</text>
      </view>
      <text class="select-all">全选</text>

      <view v-if="!isManaging" class="total-box">
        <view class="total-info">
          <view class="total-label">
            <text class="total-amount">已选{{ selectedCount }}件</text>
            <text class="total-label">合计：</text>
            <text class="total-price"><text class="total-label">¥</text>{{ totalPrice.toFixed(2) }}</text>
          </view>


        </view>
        <text class="discount-info">共减 ¥ {{ discount.toFixed(2) }} | 明细</text>
      </view>

      <!-- 管理模式下显示删除按钮 -->
      <view v-if="isManaging" class="checkout-btn" @click="deleteSelectedItems">
        删除商品
      </view>

      <!-- 非管理模式下显示结算按钮 -->
      <view v-else class="checkout-btn" @click="checkout">
        结算
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1rpx solid #eee;
}

.settlement {
  display: flex;
  align-items: center;
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid #eee;
}

.select-all {
  font-size: 28rpx;
  margin-left: 16rpx;
}

.total-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 32rpx;
}

.total-info {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.total-label {
  font-size: 26rpx;
}

.total-price {
  color: #ff4d4f;
  font-size: 32rpx;
  font-weight: bold;
}

.discount-info {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

.checkout-btn {
  background-color: #ff4d4f;
  color: #fff;
  padding: 20rpx 56rpx;
  border-radius: 48rpx;
  font-size: 28rpx;
  font-weight: 500;
}
</style>