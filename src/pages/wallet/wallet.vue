<template>
  <view class="wallet-page">
    <!-- 余额信息 -->
    <view class="balance-section">
      <view class="balance-info">
        <text class="balance-label">可用余额</text>
        <text class="balance-value">¥{{ balance }}</text>
      </view>
      <button class="withdraw-btn" @click="goToWithdraw">提现</button>
    </view>

    <!-- 账单列表 -->
    <view class="bill-list">
      <view class="list-header">
        <text class="header-title">交易记录</text>
        <text class="header-more">查看更多</text>
      </view>

      <view v-for="(item, index) in transactionList" :key="index" class="transaction-item">
        <view class="transaction-content">
          <view class="transaction-info">
            <text class="transaction-title">{{ item.title }}</text>
            <text class="transaction-time">{{ item.time }}</text>
          </view>
          <text class="transaction-amount">{{ item.amount }}</text>
        </view>
      </view>
    </view>

    <!-- 功能入口 -->
    <view class="function-section">
      <view class="function-item" @click="goToRecharge">
        <image src="/static/icon/wallet/recharge.png" class="function-icon"></image>
        <text class="function-text">充值</text>
      </view>
      <view class="function-item" @click="goToTransfer">
        <image src="/static/icon/wallet/transfer.png" class="function-icon"></image>
        <text class="function-text">转账</text>
      </view>
      <view class="function-item" @click="goToBill">
        <image src="/static/icon/wallet/bill.png" class="function-icon"></image>
        <text class="function-text">账单</text>
      </view>
    </view>
  </view>
</template>


<script setup lang="ts">
import {ref} from 'vue';

// 钱包数据结构
interface Transaction {
  id: string;
  title: string;
  amount: string;
  time: string;
}

// 模拟数据
const balance = ref(1234.56);
const transactionList = ref<Transaction[]>([
  {
    id: '1',
    title: '商品购买',
    amount: '-89.00',
    time: '2023-12-01 15:30'
  },
  {
    id: '2',
    title: '充值',
    amount: '+100.00',
    time: '2023-11-30 10:15'
  },
  {
    id: '3',
    title: '退款',
    amount: '+25.00',
    time: '2023-11-28 14:20'
  }
]);

// 页面跳转方法
const goToRecharge = () => {
  uni.navigateTo({
    url: '/pages/wallet/recharge'
  });
};

const goToTransfer = () => {
  uni.navigateTo({
    url: '/pages/wallet/transfer'
  });
};

const goToBill = () => {
  uni.navigateTo({
    url: '/pages/wallet/bill'
  });
};

const goToWithdraw = () => {
  uni.navigateTo({
    url: '/pages/wallet/withdraw'
  });
};
</script>


<style scoped lang="scss">
.wallet-page {
  background-color: #f8f8f8;
  height: 100vh;
}

.balance-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  margin-top: 20rpx;
  border-radius: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

  .balance-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .balance-label {
      font-size: 28rpx;
      color: #666;
    }

    .balance-value {
      font-size: 48rpx;
      font-weight: bold;
      color: #333;
    }
  }

  .withdraw-btn {
    width: 100%;
    padding: 20rpx;
    background-color: #ff4d4f;
    color: white;
    border-radius: 10rpx;
    font-size: 28rpx;
    border: none;
    outline: none;
  }
}

.bill-list {
  margin-top: 30rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;

  .list-header {
    display: flex;
    justify-content: space-between;
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;

    .header-title {
      font-size: 30rpx;
      color: #333;
    }

    .header-more {
      font-size: 24rpx;
      color: #999;
    }
  }

  .transaction-item {
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .transaction-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .transaction-info {
        flex: 1;

        .transaction-title {
          font-size: 28rpx;
          color: #333;
        }

        .transaction-time {
          font-size: 24rpx;
          color: #999;
          margin-top: 4rpx;
        }
      }

      .transaction-amount {
        font-size: 28rpx;
        color: #ff4d4f;
        font-weight: bold;
      }
    }
  }
}

.function-section {
  display: flex;
  justify-content: space-around;
  margin-top: 30rpx;
  padding: 30rpx;
  background-color: #ffffff;
  border-radius: 20rpx;

  .function-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx;
    border-radius: 10rpx;
    background-color: #f5f5f5;

    &:active {
      opacity: 0.8;
    }

    .function-icon {
      width: 40rpx;
      height: 40rpx;
      margin-bottom: 10rpx;
    }

    .function-text {
      font-size: 24rpx;
      color: #333;
    }
  }
}
</style>

