<template>
  <view class="category-page">
    <!-- 顶部区域 -->
    <view class="page-header">
      <!-- 搜索栏组件 -->
      <view class="search-bar">
        <!-- 如果有搜索组件，在这里引入 -->
        <!-- <search-bar @search="handleSearch" /> -->
      </view>

      <!-- 顶部分类栏组件 -->
      <TopCategoryBar @change="handleCategoryChange"/>
    </view>

    <!-- 内容区域 -->
    <view class="page-content">
      <CategoryPanel />
    </view>
  </view>
</template>

<script setup>
import {ref} from 'vue'
import TopCategoryBar from './components/TopCategoryBar.vue'
import CategoryPanel from "./components/CategoryPanel.vue";

// 当前选中的顶部分类
const currentTopCategory = ref(null);

// 处理顶部分类变化
const handleCategoryChange = (category) => {
  console.log('顶部分类变更:', category);
  currentTopCategory.value = category;
};
</script>

<style scoped lang="scss">
.category-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;
}

// 顶部区域
.page-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);

  .search-bar {
    padding: 20rpx 24rpx;
    background-color: #fff;
  }
}

// 内容区域
.page-content {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

</style>
