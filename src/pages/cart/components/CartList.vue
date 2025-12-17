<!--<script setup lang="ts">-->
<!--import {onMounted, onUnmounted, ref} from 'vue';-->


<!--type cartItem = any; // 实际应定义具体类型-->
<!--type recommendationItem = any;-->

<!--const cartItems = ref<cartItem[]>([]);-->
<!--const recommendations = ref<recommendationItem[]>([]);-->
<!--const loading = ref(true);-->

<!--let abortController: AbortController | null = null;-->

<!--con-->

<!--// 统一封装请求函数-->
<!--const request = async <T>(url: string): Promise<T | null> => {-->
<!--  try {-->
<!--    const controller = new AbortController();-->
<!--    abortController = controller;-->

<!--    const response = await uni.request({-->
<!--      url,-->
<!--      method: 'GET',-->
<!--      signal: controller.signal,-->
<!--    });-->

<!--    if (response.statusCode === 200 && response.data) {-->
<!--      return response.data as T;-->
<!--    } else {-->
<!--      console.warn(`请求失败，状态码：${response.statusCode}`, response);-->
<!--      return null;-->
<!--    }-->
<!--  } catch (error: any) {-->
<!--    if (error.name === 'AbortError') {-->
<!--      console.log('请求已被取消');-->
<!--    } else {-->
<!--      console.error(`请求出错 (${url}):`, error);-->
<!--    }-->
<!--    return null;-->
<!--  }-->
<!--};-->

<!--// 获取购物车数据-->
<!--const fetchCartData = async () => {-->
<!--  const data = await request<{ items?: cartItem[] }>('/api/cart');-->


<!--  cartItems.value = data?.items ?? [];-->
<!--};-->

<!--// 获取推荐商品数据-->
<!--const fetchRecommendations = async () => {-->
<!--  const data = await request<{ items?: recommendationItem[] }>('/api/recommendations');-->
<!--  recommendations.value = data?.items ?? [];-->
<!--};-->

<!--// 初始化数据获取-->
<!--const loadData = async () => {-->
<!--  loading.value = true;-->
<!--  await Promise.all([fetchCartData(), fetchRecommendations()]);-->
<!--  loading.value = false;-->
<!--};-->

<!--onMounted(() => {-->
<!--  loadData();-->
<!--});-->

<!--onUnmounted(() => {-->
<!--  if (abortController) {-->
<!--    abortController.abort(); // 取消正在进行中的请求-->
<!--  }-->
<!--});-->
<!--</script>-->
<script setup lang="ts">
import {onMounted, onUnmounted, ref, computed} from 'vue';

type cartItem = {
  id: number;
  name: string;
  image: string;
  weight: string;
  price: number;
  originalPrice: number;
  deposit?: string;
  selected: boolean;
  storeName: string;
}; // 定义具体的购物车项目类型

type recommendationItem = {
  id: number;
  name: string;
  image: string;
  sales: string;
  price: number;
}; // 定义推荐商品类型

const cartItems = ref<cartItem[]>([]);
const recommendations = ref<recommendationItem[]>([]);
const loading = ref(true);
const isManaging = ref(false); // 添加管理模式状态

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
  // 模拟数据
  const mockCartData = {
    items: [
      {
        id: 1,
        name: "有机苹果",
        image: "/static/images/apple.jpg",
        weight: "1kg",
        price: 12.8,
        originalPrice: 15.0,
        deposit: "需付押金¥5",
        selected: true,
        storeName: "水果专营店"
      },
      {
        id: 2,
        name: "进口香蕉",
        image: "/static/images/banana.jpg",
        weight: "500g",
        price: 8.5,
        originalPrice: 10.0,
        selected: false,
        storeName: "水果专营店"
      },
      {
        id: 3,
        name: "新鲜牛奶",
        image: "/static/images/milk.jpg",
        weight: "1L",
        price: 15.0,
        originalPrice: 18.0,
        selected: true,
        storeName: " dairy鲜奶坊"
      }
    ]
  };

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  cartItems.value = mockCartData.items;
};

// 获取推荐商品数据
const fetchRecommendations = async () => {
  // 模拟数据
  const mockRecommendations = {
    items: [
      {
        id: 101,
        name: "有机橙子",
        image: "/static/images/orange.jpg",
        sales: "月销500+",
        price: 9.9
      },
      {
        id: 102,
        name: "进口葡萄",
        image: "/static/images/grape.jpg",
        sales: "月销300+",
        price: 25.8
      },
      {
        id: 103,
        name: "新鲜酸奶",
        image: "/static/images/yogurt.jpg",
        sales: "月销800+",
        price: 12.5
      },
      {
        id: 104,
        name: "精品坚果",
        image: "/static/images/nuts.jpg",
        sales: "月销600+",
        price: 35.0
      }
    ]
  };

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  recommendations.value = mockRecommendations.items;
};

// 分组购物车项目按店铺名
const groupedCartItems = computed(() => {
  const groups: Record<string, cartItem[]> = {};
  cartItems.value.forEach(item => {
    if (!groups[item.storeName]) {
      groups[item.storeName] = [];
    }
    groups[item.storeName].push(item);
  });
  return groups;
});

// 判断店铺是否全选
const isStoreSelected = (storeName: string) => {
  const storeItems = groupedCartItems.value[storeName] || [];
  return storeItems.length > 0 && storeItems.every(item => item.selected);
};

// 切换店铺选择
const toggleStoreSelect = (storeName: string) => {
  const isSelected = isStoreSelected(storeName);
  const storeItems = groupedCartItems.value[storeName] || [];
  storeItems.forEach(item => {
    item.selected = !isSelected;
  });
};

// 切换单个商品选择
const toggleSelect = (itemId: number) => {
  const item = cartItems.value.find(i => i.id === itemId);
  if (item) {
    item.selected = !item.selected;
  }
};

// 处理图片错误
const handleImageErrors = (event: any) => {
  console.log('图片加载失败:', event);
};

// 删除单个项目
const deleteSingleItem = (itemId: number) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId);
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



  </view>
</template>

<style scoped lang="scss">
.cart-list {
  display: flex;
  flex-direction: column;
  background-color: #F5F7FC;
  .store-group {
    background-color: #fff;
    margin: 20rpx;
    border-radius: 32rpx;
    padding: 20rpx;


  }
}

</style>