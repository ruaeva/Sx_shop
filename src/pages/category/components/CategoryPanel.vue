<script setup>
import {computed, onMounted, ref} from 'vue';
import {guid} from 'uview-plus';
import CategorySideBar from "@/pages/category/components/CategorySideBar.vue";

// ==================== 常量定义 ====================
/**
 * 排序类型枚举
 */
const SORT_TYPE = {
  COMPREHENSIVE: 1, // 综合排序
  RATING: 2,        // 好评优先
  DISTANCE: 3,      // 距离优先
  SALES: 4          // 销量优先
};

/**
 * 价格排序枚举
 */
const PRICE_TYPE = {
  LOW_TO_HIGH: 1,   // 价格从低到高
  HIGH_TO_LOW: 2    // 价格从高到低
};

// ==================== 响应式状态 ====================
// 下拉菜单引用
const dropdownRef = ref(null);

// 瀑布流引用
const uWaterfallRef = ref(null);

// 选中的排序类型
const selectedSortType = ref(SORT_TYPE.COMPREHENSIVE);

// 选中的价格类型
const selectedPriceType = ref(PRICE_TYPE.LOW_TO_HIGH);

// 当前选中的分类
const currentCategory = ref({ name: '手机', index: 0 });

// 商品列表
const goodsList = ref([]);

// 加载状态
const loadStatus = ref('loadmore');

// 分页信息
const page = ref(1);
const pageSize = ref(10);
const hasMore = ref(true);

// 图片加载状态
const imageLoadingMap = ref(new Map());

// 卡片激活状态
const itemActiveMap = ref(new Map());

// 排序选项列表
const sortOptions = ref([
  {
    label: '综合排序',
    value: SORT_TYPE.COMPREHENSIVE
  },
  {
    label: '好评优先',
    value: SORT_TYPE.RATING
  },
  {
    label: '距离优先',
    value: SORT_TYPE.DISTANCE
  },
  {
    label: '销量优先',
    value: SORT_TYPE.SALES
  }
]);

// 价格选项列表
const priceOptions = ref([
  {
    label: '价格从低到高',
    value: PRICE_TYPE.LOW_TO_HIGH
  },
  {
    label: '价格从高到低',
    value: PRICE_TYPE.HIGH_TO_LOW
  }
]);

// ==================== 计算属性 ====================
/**
 * 当前排序标题
 * 根据选中的排序类型动态显示标题
 */
const currentSortTitle = computed(() => {
  const selectedOption = sortOptions.value.find(
      option => option.value === selectedSortType.value
  );
  return selectedOption ? selectedOption.label : '综合排序';
});

// ==================== 事件处理 ====================
/**
 * 处理下拉菜单打开事件
 * @param {Number} index - 打开的下拉项索引
 */
const handleDropdownOpen = (index) => {
  console.log('打开下拉菜单:', index);

  // 展开某个下拉菜单时，先关闭其他菜单的高亮
  // 同时内部会自动给当前展开项进行高亮
  dropdownRef.value?.highlight();
};

/**
 * 处理下拉菜单关闭事件
 * @param {Number} index - 关闭的下拉项索引
 */
const handleDropdownClose = (index) => {
  console.log('关闭下拉菜单:', index);

  // 关闭时给当前项加上高亮
  dropdownRef.value?.highlight(index);
};

/**
 * 处理排序类型变化
 * @param {Number} value - 新的排序类型值
 */
const handleSortChange = (value) => {
  console.log('排序类型变更:', value, currentSortTitle.value);

  // 根据排序类型重新加载数据
  loadGoodsList();
};

/**
 * 处理价格排序变化
 * @param {Number} value - 新的价格排序值
 */
const handlePriceChange = (value) => {
  console.log('价格排序变更:', value);

  // 根据价格排序重新加载数据
  loadGoodsList();
};

/**
 * 处理分类变化
 * @param {Object} category - 选中的分类信息
 */
const handleCategoryChange = (category) => {
  console.log('分类变更:', category);

  // 更新当前分类
  currentCategory.value = category;

  // 重置筛选条件
  resetFilters();

  // 重新加载该分类下的商品
  loadGoodsList(true);
};

/**
 * 处理搜索事件
 * @param {String} keyword - 搜索关键词
 */
const handleSearch = (keyword) => {
  console.log('搜索关键词:', keyword);

  // 执行搜索逻辑
  loadGoodsList();
};

/**
 * 重置筛选条件
 */
const resetFilters = () => {
  selectedSortType.value = SORT_TYPE.COMPREHENSIVE;
  selectedPriceType.value = PRICE_TYPE.LOW_TO_HIGH;
};

/**
 * 生成模拟商品数据
 */
const generateMockGoods = (category, count) => {
  const goods = [];
  const categoryName = category.name || '商品';

  for (let i = 0; i < count; i++) {
    const randomHeight = 250 + Math.floor(Math.random() * 100);
    const itemId = guid();

    goods.push({
      id: itemId,
      name: `${categoryName} - 精选商品 ${page.value * count + i + 1}`,
      desc: `优质${categoryName}，品质保证，限时特惠`,
      price: (Math.random() * 1000 + 100).toFixed(2),
      image: `https://picsum.photos/200/${randomHeight}?random=${Date.now()}_${i}`,
      tag: Math.random() > 0.5 ? '热销' : '新品',
      shop: '品质商城',
      sales: Math.floor(Math.random() * 10000),
      stock: Math.floor(Math.random() * 1000) + 100
    });

    imageLoadingMap.value.set(itemId, true);
  }
  return goods;
};

/**
 * 加载商品列表
 * 根据当前的筛选条件加载数据
 */
const loadGoodsList = async (isRefresh = false) => {
  // 防止重复加载
  if (loadStatus.value === 'loading') {
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
    console.log('加载商品列表', {
      category: currentCategory.value,
      sort: selectedSortType.value,
      price: selectedPriceType.value,
      page: page.value
    });

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800));

    const newList = generateMockGoods(currentCategory.value, pageSize.value);

    if (isRefresh) {
      goodsList.value = newList;
    } else {
      goodsList.value.push(...newList);
    }

    // 模拟分页逻辑
    hasMore.value = page.value < 5;

    if (hasMore.value) {
      page.value++;
      loadStatus.value = 'loadmore';
    } else {
      loadStatus.value = 'nomore';
    }
  } catch (error) {
    console.error('加载商品列表失败:', error);
    loadStatus.value = 'loadmore';
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    });
  }
};

/**
 * 图片加载完成
 */
const onImageLoad = (itemId) => {
  imageLoadingMap.value.set(itemId, false);
};

/**
 * 图片加载失败
 */
const onImageError = (itemId) => {
  imageLoadingMap.value.set(itemId, false);
};

/**
 * 检查图片是否正在加载
 */
const isImageLoading = (itemId) => {
  return imageLoadingMap.value.get(itemId) ?? true;
};

/**
 * 设置卡片激活状态
 */
const setItemActive = (itemId, active) => {
  itemActiveMap.value.set(itemId, active);
};

/**
 * 检查卡片是否激活
 */
const isItemActive = (itemId) => {
  return itemActiveMap.value.get(itemId) ?? false;
};

/**
 * 跳转到商品详情
 */
const goToDetail = (item) => {
  console.log('跳转到商品详情:', item);
  // 实际项目中跳转到详情页
  // uni.navigateTo({
  //   url: `/pages/goods/detail?id=${item.id}`
  // });
};

/**
 * 添加到购物车
 */
const addCart = (item) => {
  console.log('添加到购物车:', item);
  uni.showToast({
    title: '已添加到购物车',
    icon: 'success'
  });
};

/**
 * 滚动到底部加载更多
 */
const handleScrollToLower = () => {
  if (hasMore.value && loadStatus.value !== 'loading') {
    loadGoodsList(false);
  }
};

// ==================== 生命周期 ====================
onMounted(() => {
  loadGoodsList(true);
});
</script>

<template>
  <view class="category-panel__container">

    <view class="category-panel-left">
      <!-- 商品分类侧边栏 -->
      <CategorySideBar
          @category-change="handleCategoryChange"
          @search="handleSearch"
      />

    </view>

    <view class="category-panel-right">
      <view class="goods-list-wrapper">
        <!-- 筛选下拉菜单 -->
        <up-dropdown
            ref="dropdownRef"
            :border-radius="24"
            @open="handleDropdownOpen"
            @close="handleDropdownClose"
        >
          <!-- 排序选项 -->
          <up-dropdown-item
              v-model="selectedSortType"
              :title="currentSortTitle"
              :options="sortOptions"
              @change="handleSortChange"
          ></up-dropdown-item>

          <!-- 价格选项 -->
          <up-dropdown-item
              v-model="selectedPriceType"
              title="价格"
              :options="priceOptions"
              @change="handlePriceChange"
          ></up-dropdown-item>
        </up-dropdown>

        <!-- 商品列表区域 -->
        <scroll-view
            class="goods-list-scroll"
            scroll-y
            @scrolltolower="handleScrollToLower"
        >
          <view class="goods-list-content">
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
                    <!-- 骨架屏 -->
                    <view v-if="isImageLoading(item.id)" class="image-skeleton">
                      <up-skeleton
                          rows="1"
                          :rowsWidth="['100%']"
                          :rowsHeight="['280rpx']"
                          :title="false"
                          :loading="true"
                      ></up-skeleton>
                    </view>

                    <!-- 商品图片 -->
                    <image
                        mode="aspectFill"
                        :lazy-load="true"
                        :src="item.image"
                        class="goods-image"
                        :class="{ 'image-loaded': !isImageLoading(item.id) }"
                        @load="onImageLoad(item.id)"
                        @error="onImageError(item.id)"
                    ></image>

                    <!-- 商品标签 -->
                    <view class="goods-tag" v-if="item.tag">{{ item.tag }}</view>
                  </view>

                  <!-- 商品信息 -->
                  <view class="goods-info">
                    <view class="goods-name">{{ item.name }}</view>
                    <view class="goods-desc">{{ item.desc }}</view>

                    <view class="goods-footer">
                      <view class="goods-footer-info">
                        <view class="goods-price">¥{{ item.price }}</view>
                        <view class="goods-sales-count">{{ item.sales }}人付款</view>
                      </view>
                      <view
                          class="btn-add-cart"
                          @click.stop="addCart(item)"
                          @touchstart.stop
                          @touchend.stop
                          @touchcancel.stop
                      >
                        <up-icon name="plus" color="#ff4d4f" size="12"></up-icon>
                      </view>
                    </view>
                  </view>
                </view>
              </template>
            </up-waterfall>

            <!-- 加载更多提示 -->
            <up-loadmore
                bg-color="transparent"
                loading-icon="circle"
                :status="loadStatus"
                loadmore-text="上拉加载更多"
                loading-text="加载中..."
                nomore-text="没有更多了"
            />
          </view>
        </scroll-view>
      </view>
    </view>


  </view>
</template>

<style scoped lang="scss">

.category-panel__container {
  display: flex;
  flex-direction: row;
  height: 100%;
  background-color: #f5f5f5;

  .category-panel-left {
    width: 180rpx;
    background-color: #fff;
  }

  .category-panel-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    border-radius: 0 24rpx 0 0;
    overflow: hidden;

    .goods-list-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .goods-list-scroll {
        flex: 1;
        height: 100%;

        .goods-list-content {
          padding: 16rpx;
        }
      }
    }
  }
}

// 下拉菜单样式优化
:deep(.u-dropdown) {
  background-color: #fff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

:deep(.u-column) {
  &:not(:first-child) {
    margin-left: 16rpx;
  }
}

// 商品卡片样式
.goods-item {
  position: relative;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 16rpx;
  transition: transform 0.2s ease;

  &.goods-item-active {
    transform: scale(0.98);
  }

  .goods-image-wrapper {
    position: relative;
    width: 100%;
    height: 280rpx;
    background-color: #f5f5f5;
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

    .goods-tag {
      position: absolute;
      top: 12rpx;
      left: 12rpx;
      padding: 4rpx 12rpx;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      font-size: 20rpx;
      border-radius: 8rpx;
      z-index: 3;
    }
  }

  .goods-info {
    padding: 12rpx;

    .goods-name {
      font-size: 28rpx;
      font-weight: 600;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 6rpx;
    }

    .goods-desc {
      font-size: 22rpx;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 12rpx;
    }

    .goods-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-footer-info {
        flex: 1;

        .goods-price {
          font-size: 32rpx;
          font-weight: 700;
          color: #ff4d4f;
          margin-bottom: 4rpx;
        }

        .goods-sales-count {
          font-size: 20rpx;
          color: #999;
        }
      }

      .btn-add-cart {
        width: 56rpx;
        height: 56rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 77, 79, 0.1);
        border-radius: 50%;
        transition: all 0.2s ease;

        &:active {
          transform: scale(0.9);
          background-color: rgba(255, 77, 79, 0.2);
        }
      }
    }
  }
}

</style>