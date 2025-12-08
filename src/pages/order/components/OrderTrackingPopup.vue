<template>
  <up-popup :show="show" @close="closePopup" closeable="true">
    <view class="popup-header">
      <text class="title">订单跟踪</text>
    </view>
    <scroll-view scroll-y="true" class="popup-content">
      <!-- 弹窗内容 -->


      <view class="tracking-content">
        <!-- 订单信息 -->
        <view class="order-info">
          <text class="order-id">订单号: {{ orderNo }}</text>
        </view>

        <!-- 跟踪信息列表 -->
        <view v-if="trackingList.length > 0">
          <view
              v-for="(item, index) in trackingList"
              :key="item.index || index"
              class="tracking-item"
              :class="{ active: item.index <= currentStep }"
          >
            <view class="status-dot" :class="{ active: item.active }"></view>
            <view class="status-content">
              <text class="status-text" :class="{ active: item.active }">{{ item.status }}</text>
              <text class="time">{{ item.time }}</text>
            </view>
          </view>
        </view>
        <view v-else>
          <view class="empty-tip">暂无跟踪记录</view>
        </view>
      </view>
    </scroll-view>
  </up-popup>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

// 定义组件属性
interface Props {
  show: boolean;
  orderNo?: string;
  trackingData?: TrackingItem[];
}

interface TrackingItem {
  index: number;
  status: string;
  time: string;
  active: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  orderNo: '',
  trackingData: () => []
});

// 定义事件
const emit = defineEmits(['close']);

// 响应式数据
const currentStep = ref(0);

// 跟踪列表数据
const trackingList = computed<TrackingItem[]>(() => {
  if (props.trackingData && props.trackingData.length > 0) {
    return props.trackingData;
  }
  
  // 默认数据
  return [
    {
      index: 0,
      status: '您的订单已提交，请及时支付',
      time: '2025.05.23 9:14:10',
      active: true
    },
    {
      index: 1,
      status: '支付成功：您的订单已支付，请等待备货',
      time: '2025.05.23 9:14:22',
      active: false
    },
    {
      index: 2,
      status: '仓库接单：您的订单已被确认，请等待仓库发货',
      time: '2025.05.23 10:14:10',
      active: false
    },
    {
      index: 3,
      status: '司机发车：您的订单已发货，司机正在配送中',
      time: '2025.05.23 12:14:10',
      active: false
    },
    {
      index: 4,
      status: '司机接单：您的订单已接单，请耐心等待',
      time: '2025.05.24 21:14:10',
      active: false
    },
    {
      index: 5,
      status: '订单完成：您的订单已完成，期待下次光临',
      time: '2025.05.26 22:14:10',
      active: false
    },
    {
      index: 6,
      status: '司机送达：您的订单已送达，如有疑问，请联系客服',
      time: '2025.05.26 21:14:10',
      active: false
    }
  ];
});

// 关闭弹窗
const closePopup = () => {
  emit('close');
};

// 监听显示状态变化
watch(() => props.show, (newVal) => {
  if (newVal) {
    // 弹窗打开时的逻辑
    console.log('订单跟踪弹窗已打开');
  }
});
</script>

<style scoped>
.popup-content {
  position: relative;
  max-height: 60vh;

}

.popup-header {

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  padding: 20rpx 0;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
}

.tracking-content {
  margin: 32rpx 64rpx;
}

.tracking-item {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 32rpx 0;
  padding-left: 32rpx;
}

.tracking-item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 36rpx;
  left: 5rpx;
  bottom: -40rpx;
  background-color: #e5e5e5;
  width: 6rpx;
  border-radius: 4rpx;
}

.status-dot {
  position: absolute;
  top: 14rpx;
  left: 0;
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: #e5e5e5;
  transition: all 0.3s ease;
}

.status-dot.active {
  background-color: #f30909;
  transform: scale(1.2);
}

.status-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8rpx;
  margin-left: 8rpx;
}

.status-text {
  font-size: 28rpx;
  color: #999;
}

.status-text.active {
  color: black;
}

.time {
  font-size: 24rpx;
  color: #999;
}

.empty-tip {
  text-align: center;
  color: #999;
  font-size: 28rpx;
  margin-top: 60rpx;
}

.order-id {
  font-size: 28rpx;
  color: #666;
}
</style>