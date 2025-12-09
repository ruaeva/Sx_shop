<script setup lang="ts">
import {ref} from "vue";

const list = ref([
  {
    image: 'https://img95.699pic.com/photo/50112/1369.jpg_wh860.jpg',
    price: 0.99
  },
  {
    image: 'https://img95.699pic.com/photo/50112/1369.jpg_wh860.jpg',
    price: 1.99
  },
  {
    image: 'https://img95.699pic.com/photo/50112/1369.jpg_wh860.jpg',
    price: 0.01
  },
  {
    image: 'https://img95.699pic.com/photo/50112/1369.jpg_wh860.jpg',
    price: 2.99
  },
  {
    image: 'https://img95.699pic.com/photo/50112/1369.jpg_wh860.jpg',
    price: 7.99
  },
  {
    image: 'https://img95.699pic.com/photo/50112/1369.jpg_wh860.jpg',
    price: 5.99
  }, {
    image: 'https://img95.699pic.com/photo/50112/1369.jpg_wh860.jpg',
    price: 5.99
  },
  {
    image: 'https://img95.699pic.com/photo/50112/1369.jpg_wh860.jpg',
    price: 19.99
  },
  {
    image: 'https://img95.699pic.com/photo/50112/1369.jpg_wh860.jpg',
    price: 9.99
  }
])
</script>

<template>
  <view class="new-user-container">
    <view class="new-user-header">
      <text class="new-user-title">新用户专享</text>
      <text class="new-user-info">还可购买
        <text class="new-user-count">10</text>
        件
      </text>

    </view>
    <view class="new-user-content">
      <up-scroll-list :indicator="false" class="scroll-view">
        <view v-for="(item, index) in list" :key="index" class="new-user-item">
          <image :src="item.image" class="new-user-image"></image>
          <text class="new-user-text">￥{{ item.price }}/斤</text>
        </view>
      </up-scroll-list>
    </view>
  </view>
</template>

<style scoped lang="scss">
.u-scroll-list {
  padding-bottom: 0;
}

.scroll-view {
  padding: 12rpx;
  background-color: #fdfdfd;
  border-radius: 24rpx;
  overflow: hidden;
}

.new-user-container {
  background-color: rgba(250, 144, 113, 0.45);
  padding: 12rpx;
  margin: 20rpx;
  border-radius: 32rpx;
}

.new-user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 12rpx 8rpx;
}

.new-user-title {
  display: flex;
  font-size: 32rpx;
  color: #000;
  font-weight: bold;
}

.new-user-info {
  font-size: 28rpx;
  color: #000;

}

.new-user-count {
  display: inline-block;
  padding: 4rpx;
  margin: 0 8rpx;
  border-radius: 8rpx;
  color: #fd2626;
  background-color: rgba(253, 38, 38, 0.3);
}

.new-user-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 12rpx;

}

.new-user-image {
  width: 160rpx;
  height: 120rpx;
  background-color: #f5f5f5;
  border-radius: 12rpx;
}

.new-user-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #fd2626;
}

</style>