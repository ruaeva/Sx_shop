<template>
  <view class="coupon-page">
    <!-- 标签切换 -->
    <view class="header">
      <view
          class="tab-item"
          :class="{ active: currentTab === 'discount' }"
          @click="handleChangeTab('discount')"
      >
        <text class="tab-text">抵扣券</text>
      </view>
      <view
          class="tab-item"
          :class="{ active: currentTab === 'coupon' }"
          @click="handleChangeTab('coupon')"
      >
        <text class="tab-text">优惠券</text>
      </view>
    </view>

    <!-- 占位容器，用于预留顶部导航栏的空间 -->
<!--    <view class="coupon-list-placeholder"></view>-->

    <view class="content">
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-container">
        <text>加载中...</text>
      </view>

      <!-- 空状态 -->
      <view v-else-if="currentTab === 'discount' && discountCoupons.length === 0" class="empty-container">
        <text>暂无抵扣券</text>
      </view>
      <view v-else-if="currentTab === 'coupon' && coupons.length === 0" class="empty-container">
        <text>暂无优惠券</text>
      </view>

      <!-- 错误状态 -->
      <view v-else-if="error" class="error-container">
        <text>加载失败，请稍后重试</text>
        <button @click="fetchCoupons">重新加载</button>
      </view>

      <!-- 抵扣券列表 -->
      <CouponList
        v-else-if="currentTab === 'discount'"
        :coupons="discountCoupons"
        @use-coupon="handleUseCoupon"
      />

      <!-- 优惠券列表 -->
      <CouponList
        v-else
        :coupons="coupons"
        @use-coupon="handleUseCoupon"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app'; // 引入 onLoad 生命周期
import CouponList from './components/CouponList.vue';

type TabType = 'discount' | 'coupon';
type CouponStatus = 'available' | 'used' | 'expired';

interface Coupon {
  id: string;
  title: string;
  amount: number;
  condition: string;
  expireDate: string; // 实际项目中建议使用 Date 对象或时间戳
  description: string;
  status: CouponStatus;
}

const currentTab = ref<TabType>('discount');
const loading = ref<boolean>(false);
const error = ref<boolean>(false);

// 状态文本映射
const statusTextMap: Record<CouponStatus, string> = {
  available: '可用',
  used: '已使用',
  expired: '已过期'
};

// 获取状态文本的方法
function getStatusText(status: CouponStatus): string {
  return statusTextMap[status] || '未知状态';
}

const discountCoupons = ref<Coupon[]>([]);
const coupons = ref<Coupon[]>([]);

function handleChangeTab(tab: TabType) {
  currentTab.value = tab;
}

// 在页面加载时获取参数
onLoad((options) => {
  if (options?.tab === 'coupon') {
    currentTab.value = 'coupon';
  } else if (options?.tab === 'discount') {
    currentTab.value = 'discount';
  }
});

// 模拟从 API 获取优惠券数据
async function fetchCoupons() {
  loading.value = true;
  error.value = false;

  try {
    // 模拟 API 请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 模拟 API 返回数据
    const mockDiscountCoupons: Coupon[] = [
      {
        id: '1',
        title: '满100减10',
        amount: 10,
        condition: '满100元可用',
        expireDate: '2023-06-30',
        description: '仅限指定商品使用',
        status: 'available'
      },
      {
        id: '2',
        title: '满200减20',
        amount: 20,
        condition: '满200元可用',
        expireDate: '2023-07-31',
        description: '仅限指定商品使用',
        status: 'used'
      },
      {
        id: '3',
        title: '满300减30',
        amount: 30,
        condition: '满300元可用',
        expireDate: '2022-12-31',
        description: '仅限指定商品使用',
        status: 'expired'
      }
    ];

    const mockCoupons: Coupon[] = [
      {
        id: '101',
        title: '新人专享券',
        amount: 50,
        condition: '无门槛',
        expireDate: '2023-12-31',
        description: '新用户专享',
        status: 'available'
      }
    ];

    discountCoupons.value = mockDiscountCoupons;
    coupons.value = mockCoupons;
  } catch (err) {
    error.value = true;
    console.error('获取优惠券失败:', err);
  } finally {
    loading.value = false;
  }
}

// 处理使用优惠券
function handleUseCoupon(couponId: string) {
  console.log('使用优惠券:', couponId);
  // 这里可以调用实际的使用优惠券接口
  uni.showToast({
    title: '优惠券已使用',
    icon: 'success'
  });
}

onMounted(() => {
  fetchCoupons();
});
</script>

<style scoped lang="scss">
.coupon-page {
  background-color: $uni-bg-color;
  height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  background-color: #fff;
  padding-top: env(safe-area-inset-top); // 防止被刘海屏遮挡
  z-index: 999;
}

.tab-item {
  flex: 1;
  padding: 32rpx 0;
  text-align: center;
  font-size: 32rpx;
  color: #666;
  transition: all 0.3s;
}

.tab-item.active {
  color: #ff4d4f;
  font-weight: bold;
}

.tab-item.active .tab-text {
  color: #ff4d4f;
}

.coupon-list-placeholder {
  height: 60px;
}

.loading-container,
.empty-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  color: #999;
}

.error-container button {
  margin-top: 20rpx;
  padding: 10rpx 20rpx;
  background-color: #ff4d4f;
  color: white;
  border-radius: 8rpx;
}
</style>


