<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// 定义tabbar数据，与pages.json中的tabBar配置保持一致
const tabbarData = ref([
  {
    text: '首页',
    pagePath: 'pages/index/index',
    iconPath: '/static/icon/home/home.png',
    selectedIconPath: '/static/icon/home/home_active.png'
  },
  {
    text: '分类',
    pagePath: 'pages/category/category',
    iconPath: '/static/icon/category/category.png',
    selectedIconPath: '/static/icon/category/category_active.png'
  },
  {
    text: '购物车',
    pagePath: 'pages/cart/cart',
    iconPath: '/static/icon/cart/cart.png',
    selectedIconPath: '/static/icon/cart/cart_active.png'
  },
  {
    text: '订单',
    pagePath: 'pages/order/order',
    iconPath: '/static/icon/order/order.png',
    selectedIconPath: '/static/icon/order/order_active.png'
  },
  {
    text: '我的',
    pagePath: 'pages/user/user',
    iconPath: '/static/icon/user/user.png',
    selectedIconPath: '/static/icon/user/user_active.png'
  }
]);

const activeIndex = ref(0);

// 监听页面路径变化，更新激活的tab
const updateActiveTab = () => {
  const currentPage = getCurrentPages()[getCurrentPages().length - 1]?.route;
  const activeTab = tabbarData.value.findIndex(item => item.pagePath === currentPage);
  if (activeTab !== -1) {
    activeIndex.value = activeTab;
  }
};

// 页面加载时设置激活的tab
onMounted(() => {
  updateActiveTab();
});

// 监听路由变化
watch(() => getCurrentPages().length, () => {
  updateActiveTab();
});

// tab切换事件
const onTabChange = (index: number) => {
  activeIndex.value = index;
  const targetPath = '/' + tabbarData.value[index].pagePath;
  // 使用uni.switchTab进行页面跳转，适用于tabBar页面
  uni.switchTab({
    url: targetPath
  });
};
</script>

<template>
  <view class="custom-tabbar">
    <up-tabbar
      :value="activeIndex"
      @change="(index) => onTabChange(index)"
      :fixed="true"
      :placeholder="true"
      :safeAreaInsetBottom="true"
      :unactiveColor="'#666666'"
      :activeColor="'#d6204b'"
    >
      <up-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :text="item.text"
        :icon="activeIndex === index ? item.selectedIconPath : item.iconPath"
        @click="onTabChange(index)"
      />
    </up-tabbar>
  </view>
</template>

<style scoped lang="scss">
.custom-tabbar {
  background-color: #fff;
}
</style>