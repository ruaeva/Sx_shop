<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import Product, { type Product as ProductType } from "@/api/Product";
import { onLoad, onReachBottom } from '@dcloudio/uni-app';

// 定义组件属性
interface Props {
  isManaging?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isManaging: false
});

// 定义事件
const emit = defineEmits<{
  (e: 'itemClick', item: ProductType): void;
  (e: 'addCart', id: number): void;
}>();

// 状态管理
const isLoading = ref(true); // 设置加载状态
const loadStatus = ref<'loadmore' | 'loading' | 'nomore'>('loadmore');
const page = ref(1);
const pageSize = ref(8);
const hasMore = ref(true);
const hasError = ref(false);

// 推荐商品列表
const recommendList = ref<ProductType[]>([]);

// 图片加载状态
const imageLoadingStatus = ref<Record<number, boolean>>({});

// 使用 defineOptions 定义组件选项
defineOptions({
  options: {
    styleIsolation: 'shared'
  }
});

// 判断商品是否被选中
const isItemActive = (id: number) => {
  // 暂时返回false，实际逻辑可在此处扩展
  return false;
};

// 图片加载完成
const onImageLoad = (id: number) => {
  imageLoadingStatus.value[id] = false;
};

// 图片加载失败
const onImageError = (id: number) => {
  imageLoadingStatus.value[id] = false;
};

// 检查图片是否正在加载
const isImageLoading = (id: number) => {
  return imageLoadingStatus.value[id] !== false;
};

// 获取推荐商品列表
const getRecommendList = async () => {
  try {
    if (!hasMore.value) {
      loadStatus.value = 'nomore';
      return;
    }

    loadStatus.value = 'loading';
    hasError.value = false; // 重置错误状态

    const params = {
      page: page.value,
      pageSize: pageSize.value
    };

    const response = await Product.getRecommendList(params);

    if (response?.records && Array.isArray(response.records)) {
      if (page.value === 1) {
        recommendList.value = response.records;
      } else {
        recommendList.value = [...recommendList.value, ...response.records];
      }
      
      // 检查是否还有更多数据
      hasMore.value = response.records.length >= pageSize.value;
    } else if (response?.data && Array.isArray(response.data)) {
      if (page.value === 1) {
        recommendList.value = response.data;
      } else {
        recommendList.value = [...recommendList.value, ...response.data];
      }
      
      // 检查是否还有更多数据
      hasMore.value = response.data.length >= pageSize.value;
    } else {
      console.warn('推荐列表数据格式不正确');
      if (page.value === 1) {
        recommendList.value = [];
      }
      hasMore.value = false;
    }

    // 初始化图片加载状态
    recommendList.value.forEach(item => {
      imageLoadingStatus.value[item.id] = true;
    });

    // 更新加载状态
    if (!hasMore.value) {
      loadStatus.value = 'nomore';
    } else {
      loadStatus.value = 'loadmore';
    }
  } catch (error) {
    console.error('获取推荐列表失败:', error);
    hasError.value = true;
    // 显示错误提示，用户可以点击重试
    if (page.value === 1 && recommendList.value.length === 0) {
      // 如果是首次加载失败，显示错误状态
      loadStatus.value = 'nomore';
    } else {
      // 如果是加载更多失败，保持当前状态允许重试
      loadStatus.value = 'loadmore';
    }
  } finally {
    isLoading.value = false;
  }
};

// 重试加载
const retryLoad = () => {
  // 重置状态并重新加载第一页
  page.value = 1;
  hasMore.value = true;
  getRecommendList();
};

// 下拉加载更多
onReachBottom(() => {
  if (hasMore.value && loadStatus.value !== 'loading') {
    page.value++;
    getRecommendList();
  }
});

// 页面加载
onLoad(() => {
  // 获取商品列表
  getRecommendList();
});

// 添加到购物车
const addCart = (id: number) => {
  emit('addCart', id);
};

// 获取加载状态文本
const getLoadStatusText = (): string => {
  switch (loadStatus.value) {
    case 'loading':
      return '加载中...';
    case 'nomore':
      return '没有更多了';
    default:
      return '点击加载更多';
  }
};

console.log('recommendList:', recommendList.value);</script>


<template>
  <!-- 相似商品推荐 -->
  <view v-if="!props.isManaging" class="recommendations">
    <text class="recommend-title">相似商品推荐</text>
    <view class="recommend-list">
      <!-- 错误状态 -->
      <view v-if="recommendList.length === 0 && loadStatus === 'nomore' && page.value > 1" class="error-state">
        <text class="error-text">加载失败，请重试</text>
        <button class="retry-btn" @click="retryLoad">点击重试</button>
      </view>
      
      <!-- 商品列表 -->
      <view v-else class="recommend-grid">
        <view
          class="recommend-item"
          :class="{ 'recommend-item-active': isItemActive(item.id) }"
          v-for="item in recommendList"
          :key="item.id"
          @click="emit('itemClick', item)"
        >
          <!-- 图片容器 -->
          <view class="recommend-image-wrapper">
            <!-- 骨架屏 - 每张图片独立控制 -->
            <view v-if="isImageLoading(item.id)" class="image-skeleton">
              <view class="skeleton-image"></view>
            </view>

            <!-- 商品图片 - 异步加载 -->
            <image
              v-else
              mode="aspectFill"
              :lazy-load="true"
              :src="item.image"
              class="recommend-image"
              @load="onImageLoad(item.id)"
              @error="onImageError(item.id)"
            ></image>
          </view>

          <!-- 商品信息 -->
          <view class="recommend-info">
            <view class="recommend-name">{{ item.name }}</view>

            <view class="recommend-footer">
              <view class="recommend-footer-info">
                <view class="recommend-price">¥{{ item.price }}</view>
                <view class="recommend-sales-count">已售{{ item.sales || 0 }}</view>
              </view>
              <view
                  class="btn-add_cart"
                  @click.stop="addCart(item.id)"
                  @touchstart.stop
                  @touchend.stop
                  @touchcancel.stop
              >
                <text class="add-icon">+</text>
              </view>
            </view>

            <view class="recommend-tag" v-if="item.tag">{{ item.tag }}</view>

          </view>
        </view>
      </view>

      <!-- 加载更多提示 -->
      <view class="loadmore-container" v-if="recommendList.length > 0 && !hasError">
        <text class="loadmore-text">{{ getLoadStatusText() }}</text>
      </view>

    </view>
  </view>
</template>

<style scoped lang="scss">
.recommendations {
  display: flex;
  flex-direction: column;
  padding: 20rpx;

  .recommend-title {
    font-size: 32rpx;
    font-weight: bold;
    padding: 20rpx;
    background-color: #ffffff;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
  }

  .recommend-list {
    .recommend-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20rpx;
    }

    .recommend-item {
      display: flex;
      flex-direction: column;
      border-radius: 24rpx;
      overflow: hidden;
      background-color: #ffffff;
      margin-bottom: 20rpx;
      width: calc(50% - 10rpx); // 两列布局
      box-sizing: border-box;

      &.recommend-item-active {
        border: 2rpx solid #ff4d4f;
      }
    }

    .recommend-image-wrapper {
      width: 100%;
      position: relative;
      // 设置图片容器高度为正方形
      &:before {
        content: '';
        display: block;
        padding-bottom: 100%; // 创建一个正方形容器
      }

      .image-skeleton {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;

        .skeleton-image {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
      }

      .recommend-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 24rpx 24rpx 0 0;
      }
    }

    .recommend-info {
      padding: 16rpx;

      .recommend-name {
        font-size: 28rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 1.4;
      }

      .recommend-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 12rpx;

        .recommend-footer-info {
          display: flex;
          flex-direction: column;
          flex: 1;

          .recommend-price {
            font-size: 32rpx;
            font-weight: bold;
            color: #fa3534;
          }

          .recommend-sales-count {
            font-size: 24rpx;
            color: #999999;
            margin-top: 4rpx;
          }
        }

        .btn-add_cart {
          width: 44rpx;
          height: 44rpx;
          border-radius: 50%;
          background-color: #ff4d4f;
          display: flex;
          align-items: center;
          justify-content: center;

          .add-icon {
            color: white;
            font-size: 24rpx;
            font-weight: bold;
          }
        }
      }

      .recommend-tag {
        font-size: 20rpx;
        color: #ff4d4f;
        background-color: #fff0f0;
        border-radius: 8rpx;
        padding: 4rpx 12rpx;
        margin-top: 8rpx;
        display: inline-block;
      }
    }
  }

  .loadmore-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx;

    .loadmore-text {
      font-size: 28rpx;
      color: #999;
    }
  }
  
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40rpx;
    
    .error-text {
      font-size: 28rpx;
      color: #999;
      margin-bottom: 20rpx;
    }
    
    .retry-btn {
      background-color: #ff4d4f;
      color: white;
      border: none;
      border-radius: 8rpx;
      padding: 12rpx 24rpx;
      font-size: 28rpx;
    }
  }
}

// 骨架屏动画
@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

// 响应式调整
@media screen and (min-width: 768px) {
  .recommend-item {
    width: calc(33.333% - 14rpx) !important; // 三列布局
  }
}
</style>