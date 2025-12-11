<script setup lang="ts">
import {ref} from 'vue';

const userName = ref('S先生');
const userPhone = ref('1XXXXXXXXX');
const userAddress = ref('品相微菜馆');
const userAddressDetail = ref('天津市西青区XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
const userAvatar = ref('/static/icon/user/user.png');
const handleAvatarError = () => {
  userAvatar.value = '/static/logo.png';
  console.log('用户头像加载失败，已替换为默认头像');
}

const goToMessage = () => {
  uni.navigateTo({
    url: '/pages/message/message'
  })
}
</script>

<template>
  <view class="user-section">
    <view class="message-btn" @click="goToMessage">
      <image src="/static/icon/message/message.png" class="message-icon"></image>
    </view>
    <view class="user-avatar">
      <image class="avatar-img" :src="userAvatar" @error="handleAvatarError"></image>
    </view>
    <view class="avatar-placeholder"></view>
    <view class="user-info">
      <view class="user-info-header">
        <view style="padding: 4px 0">
          <view class="default-tag">默认</view>
        </view>
        <view class="address">{{ userAddress }}</view>
      </view>
      <view class="address-detail-info" @tap="goToAddress">
        <view class="address-detail">{{ userAddressDetail }}</view>
        <up-icon name="arrow-right" size="24rpx" color="#777" ></up-icon>
      </view>
      <view class="user-content">
        <view class="user-name">{{ userName }}</view>
        |
        <view class="user-phone">{{ userPhone }}</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.user-section {
  position: relative;
  padding: 32rpx;
  margin: 20rpx;
  background-color: $card-base-bg;
  border-radius: 24rpx;

}

.message-btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rpx 24rpx;
  top: -68rpx;
  right: 24rpx;
  background-color: $card-base-bg;
  border-radius: 32rpx;
}

.message-icon {
  width: 48rpx;
  height: 48rpx;
  object-fit: cover;
}


.user-info {
  display: flex;
  flex-direction: column;
}

.user-info-header {
  margin-bottom: 6rpx;
}


.user-avatar {
  position: absolute;
  top: -124rpx;
  left: 32rpx;
  background-color: #f5f5f5;
  width: 180rpx;
  height: 180rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16rpx;
  margin-bottom: 16rpx;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border: 3px solid #f12150;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  height: 40rpx;
}

.user-info-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.default-tag {
  font-size: 24rpx;
  color: $card-base-bg;
  background-color: #f12150;
  padding: 4rpx 16rpx;
  border-radius: 24rpx;
  margin-right: 12rpx;
}

.address {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 4rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 320rpx;
}

.address-detail-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.address-detail {
  font-size: 26rpx;
  color: #777;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.user-content {
  margin-top: 4rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
  color: #999;
}

.user-name, .user-address, .user-phone {
  font-size: 26rpx;
  color: #999;
}

</style>