<script setup lang="ts">
import {ref} from 'vue';

const height = ref(84);

const value = ref(99999);
</script>

<template>
  <view class="navbar">
    <view class="nav-placeholder" :style="`height:${height}px;`"/>
    <view class="nav-content">
      <view class="location">
        <image class="btn-icon" src="/static/icon/location.png"></image>
        <text class="btn-text">天津</text>
      </view>
      <view class="search-box">
        <input type="text" placeholder="请输入商品名称"/>
        <button class="search-btn">搜索</button>


      </view>
      <view class="message">
        <up-badge numberType="overflow" :type="error" max="99" :value="value" :shape="circle" class="badge"></up-badge>
        <image class="btn-icon" src="/static/icon/message/message.png"></image>
        <text class="btn-text">消息</text>
      </view>
    </view>
  </view>

</template>

<style scoped lang="scss">
.navbar {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: transparent;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  flex: 1;
  flex-direction: row;
  padding: 0 20rpx;
}

.location, .message {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.btn-icon {
  width: 64rpx;
  height: 64rpx;
}

.btn-text {
  font-size: 24rpx;
  color: #333;
}

.badge {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
}


.search-box {
  flex: 1;
  position: relative;
  padding: 0 20rpx;
}

.search-box input {
  width: 100%;
  height: 48px;
  border: 1px solid #ccc;
  border-radius: 24px;
}

.search-box button {
  position: absolute;
  right: 0;
  top: 0;


  margin: 20rpx;
  background-color: #ff4d4f;
  color: white;
  border-radius: 24px;
}

</style>