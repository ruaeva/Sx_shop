<script setup>
import {onMounted, ref} from 'vue';
import Product from "@/api/Product";


const isLoading = ref(true); // 设置加载状态
const page = ref(1);
const pageSize = ref(8);

// 使用 defineOptions 定义组件选项
defineOptions({
  options: {
    styleIsolation: 'shared'
  }
})

const recommendList = ref([]);

onMounted(() => {
  // 获取商品列表
  getRecommendList();
});

const getRecommendList = async () => {
  isLoading.value = true;

  try {
    // 使用导入的Product模块调用API，并传递分页参数
    const response = await Product.getRecommendList({
      page: page.value,
      pageSize: pageSize.value
    });

    // 检查响应是否成功
    if (response && Array.isArray(response.data)) {
      recommendList.value = response.data;
    } else {
      console.error('获取推荐列表失败: 返回数据格式不正确');
    }
  } catch (error) {
    console.error('获取推荐列表失败:', error);
    // 可以在这里添加用户提示逻辑
  } finally {
    isLoading.value = false;
  }
};
</script>


<template>
  <!-- 相似商品推荐 -->
  <view v-if="!isManaging" class="recommendations">
    <text class="recommend-title">相似商品推荐</text>
    <view class="recommend-list">
      <!-- 瀑布流商品列表 -->
      <up-waterfall
          ref="uWaterfallRef"
          v-model="recommendList"
          columns="2"
      >
        <template v-slot:column="{ colList, colIndex }">
          <view
              class="recommend-item"
              :class="{ 'recommend-item-active': isItemActive(item.id) }"
              v-for="(item, index) in colList"
              :key="item.id">
            <!-- 图片容器 -->
            <view class="recommend-image-wrapper">
              <!-- 骨架屏 - 每张图片独立控制 -->
              <view v-if="isImageLoading(item.id)" class="image-skeleton">
                <up-skeleton
                    rows="1"
                    :rowsWidth="['100%']"
                    :rowsHeight="['380rpx']"
                    :title="false"
                    :loading="true"
                ></up-skeleton>
              </view>

              <!-- 商品图片 - 异步加载 -->
              <image
                  V-if=""
                  mode="aspectFill"
                  :lazy-load="true"
                  :src="item.image"
                  class="recommend-image"
                  :class="{ 'image-loaded': !isImageLoading(item.id) }"
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
                  <view class="recommend-sales-count">已售{{ item.sales }}</view>
                </view>
                <view
                    class="btn-add_cart"
                    @click.stop="addCart(item.id)"
                    @touchstart.stop
                    @touchend.stop
                    @touchcancel.stop
                >
                  <up-icon name="plus" color="#ff4d4f" size="12"></up-icon>
                </view>
              </view>

              <view class="recommend-tag" v-if="item.tag">{{ item.tag }}</view>

            </view>
          </view>
        </template>
      </up-waterfall>

      <!-- 加载更多提示 -->
      <up-loadmore
          bg-color="#F5F7FC"
          loading-icon="circle"
          :status="loadStatus"
          loadmore-text="加载更多"
          loading-text="加载中..."
          nomore-text="没有更多了"
      />

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
    .recommend-item {
      display: flex;
      flex-direction: column;
      border-radius: 24rpx;
      overflow: hidden;
      background-color: #ffffff;
      margin-bottom: 20rpx;
    }

    .recommend-image {
      width: 100%;
      object-fit: cover;
      border-radius: 24rpx;
    }

    .recommend-info {
      padding: 10rpx;

      .recommend-name {
        font-size: 28rpx;
        font-weight: bold;
        margin-bottom: 4rpx;
      }

      .recommend-sales {
        font-size: 24rpx;
        color: #999999;
      }

      .recommend-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .recommend-footer-info {
          display: flex;
          align-items: center;

          .recommend-price {
            font-size: 32rpx;
            font-weight: bold;
            color: #fa3534;
            margin-right: 10rpx;
          }

          .recommend-sales-count {
            font-size: 24rpx;
            color: #999999;
          }
        }

      }

    }
  }
}
</style>