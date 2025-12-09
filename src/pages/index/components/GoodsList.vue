<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { guid, random } from 'uview-plus';

const tagsActiveIndex = ref(0);
const TabList = ref(["精选", "新品", "热销", "收藏", "调料干货", "烘焙熟食", "水果生鲜", "酒水饮料", "米面粮油",]);
const uWaterfallRef = ref(null);

const flowList = ref([]);
const list = ref([
  {
    price: 35,
    title: '北国风光，千里冰封，万里雪飘',
    shop: '李白杜甫白居易旗舰店',
    desc: '这是一段于商品，用于描述商品，用于描述商品，用',
    image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
  },
  {
    price: 35,
    title: '北国风光，千里冰封，万里雪飘',
    shop: '李白杜甫白居易旗舰店',
    desc: '这是一段描述，用于描述品，用于描述商品，用于描述商品，用于描述商品，用于描述商品，用于描述商品，用于描述商品，用',
    image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
  },
  {
    price: 35,
    title: '北国风光，千里冰封，万里雪飘',
    shop: '李白杜甫白居易旗舰店',
    desc: '这是一段描述，用于描述商品，用于描述商用于描述商品，用于描述商品，用于描述商品，用于描述商品，用于描述商品，用',
    image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
  },
  {
    price: 35,
    title: '北国风光，千里冰封，万里雪飘',
    shop: '李白杜甫白居易旗舰店',
    desc: '这是一段描述，用于描述商品，用于描于描述商品，用于描述商品，用于描述商品，用于描述商品，用于描述商品，用于描述商品，用于描述商品，用',
    image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
  },
  {
    price: 35,
    title: '北国风光，千里冰封，万里雪飘',
    shop: '李白杜甫白居易旗舰店',
    desc: '这是一段描述，用于描述商品，用于描述商品，用于描述商品，用于描述商品，用于描述商品，用于描述商品，用于描述商品，用',
    image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
  },
  {
    price: 35,
    title: '北国风光，千里冰封，万里雪飘',
    shop: '李白杜甫白居易旗舰店',
    desc: '用于描述商品，用',
    image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
  },
  // ... 其他商品数据
]);

onMounted(() => {
  addRandomData();
});

const addRandomData = () => {
  for (let i = 0; i < 10; i++) {
    let index = random(0, list.value.length - 1);
    // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
    let item = JSON.parse(JSON.stringify(list.value[index]));
    item.id = guid();
    flowList.value.push(item);
  }
};

const remove = (id) => {
  uWaterfallRef.value.remove(id);
};

const clear = () => {
  uWaterfallRef.value.clear();
};

// 模拟触底加载更多
const onReachBottom = () => {
  loadStatus.value = 'loading';
  // 模拟数据加载
  setTimeout(() => {
    addRandomData();
    loadStatus.value = 'loadmore';
  }, 300);
};
</script>

<template>
  <view class="tab-list">
    <up-scroll-list :indicator="false" class="scroll-list">
      <view
          v-for="(item, index) in TabList"
          :key="index"
          class="tab-item"
          :class="{ active: tagsActiveIndex === index }"
          @click="tagsActiveIndex = index"
      >
        {{ item }}
      </view>
    </up-scroll-list>
  </view>
  <up-button @click="clear">清空列表</up-button>
  <view class="tab-content">
    <view class="goods-service">
      <view class="goods-sales">
        <text class="title">促销专区</text>
      </view>
      <view class="goods-service-1">
        <view class="goods-new">
          <text class="title">新品发现</text>
        </view>
        <view class="goods-hot">
          <text class="title">排行榜</text>
        </view>
      </view>
    </view>

    <up-waterfall v-model="flowList" columns="2" @scrolltolower="onReachBottom">
      <template v-slot:column="{colList, colIndex}">
        <view class="goods-item" v-for="(item, index) in colList" :key="index">
          <!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
          <up-lazy-load threshold="-450" border-radius="24" :image="item.image" :index="index"
                        class="goods-image"></up-lazy-load>

          <view class="goods-name">
            {{ item.name }}
          </view>

          <view class="goods-desc">
            {{ item.desc }}
          </view>

          <view class="goods-price">
            {{ item.price }}元
          </view>

          <view class="goods-tag" v-if="item.tag">
            {{ item.tag }}
          </view>

          <view class="goods-shop">
            {{ item.shop }}
          </view>

          <up-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close"
                   @click="remove(item.id)"></up-icon>
        </view>
      </template>
    </up-waterfall>
    <up-loadmore bg-color="#F5F7FC"
                 loadingIcon="circle"
                 status="loading"
                 @loadmore="addRandomData"
                 style="height: 90rpx">
    </up-loadmore>
  </view>
</template>

<style scoped lang="scss">
.title {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  text-align: center;
}

.goods-service {
  display: flex;
  flex-direction: row;
  gap: 20rpx;
  margin-bottom: 20rpx;
}

.goods-sales, {
  flex: 1;
  height: 160px;
  width: 100%;
  background-color: red;
  border-radius: 24rpx;
}

.goods-service-1 {
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 20rpx;
}

.goods-new, .goods-hot {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 24rpx;
}

.goods-item {
  display: flex;
  flex-direction: column;
  border-radius: 24rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

:deep(.u-column:not(:first-child)) {
  margin-left: 20rpx;
}

.goods-image {
  border-radius: 24rpx;
}

.tab-list {

}

.tab-item {
  font-size: 28rpx;
  font-weight: bold;
  white-space: nowrap;
  padding: 10rpx 24rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  margin-right: 12rpx;
}

.tab-item.active {
  background-color: #ffffff;
  color: #ff4d4d;
}
</style>
