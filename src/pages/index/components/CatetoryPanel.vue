<template>
  <view class="category-section">
    <scroll-view class="category-scroll" scroll-x="true">
      <view class="category-grid">
        <view v-for="(item, index) in categories" :key="index" class="category-item">
          <image :src="item.icon" class="category-icon"></image>
          <text class="category-name">{{ item.name }}</text>
        </view>
      </view>
    </scroll-view>

    <view class="custom-scrollbar-container">
      <view class="custom-scrollbar">
        <view class="scrollbar-track"></view>
        <view
            class="scrollbar-thumb"
            @click="scrollRight"
            :style="{ transform: `translateX(${thumbPosition}px)` }"></view>


      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import categories from '@/data/categories.json'
</script>

<style scoped>
.category-section {
  margin-bottom: 32rpx;
}

.category-scroll {
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  /* 自定义滚动条样式 */

  &::-webkit-scrollbar {
    height: 8rpx;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #9a0808;
    border-radius: 4rpx;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
}

.category-grid {
  display: inline-grid;
  grid-template-columns: repeat(8, 1fr);
  align-items: center;
  gap: 20rpx;
  padding: 0 48rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-icon {
  width: 124rpx;
  height: 124rpx;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  margin-bottom: 8rpx;
}

.category-name {
  font-size: 24rpx;
  color: #333;
  font-weight: bold;
}

/* 自定义滚动条样式 */
.custom-scrollbar-container {
  display: flex;
  align-items: center;
  justify-content: center;

}

.custom-scrollbar {
  display: flex;
  position: relative;
  margin-top: 16rpx;
  width: 80rpx;
}

.scrollbar-track {
  position: absolute;
  top: 0;
  height: 12rpx;
  width: 100%;
  background-color: rgb(180, 177, 177, 0.7);
  border-radius: 12rpx;
}

.scrollbar-thumb {
  position: absolute;
  top: 0;
  width: 42rpx;
  height: 12rpx;
  background-color: rgba(248, 30, 30, 0.6);
  border-radius: 12rpx;
  transition: all 0.3s ease;
  cursor: pointer;
}
</style>