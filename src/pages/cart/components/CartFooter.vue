<script setup lang="ts">
import { ref, computed } from 'vue'

// 初始化 cartItems 为响应式数组
const cartItems = ref([])

// 其他需要的数据属性
const allSelected = ref(false)
const isManaging = ref(false)
const selectedCount = ref(0)
const totalPrice = ref(0)
const discount = ref(0)

// 方法定义
const toggleSelectAll = () => {
  // 实现全选逻辑
}

const deleteSelectedItems = () => {
  // 实现删除选中项逻辑
}

const checkout = () => {
  // 实现实结算逻辑
}
</script>


<template>
<!--  <view class="cart-footer">-->
<!--    <view class="cart-footer__left">-->
<!--      <view class="checkbox">-->
<!--        <up-checkbox shape="circle" name="allSelected" @change="toggleSelectAll" size="24" ></up-checkbox>-->
<!--        <text class="select-all">全选</text>-->
<!--      </view>-->
<!--    </view>-->

<!--    <view class="cart-footer__right">-->
<!--      <view class="total-box">-->
<!--        <text >-->
<!--          <view class="total-info">-->
<!--            <text class="total-amount">已选{{ cartTotalCount }}件222</text>-->
<!--            <text class="total-label">合计：</text>-->
<!--            <text class="total-price">111</text>-->
<!--            <text class="total-label">¥</text>-->

<!--            <view class="total-coupon">-->
<!--              <text class="total-coupon-label">共减：111</text>-->
<!--              <text class="total-coupon-amount">￥ {{ couponAmount.toFixed(2) }}</text>-->
<!--              <text class="total-coupon-label"> | 明细</text>-->
<!--            </view>-->

<!--          </view>-->
<!--        </text>-->
<!--      </view>-->
<!--      <view>-->
<!--        <button class="checkout-btn">结算</button>-->
<!--      </view>-->
<!--    </view>-->

<!--  </view>-->

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
.cart-footer {
  position: fixed;
  //bottom: 0;
  height: 80px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #d5d0d0;
  padding: 0 20rpx;
  border-top: 1rpx solid #eee;

  .cart-footer__left {
    display: flex;

    :deep(.u-checkbox__icon-wrap) {
      margin: 0;
    }
    .checkbox {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .cart-footer__right {
    display: flex;
    flex-direction: row;

    .total-box {
      .total-info {
        .total-price {
          color: #f30909;
          font-size: 40rpx;
          font-weight: bold;
        }
      }
    }

  }
}


.checkout-btn {
  border-radius: 50rpx;
  padding: 0 48rpx;
  margin-left: 24rpx;

  &:after {
    border: none;
  }
}
</style>