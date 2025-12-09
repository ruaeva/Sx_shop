<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';
import {uni} from '@dcloudio/uni-app';

type cartItem = any; // 实际应定义具体类型
type recommendationItem = any;

const cartItems = ref<cartItem[]>([]);
const recommendations = ref<recommendationItem[]>([]);
const loading = ref(true);

let abortController: AbortController | null = null;

// 统一封装请求函数
const request = async <T>(url: string): Promise<T | null> => {
  try {
    const controller = new AbortController();
    abortController = controller;

    const response = await uni.request({
      url,
      method: 'GET',
      signal: controller.signal,
    });

    if (response.statusCode === 200 && response.data) {
      return response.data as T;
    } else {
      console.warn(`请求失败，状态码：${response.statusCode}`, response);
      return null;
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('请求已被取消');
    } else {
      console.error(`请求出错 (${url}):`, error);
    }
    return null;
  }
};

// 获取购物车数据
const fetchCartData = async () => {
  const data = await request<{ items?: cartItem[] }>('/api/cart');
  cartItems.value = data?.items ?? [];
};

// 获取推荐商品数据
const fetchRecommendations = async () => {
  const data = await request<{ items?: recommendationItem[] }>('/api/recommendations');
  recommendations.value = data?.items ?? [];
};

// 初始化数据获取
const loadData = async () => {
  loading.value = true;
  await Promise.all([fetchCartData(), fetchRecommendations()]);
  loading.value = false;
};

onMounted(() => {
  loadData();
});

onUnmounted(() => {
  if (abortController) {
    abortController.abort(); // 取消正在进行中的请求
  }
});
</script>


<template>
  <!-- 空状态 -->
  <view v-if="cartItems.length === 0" class="empty-cart">
    <text class="empty-icon">🛒</text>
    <text class="empty-text">购物车空空如也</text>
    <text class="empty-hint">快去添加商品吧~</text>
  </view>
  <view v-else class="cart-list">
    <!-- 购物车列表 -->
    <view class="cart-list">
      <view v-for="(storeItems, storeName) in groupedCartItems" :key="storeName" class="store-group">
        <!-- 店铺头部 -->
        <view class="store-header">
          <view class="checkbox"
                :class="{ 'checkbox-checked': isStoreSelected(storeName) }"
                @click="toggleStoreSelect(storeName)">
            <text v-if="isStoreSelected(storeName)" class="checkmark">✓</text>
          </view>
          <text class="store-name">{{ storeName }}</text>
          <text class="arrow">›</text>
        </view>

        <!-- 店铺内商品列表 -->
        <view class="store-products">
          <view v-for="item in storeItems" :key="item.id" class="product-info">
            <!-- 管理模式下显示复选框 -->
            <view class="checkbox"
                  :class="{ 'checkbox-checked': item.selected }"
                  @click="toggleSelect(item.id)">
              <text v-if="item.selected" class="checkmark">✓</text>
            </view>

            <image
                class="product-image"
                :src="item.image"
                :alt="item.name != null ? item.name : '商品图片'"
                @error="handleImageErrors"
            ></image>

            <view class="product-detail">
              <text class="product-name">{{ item.name }}</text>
              <text class="product-spec">{{ item.weight }}</text>

              <view class="product-footer">
                <view class="product-content">
                  <view class="price-box">
                    <text class="price">¥ {{ item.price.toFixed(1) }}</text>
                    <text class="original-price">¥ {{ item.originalPrice }}</text>
                  </view>
                  <text v-if="item.deposit" class="deposit">{{ item.deposit }}</text>
                </view>

                <!-- 管理模式下显示删除按钮 -->
                <view
                    v-if="isManaging"
                    class="delete-btn"
                    @click="deleteSingleItem(item.id)"
                >
                  <text class="delete-icon">🗑️</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>


    <!-- 相似商品推荐 -->
    <view v-if="!isManaging" class="recommendations">
      <text class="recommend-title">相似商品推荐</text>
      <view class="recommend-grid">
        <view v-for="item in recommendations" :key="item.id" class="recommend-item">
          <view class="recommend-image">
            <image
                class="emoji-large"
                :src="item.image"
            >
            </image>
            <view class="badge">严选</view>
          </view>
          <view class="recommend-info">
            <text class="recommend-name">{{ item.name }}</text>
            <text class="recommend-sales">{{ item.sales }}</text>
            <view class="recommend-footer">
              <text class="recommend-price">¥ {{ item.price.toFixed(1) }}</text>
              <view class="add-btn">+</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>