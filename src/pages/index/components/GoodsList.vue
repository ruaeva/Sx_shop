<script setup>
import {computed, onMounted, ref} from 'vue';
import {onLoad, onReachBottom} from "@dcloudio/uni-app";
import {guid} from 'uview-plus';

// 使用 defineOptions 定义组件选项
defineOptions({
  options: {
    styleIsolation: 'shared'
  }
})

const isUnmounted = ref(false);

onLoad(() => {
  // 初始化时不需要全局loading
});

const tagsActiveIndex = ref(0);
const TabList = ref([
  "精选", "新品", "热销", "收藏", "调料干货",
  "烘焙熟食", "水果生鲜", "酒水饮料", "米面粮油"
]);
const uWaterfallRef = ref(null);
const loadStatus = ref('loadmore');
const goodsList = ref([]);
const page = ref(1);
const pageSize = ref(8);
const hasMore = ref(true);

// 图片加载状态Map
const imageLoadingMap = ref(new Map());
// 卡片激活状态Map
const itemActiveMap = ref(new Map());

// 分类映射
const categoryMap = {
  0: 'featured', 1: 'new', 2: 'hot', 3: 'favorite', 4: 'seasoning',
  5: 'bakery', 6: 'fresh', 7: 'drinks', 8: 'grain'
};

const currentCategory = computed(() => categoryMap[tagsActiveIndex.value]);

// 模拟API
const fetchGoodsList = async (category, pageNum, size) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`正在加载分类：${category}，页码：${pageNum}，数量：${size}`);

    const mockData = {
      code: 200,
      data: {
        list: generateMockGoods(category, size),
        total: 100,
        hasMore: pageNum < 10
      }
    };
    return mockData;
  } catch (error) {
    console.error('获取商品数据失败:', error);
    throw error;
  }
};

// 生成模拟数据
const generateMockGoods = (category, count) => {
  const goods = [];
  const categories = {
    featured: {name: '精选商品', tags: ['精选', '优质']},
    new: {name: '新品', tags: ['新品', '上新']},
    hot: {name: '热销商品', tags: ['热销', '爆款']},
    favorite: {name: '收藏商品', tags: ['收藏']},
    seasoning: {name: '调料干货', tags: ['干货', '调料']},
    bakery: {name: '烘焙熟食', tags: ['烘焙', '熟食']},
    fresh: {name: '水果生鲜', tags: ['新鲜', '当日达']},
    drinks: {name: '酒水饮料', tags: ['饮料', '酒水']},
    grain: {name: '米面粮油', tags: ['粮油', '主食']}
  };

  const categoryInfo = categories[category] || categories.featured;
  const shops = ['优选商城', '品质生活馆', '新鲜直达店', '进口食品店', '本地特产店'];

  for (let i = 0; i < count; i++) {
    const randomHeight = 250 + Math.floor(Math.random() * 100);
    const itemId = guid();

    goods.push({
      id: itemId,
      name: `${categoryInfo.name}${page.value * count + i + 1}`,
      desc: `精选优质商品，品质保证，新鲜直达`,
      price: (Math.random() * 100 + 10).toFixed(1),
      image: `https://picsum.photos/200/${randomHeight}?random=${Date.now()}_${i}`,
      tag: categoryInfo.tags[Math.floor(Math.random() * categoryInfo.tags.length)],
      shop: shops[Math.floor(Math.random() * shops.length)],
      sales: Math.floor(Math.random() * 10000),
      stock: Math.floor(Math.random() * 1000) + 100
    });

    // 初始化图片加载状态
    imageLoadingMap.value.set(itemId, true);
  }
  return goods;
};

// 图片加载完成
const onImageLoad = (itemId) => {
  imageLoadingMap.value.set(itemId, false);
};

// 图片加载失败
const onImageError = (itemId) => {
  imageLoadingMap.value.set(itemId, false);
  console.error(`图片加载失败: ${itemId}`);
};

// 检查图片是否正在加载
const isImageLoading = (itemId) => {
  return imageLoadingMap.value.get(itemId) ?? true;
};

// 设置卡片激活状态
const setItemActive = (itemId, active) => {
  itemActiveMap.value.set(itemId, active);
};

// 检查卡片是否激活
const isItemActive = (itemId) => {
  return itemActiveMap.value.get(itemId) ?? false;
};

// 初始化加载
onMounted(async () => {
  await loadGoodsList(true);
});

// 使用 onReachBottom 替代 @scrolltolower
onReachBottom(() => {
  console.log('页面触底事件触发');
  if (hasMore.value && loadStatus.value !== 'loading') {
    loadGoodsList(false);
  }
});

// 加载商品列表
const loadGoodsList = async (isRefresh = false) => {
  // 防止重复加载
  if (loadStatus.value === 'loading') {
    console.log('正在加载中，阻止重复请求');
    return;
  }

  // 刷新
  if (isRefresh) {
    page.value = 1;
    goodsList.value = [];
    imageLoadingMap.value.clear();
    itemActiveMap.value.clear();
    hasMore.value = true;
  }

  // 无更多数据
  if (!hasMore.value) {
    loadStatus.value = 'nomore';
    return;
  }

  loadStatus.value = 'loading';

  try {
    const result = await fetchGoodsList(currentCategory.value, page.value, pageSize.value);

    if (result.code === 200) {
      const newList = result.data.list;

      if (isRefresh) {
        goodsList.value = newList;
      } else {
        goodsList.value.push(...newList);
      }

      hasMore.value = result.data.hasMore;

      if (hasMore.value) {
        page.value++;
        loadStatus.value = 'loadmore';
      } else {
        loadStatus.value = 'nomore';
      }
    } else {
      loadStatus.value = 'loadmore';
      console.error('加载失败');
    }
  } catch (error) {
    loadStatus.value = 'loadmore';
    console.error('加载商品列表失败:', error);
  }
};

const addCart = (id) => {
  console.log('添加到购物车:', id);
};

const remove = (id) => {
  uWaterfallRef.value?.remove(id);
  imageLoadingMap.value.delete(id);
  itemActiveMap.value.delete(id);
};

const handleTabChange = async (index) => {
  if (tagsActiveIndex.value === index) return;
  tagsActiveIndex.value = index;
  await loadGoodsList(true);
};

const goToDetail = (item) => {
  console.log('跳转到商品详情:', item);
};
</script>

<template>
  <view class="page-container">
    <!-- 顶部标签栏 -->
    <view class="tab-list">
      <up-scroll-list :indicator="false" class="scroll-list">
        <view
            v-for="(item, index) in TabList"
            :key="index"
            class="tab-item"
            :class="{ active: tagsActiveIndex === index }"
            @click="handleTabChange(index)"
        >
          {{ item }}
        </view>
      </up-scroll-list>
    </view>

    <!-- 内容区域 -->
    <view class="tab-content">
      <!-- 服务入口 -->
      <view class="goods-service">
        <view class="goods-sales" @click="goToDetail({ type: 'promotion' })">
          <text class="title">促销专区</text>
          <text class="tips">买到就是赚到 ！！！</text>
          <view class="sales-list">
            <view class="sales-item">
              <image class="service-image" src="/static/icon/user/User.png"></image>
            </view>
            <view class="sales-item">
              <image class="service-image" src="/static/icon/user/User.png"></image>
            </view>
          </view>
        </view>
        <view class="goods-service-1">
          <view class="goods-new" @click="goToDetail({ type: 'new' })">
            <text class="title">新品发现</text>
            <text class="tips">好货抢先买</text>
            <image class="service-image" src="@/static/img/goods/1.png"></image>
          </view>
          <view class="goods-hot" @click="goToDetail({ type: 'ranking' })">
            <text class="title">排行榜</text>
            <text class="tips">大家都在买</text>
            <image class="service-image" src="@/static/img/goods/2.png"></image>
          </view>
        </view>
      </view>

      <!-- 瀑布流商品列表 -->
      <up-waterfall
          ref="uWaterfallRef"
          v-model="goodsList"
          columns="2"
      >
        <template v-slot:column="{ colList, colIndex }">
          <view
              class="goods-item"
              :class="{ 'goods-item-active': isItemActive(item.id) }"
              v-for="(item, index) in colList"
              :key="item.id"
              @touchstart="setItemActive(item.id, true)"
              @touchend="setItemActive(item.id, false)"
              @touchcancel="setItemActive(item.id, false)"
              @click="goToDetail(item)"
          >
            <!-- 图片容器 -->
            <view class="goods-image-wrapper">
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
                  mode="aspectFill"
                  :lazy-load="true"
                  :src="item.image"
                  class="goods-image"
                  :class="{ 'image-loaded': !isImageLoading(item.id) }"
                  @load="onImageLoad(item.id)"
                  @error="onImageError(item.id)"
              ></image>
            </view>

            <!-- 商品信息 -->
            <view class="goods-info">
              <view class="goods-name">{{ item.name }}</view>
              <view class="goods-desc">{{ item.desc }}</view>

              <view class="goods-footer">
                <view class="goods-footer-info">
                  <view class="goods-price">¥{{ item.price }}</view>
                  <view class="goods-sales-count">已售{{ item.sales }}</view>
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

              <view class="goods-tag" v-if="item.tag">{{ item.tag }}</view>
              <view class="goods-shop">{{ item.shop }}</view>

              <up-icon
                  v-if="tagsActiveIndex === 3"
                  name="close-circle-fill"
                  color="#fa3534"
                  size="34"
                  class="u-close"
                  @click.stop="remove(item.id)"
                  @touchstart.stop
                  @touchend.stop
                  @touchcancel.stop
              />
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
:deep(.u-column) {
  &:not(:first-child) {
    margin-left: 16rpx;
  }
}

.page-container {
  width: 100%;
  min-height: 100vh;
  background-color: #F5F7FC;
}

.tab-list {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: transparent;

  .tab-item {
    display: inline-block;
    padding: 16rpx 32rpx;
    font-size: 28rpx;
    color: #333;
    background: rgb(255, 255, 255);
    border-radius: 16rpx;
    white-space: nowrap;
    transition: all 0.3s;
    margin: 0 0 16rpx 16rpx;

    &:last-child {
      margin-right: 16rpx;
    }

    &.active {
      color: #f30909;
      font-weight: bold;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
    }
  }
}

.tab-content {
  margin: 0 20rpx;
}

.goods-service {
  display: flex;
  flex-direction: row;
  margin-bottom: 16rpx;
  gap: 16rpx;

  .goods-sales,
  .goods-new,
  .goods-hot {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 320rpx;
    border-radius: 24rpx;

    .title {
      font-family: 'YouSheBiaoTiHei';
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin: 32rpx 0 8rpx;
    }

    .tips {
      font-size: 20rpx;
      color: #666;
      margin-bottom: 12rpx;
    }

    .service-image {
      width: 144rpx;
      height: 144rpx;
      object-fit: cover;
    }
  }

  .goods-sales {
    align-items: start;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

    .title, .tips {
      margin-left: 32rpx;
    }

    .sales-list {
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      margin-left: 16rpx;
      gap: 20rpx;
    }

    .sales-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .goods-service-1 {
    display: flex;
    gap: 16rpx;
    flex: 1;

    .goods-new,
    .goods-hot {
      flex: 1;
      margin-bottom: 0;
      background-color: #fff;
    }
  }
}

.goods-item {
  position: relative;
  background-color: rgb(255, 255, 255);
  border-radius: 32rpx;
  overflow: hidden;
  margin-bottom: 16rpx;
  transition: transform 0.3s;

  &.goods-item-active {
    transform: scale(0.98);
  }

  .goods-image-wrapper {
    position: relative;
    width: 100%;
    height: 380rpx;
    background-color: #f5f5f5;
    border-radius: 24rpx;
    overflow: hidden;

    .image-skeleton {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }

    .goods-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.3s ease;

      &.image-loaded {
        opacity: 1;
      }
    }
  }

  .goods-info {
    padding: 16rpx;
  }

  .goods-name {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .goods-desc {
    font-size: 24rpx;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 16rpx;
  }

  .goods-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8rpx;

    .goods-footer-info {
      display: flex;
      flex-direction: row;
      align-items: center;

      .goods-price {
        font-size: 32rpx;
        font-weight: 700;
        color: #ff4d4f;
        margin-right: 12rpx;
      }

      .goods-sales-count {
        font-size: 22rpx;
        color: #999;
      }
    }

    .btn-add_cart {
      background-color: rgba(255, 77, 79, 0.3);
      padding: 8rpx;
      border-radius: 50%;
      transition: transform 0.2s, background-color 0.2s;

      &:active {
        transform: scale(0.9);
        background-color: rgba(255, 77, 79, 0.5);
      }
    }
  }

  .goods-tag {
    position: absolute;
    top: 16rpx;
    left: 16rpx;
    padding: 6rpx 16rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: rgb(255, 255, 255);
    font-size: 22rpx;
    border-radius: 24rpx;
    z-index: 2;
  }

  .goods-shop {
    font-size: 22rpx;
    color: #999;
  }

  .u-close {
    position: absolute;
    top: 16rpx;
    right: 16rpx;
    z-index: 3;
  }
}
</style>