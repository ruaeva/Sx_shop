<script setup lang="ts">
import { ref } from 'vue'

// 定义 emit
const emit = defineEmits<{
  'category-change': [category: { name: string; index: number }]
}>()

// 当前激活的分类索引
const categoryActiveIndex = ref(0)

// 分类列表
const categoryList = ref([
  {
    name: '手机',
    index: 0
  },
  {
    name: '电脑',
    index: 1
  },
  {
    name: '平板',
    index: 2
  },
  {
    name: '电视',
    index: 3
  },
  {
    name: '智能家居',
    index: 4
  },
  {
    name: '配件',
    index: 5
  },
  {
    name: '其他',
    index: 6
  }
])

// 处理分类点击
const handleCategoryClick = (item: { name: string; index: number }) => {
  categoryActiveIndex.value = item.index
  emit('category-change', item)
}

</script>

<template>
  <view class="category-sidebar__container">
    <view class="category-sidebar">
      <view class="category-sidebar__list">
        <view
            v-for="(item, index) in categoryList"
            :key="index"
            class="category-sidebar__item"
            :class="{ active: categoryActiveIndex === item.index }"
            @click="handleCategoryClick(item)">
          {{ item.name }}
        </view>
      </view>
    </view>
  </view>


</template>

<style scoped lang="scss">
.category-sidebar__container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  overflow: hidden;

  .category-sidebar {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .category-sidebar__list {
      flex: 1;
      display: flex;
      flex-direction: column;

      .category-sidebar__item {
        padding: 16rpx 32rpx;
        color: #333333;
        background-color: #ffffff;
        font-size: 28rpx;
        border-bottom: 1px solid #ebebeb;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;

        &.active {
          color: #ff0000;
          background-color: #f5f5f5;
          font-weight: bold;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 6rpx;
            height: 40rpx;
            background-color: #ff0000;
            border-radius: 0 4rpx 4rpx 0;
          }
        }
      }
    }
  }


}

</style>