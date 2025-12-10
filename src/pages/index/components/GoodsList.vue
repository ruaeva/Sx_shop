<script setup>
import {computed, onMounted, ref} from 'vue';
import {onLoad} from "@dcloudio/uni-app";
import {guid} from 'uview-plus';


const loading = ref(true);
const isUnmounted = ref(false);

onLoad(() => {
  uni.$u.sleep(3000).then(() => {
    if (!isUnmounted.value) {
      loading.value = false;
    }
  }).catch((error) => {
    console.error('Loading error:', error);
    if (!isUnmounted.value) {
      loading.value = false;
    }
  });
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
const pageSize = ref(10);
const hasMore = ref(true);

// 分类映射
const categoryMap = {
  0: 'featured',    // 精选
  1: 'new',         // 新品
  2: 'hot',         // 热销
  3: 'favorite',    // 收藏
  4: 'seasoning',   // 调料干货
  5: 'bakery',      // 烘焙熟食
  6: 'fresh',       // 水果生鲜
  7: 'drinks',      // 酒水饮料
  8: 'grain'        // 米面粮油
};

// 当前分类
const currentCategory = computed(() => categoryMap[tagsActiveIndex.value]);

// 模拟API：获取商品列表
const fetchGoodsList = async (category, pageNum, size) => {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    // 实际开发中替换为真实API调用
    // const response = await fetch(`/api/goods?category=${category}&page=${pageNum}&pageSize=${size}`);
    // return await response.json();

    // 模拟返回数据
    const mockData = {
      code: 200,
      data: {
        list: generateMockGoods(category, size),
        total: 100,
        hasMore: pageNum < 10 // 模拟只有10页数据
      }
    };

    return mockData;
  } catch (error) {
    console.error('获取商品数据失败:', error);
    throw error;
  }
};

// 生成模拟商品数据
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

  const tagsLength = categoryInfo.tags.length;
  const shopsLength = shops.length;

// 预先生成所需的随机数数组
  const randomArray = Array.from({length: count * 4}, () => Math.random());

  for (let i = 0; i < count; i++) {
    const randomIndex = i * 4;
    const randomHeight = 250 + Math.floor(randomArray[randomIndex] * 100);

    // 安全获取tag和shop，避免空数组越界
    const tagIndex = tagsLength > 0 ? Math.floor(randomArray[randomIndex + 1] * tagsLength) : 0;
    const shopIndex = shopsLength > 0 ? Math.floor(randomArray[randomIndex + 2] * shopsLength) : 0;

    goods.push({
      id: guid(),
      name: `${categoryInfo.name}${page.value * count + i + 1}`,
      desc: `精选优质商品，品质保证，新鲜直达`,
      price: (randomArray[randomIndex + 3] * 100 + 10).toFixed(1),
      image: `https://picsum.photos/200/${randomHeight}?random=${Date.now() + i}_${i}`,
      tag: tagsLength > 0 ? categoryInfo.tags[tagIndex] : '',
      shop: shopsLength > 0 ? shops[shopIndex] : '',
      sales: Math.floor(randomArray[randomIndex] * 10000),
      stock: Math.floor(randomArray[randomIndex + 1] * 1000) + 100
    });
  }

  return goods;
};

// 初始化加载
onMounted(async () => {
  await loadGoodsList(true);
});

// 加载商品列表
const loadGoodsList = async (isRefresh = false) => {
  if (loadStatus.value === 'loading') return;

  if (isRefresh) {
    page.value = 1;
    goodsList.value = [];
    hasMore.value = true;
  }

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
      // 可以添加错误提示
      console.error('加载失败');
    }
  } catch (error) {
    loadStatus.value = 'loadmore';
    console.error('加载商品列表失败:', error);

    // 可以添加错误提示
  }
};

const onImageLoad = (event) => {
  console.log('图片加载成功:', event);
  // 可以在这里处理图片加载成功的逻辑
  // 比如隐藏加载指示器、记录统计信息等
};

// 图片加载失败回调
const onImageError = (event) => {
  console.error('图片加载失败:', event);
  // 可以在这里处理图片加载失败的逻辑
  // 比如显示默认图片、记录错误日志等
};

// 删除商品
const remove = (id) => {
  uWaterfallRef.value?.remove(id);
  // 实际开发中可能需要调用删除收藏的API
  // await deleteFromFavorite(id);
};

// 触底加载更多
const onReachBottom = () => {
  loadGoodsList(false);
};

// 切换标签
const handleTabChange = async (index) => {
  if (tagsActiveIndex.value === index) return;

  tagsActiveIndex.value = index;

  // 切换分类时重新加载数据
  await loadGoodsList(true);
};

// 点击商品跳转详情
const goToDetail = (item) => {
  // 实际开发中跳转到商品详情页
  console.log('跳转到商品详情:', item);
  // uni.navigateTo({
  //   url: `/pages/goods/detail?id=${item.id}`
  // });
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
        </view>
        <view class="goods-service-1">
          <view class="goods-new" @click="goToDetail({ type: 'new' })">
            <text class="title">新品发现</text>
          </view>
          <view class="goods-hot" @click="goToDetail({ type: 'ranking' })">
            <text class="title">排行榜</text>
          </view>
        </view>
      </view>

      <!-- 瀑布流商品列表-->
      <up-waterfall
          ref="uWaterfallRef"
          v-model="goodsList"
          columns="2"
          @scrolltolower="onReachBottom"
      >
        <template v-slot:column="{ colList, colIndex }">
          <view
              class="goods-item"
              v-for="(item, index) in colList"
              :key="item.id"
              @click="goToDetail(item)"
          >
            <!-- 商品图片 -->
            <!-- 骨架屏（加载状态） -->
            <up-skeleton
                v-if="loading"
                rows="1"
                :rowsWidth="['100%']"
                :rowsHeight="['380rpx']"
                :title="false"
                :loading="true"
            ></up-skeleton>

            <!-- 实际图片内容 -->

            <up-image
                :loadingIcon="false"
                mode="aspectFill"
                v-if="!loading"
                :fade="true"
                :duration="500"
                :src="item.image"
                :index="index"
                class="goods-image"
                @load="onImageLoad"
            ></up-image>


            <!--            <up-lazy-load-->
            <!--                v-if="!loading"-->
            <!--                threshold=""-->
            <!--                border-radius="24"-->
            <!--                :image="item.image"-->
            <!--                :index="index"-->
            <!--                class="goods-image"-->
            <!--            >-->


            <!--            </up-lazy-load>-->


            <view class="goods-info">
              <up-skeleton
                  rows="3"
                  title
                  :titleHeight="titleHeight"
                  :loading="loading"

              >
                <!-- 商品名称 -->

                <view class="goods-name">{{ item.name }}</view>

                <!-- 商品描述 -->
                <view class="goods-desc">{{ item.desc }}</view>

                <!-- 价格和销量 -->
                <view class="goods-info">
                  <view class="goods-price">¥{{ item.price }}</view>
                  <view class="goods-sales-count">已售{{ item.sales }}</view>
                </view>

                <!-- 标签 -->
                <view class="goods-tag" v-if="item.tag">{{ item.tag }}</view>

                <!-- 店铺名称 -->
                <view class="goods-shop">{{ item.shop }}</view>


                <!-- 删除按钮 (仅收藏分类显示) -->
                <up-icon
                    v-if="tagsActiveIndex === 3"
                    name="close-circle-fill"
                    color="#fa3534"
                    size="34"
                    class="u-close"
                    @click.stop="remove(item.id)"
                />
              </up-skeleton>
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

  .scroll-list {

  }

  .tab-item {
    display: inline-block;
    padding: 12rpx 28rpx;

    font-size: 28rpx;
    color: #333;
    background: #fff;
    border-radius: 16rpx;
    white-space: nowrap;
    transition: all 0.3s;
    margin: 12rpx 24rpx 12rpx 0;

    &.active {
      //background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #f30909;
      font-weight: 600;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
    }
  }
}

.tab-content {


}

.goods-service {
  display: flex;
  flex-direction: row;
  margin-bottom: 16rpx;
  gap: 12rpx;

  .goods-sales,
  .goods-new,
  .goods-hot {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 320rpx;
    border-radius: 24rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

    .title {
      font-size: 32rpx;
      font-weight: 600;
      color: #fff;
    }
  }

  .goods-service-1 {
    display: flex;
    gap: 12rpx;
    flex: 1;

    .goods-new,
    .goods-hot {
      flex: 1;
      margin-bottom: 0;
    }

    .goods-new {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .goods-hot {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
  }
}

.goods-item {
  position: relative;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  //box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;

  &:active {
    transform: scale(0.98);
  }

  .goods-image {
    width: 100%;
    height: 380rpx;
    object-fit: cover;
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
  }

  .goods-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16rpx 8rpx;

    .goods-price {
      font-size: 32rpx;
      font-weight: 700;
      color: #ff4d4f;
    }

    .goods-sales-count {
      font-size: 22rpx;
      color: #999;
    }
  }

  .goods-tag {
    position: absolute;
    top: 16rpx;
    left: 16rpx;
    padding: 6rpx 16rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    font-size: 22rpx;
    border-radius: 24rpx;
    z-index: 2;
  }

  .goods-shop {
    padding: 8rpx 16rpx 16rpx;
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
