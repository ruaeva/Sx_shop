<template>
  <view class="order-detail">
    <view class="header">
      <!-- 顶部状态栏 -->
      <view class="nav-back" @click="goBack">
        <up-icon name="arrow-left" size="24rpx"></up-icon>
      </view>

      <!-- 订单状态弹窗 -->
      <OrderTrackingPopup
        :show="show"
        :orderNo="orderInfo.orderNo"
        :trackingData="trackingList"
        @close="close"
      />

      <view class="order-status">
        <view class="status-title" @click="openTrackingPopup">
          {{ order.status }}
          <up-icon name="arrow-down" size="24rpx"></up-icon>
        </view>
        <view class="status-time">剩余付款时间 {{ remainingTime }}</view>
      </view>
    </view>

    <view class="order-main">
      <view class="container">
        <!-- 配送信息 -->
        <view class="delivery-info">
          <image class="info-icon" src="/static/icon/location.png"></image>
          <view class="info-content">
            <view class="store-name">{{ deliveryInfo.storeName }}</view>
            <view class="address">{{ deliveryInfo.address }}</view>
            <view class="contact">彭大钰 {{ deliveryInfo.phone }}</view>
          </view>
        </view>

        <!-- 商品列表 -->
        <view class="goods-list">
          <view class="store-header" @click="goToStore">
            <image class="store-icon" src="/static/icon/store.png"></image>
            <text class="store-name">{{ storeName }}</text>
            <uni-icons type="right" size="16" color="#000"></uni-icons>
          </view>

          <view class="goods-item" v-for="(item, index) in goodsList" :key="index">
            <view class="goods-items-container">
              <image class="goods-image" :src="item.image" mode="aspectFill"></image>
              <view class="goods-info">
                <view class="goods-name">{{ item.name }}</view>
                <view class="goods-spec">{{ item.spec }}</view>
                <view class="goods-price-row">
                  <view class="price">¥ {{ item.price }}</view>
                  <view class="quantity">数量 {{ item.quantity }}</view>
                </view>
              </view>
            </view>
            <view class="goods-deposit" v-if="item.deposit">
              <text class="goods-deposit-title">[押金] {{ item.name }} 篮筐</text>
              <text class="deposit"> ¥ {{ item.deposit }}
                <text class="quantity">x{{ item.quantity }}</text>
              </text>
            </view>
          </view>
        </view>

        <!-- 费用明细 -->
        <view class="cost-detail">
          <view class="cost-item">
            <text class="label">商品金额</text>
            <text class="value">¥{{ costDetail.goodsAmount }}</text>
          </view>
          <view class="cost-item">
            <text class="label">押金（可退）</text>
            <text class="value">¥{{ costDetail.deposit }}</text>
          </view>
          <view class="cost-item">
            <text class="label">商品优惠</text>
            <text class="value discount">- ¥{{ costDetail.goodsDiscount }}</text>
          </view>
          <view class="cost-item">
            <text class="label">抵扣券</text>
            <view class="discount">
              <text class="value discount">- ¥{{ costDetail.coupon }}</text>
              <uni-icons type="right" size="12" color="#999" class="discount-icon"></uni-icons>
            </view>
          </view>
          <view class="cost-item">
            <text class="label">优惠券</text>
            <view class="discount">
              <text class="value discount">- ¥{{ costDetail.voucher }}</text>
              <uni-icons type="right" size="12" color="#999" class="discount-icon"></uni-icons>
            </view>
          </view>
        </view>

        <!-- 总计 -->
        <view class="total-section">
          <text class="total-label">小计</text>
          <text class="total-price">¥ {{ computedTotalAmount }}</text>
        </view>

        <!-- 订单信息 -->
        <view class="order-info">
          <view class="info-title">订单信息</view>
          <view class="info-item">
            <text class="info-label">订单编号</text>
            <text class="info-value">{{ orderInfo.orderNo }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">下单门店</text>
            <text class="info-value">{{ orderInfo.storeName }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">下单时间</text>
            <text class="info-value">{{ orderInfo.createTime }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">支付方式</text>
            <text class="info-value">{{ orderInfo.payMethod }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="bottom-left">
        <view class="service-btn" @click="contactService">
          <image class="service-icon" src="/static/icon/service.png"></image>
          <text>客服</text>
        </view>
      </view>
      <view class="bottom-right">
        <view class="cancel-btn" @click="cancelOrder">取消订单</view>
        <view class="pay-btn" @click="goPay">立即支付</view>
      </view>
    </view>
  </view>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import OrderTrackingPopup from "@/pages/order/components/OrderTrackingPopup.vue";

// 定义类型
interface TrackingItem {
  index: number;
  status: string;
  time: string;
  active: boolean;
}

interface DeliveryInfo {
  storeName: string;
  address: string;
  phone: string;
}

interface GoodsItem {
  image: string;
  name: string;
  spec: string;
  price: string;
  quantity: number;
  deposit?: number;
}

interface CostDetail {
  goodsAmount: number;
  deposit: number;
  goodsDiscount: number;
  coupon: number;
  voucher: number;
}

interface OrderInfo {
  orderNo: string;
  storeName: string;
  createTime: string;
  payMethod: string;
}

// 定义常量
const ORDER_STATUS = {
  WAIT_PAY: '待付款',
  WAIT_DELIVERY: '待配送',
  WAIT_CONFIRM: '待确认',
  WAIT_COMMENT: '待评价',
  COMPLETE: '已完成',
  CANCEL: '已取消'
} as const;

const PAY_METHOD = {
  WECHAT: '微信支付',
  ALIPAY: '支付宝支付',
  BANK: '银行卡支付',
  CASH: '货到付款'
} as const;

// 响应式数据
const show = ref(false);
const showTrackingPopup = ref(false);

const trackingList = ref<TrackingItem[]>([
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
]);

const order = ref({
  status: ORDER_STATUS.WAIT_PAY
});

const remainingTime = ref('23:20');

const deliveryInfo = ref<DeliveryInfo>({
  storeName: '品相饭菜馆',
  address: '天津 天津市 南开区 鑫茂科技园壹园1号楼B座1楼西南侧第三家（1122号）',
  phone: '188****8833'
});

const storeName = ref('UR官方旗舰店');

const goodsList = ref<GoodsItem[]>([
  {
    image: '/static/img/beef.png',
    name: '红壳鲜鸡蛋 中码 40斤',
    spec: '40斤',
    price: '142.9',
    quantity: 1,
    deposit: 20
  },
  {
    image: '/static/img/beef.png',
    name: '红壳鲜鸡蛋 中码 40斤',
    spec: '40斤',
    price: '142.9',
    deposit: 20,
    quantity: 1
  },
  {
    image: '/static/apple.png',
    name: '红富士优质苹果（烟台富士）',
    spec: '3斤 | 5.99/斤',
    price: '15.9',
    quantity: 2
  },
  {
    image: '/static/apple.png',
    name: '红富士优质苹果（烟台富士）',
    spec: '3斤 | 5.99/斤',
    price: '15.9',
    quantity: 2
  },
  {
    image: '/static/apple.png',
    name: '红富士优质苹果（烟台富士）',
    spec: '3斤 | 5.99/斤',
    price: '15.9',
    quantity: 2
  }
]);

const costDetail = ref<CostDetail>({
  goodsAmount: 1350,
  deposit: 40,
  goodsDiscount: 550.1,
  coupon: 50,
  voucher: 200
});

const orderInfo = ref<OrderInfo>({
  orderNo: '13666555222336663',
  storeName: '品相饭菜馆',
  createTime: '2025.05.23 21:14:10',
  payMethod: PAY_METHOD.WECHAT
});

// 计算属性
const computedTotalAmount = computed<number>(() => {
  const {goodsAmount, deposit, goodsDiscount, coupon, voucher} = costDetail.value;
  return Number((goodsAmount + deposit - goodsDiscount - coupon - voucher).toFixed(2));
});

// 方法定义
const open = () => {
  show.value = true;
};

const close = () => {
  show.value = false;
};

const openTrackingPopup = () => {
  open(); // 直接打开弹窗
};

const closeTrackingPopup = () => {
  close(); // 直接关闭弹窗
};

const goBack = () => {
  uni.navigateBack();
};

const goToStore = () => {
  uni.navigateTo({
    url: '/pages/store/store'
  }).catch(err => {
    console.error('跳转店铺页面失败:', err);
  });
};

const contactService = () => {
  uni.showModal({
    title: '联系客服',
    content: '是否联系客服？',
    success: (res) => {
      if (res.confirm) {
        // 这里可以实现真正的客服联系逻辑
        uni.showToast({
          title: '正在联系客服...',
          icon: 'loading'
        });
        setTimeout(() => {
          uni.hideToast();
          uni.showToast({
            title: '客服已连接',
            icon: 'success'
          });
        }, 1500);
      }
    },
    fail: (err) => {
      console.error('模态框展示失败:', err);
    }
  });
};

const cancelOrder = () => {
  uni.showModal({
    title: '提示',
    content: '确定要取消订单吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '订单已取消',
          icon: 'success'
        });
        // 可以添加页面跳转等后续逻辑
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      }
    },
    fail: (err) => {
      console.error('模态框展示失败:', err);
    }
  });
};

const goPay = () => {
  uni.showModal({
    title: '确认支付',
    content: `请确认支付 ¥${computedTotalAmount.value}`,
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '正在跳转支付...',
          icon: 'loading'
        });
        // 模拟支付流程
        setTimeout(() => {
          uni.hideToast();
          uni.showToast({
            title: '支付成功',
            icon: 'success'
          });
        }, 2000);
      }
    }
  });
};

// 生命周期钩子
onMounted(() => {
  console.log('订单详情页已加载');
});
</script>

<style scoped>
.order-detail {
  min-height: 100vh;
  background-color: #F5F7FC;
  padding-bottom: 180rpx;
  box-sizing: border-box;
}

.header {
  background: linear-gradient(60deg, #f30909, #f5813d);
  padding: 88rpx 0 120rpx;
  position: relative;
}

.nav-back {

}

.order-status {
  color: #fff;
  padding: 40rpx 32rpx;
  position: relative;
  z-index: 5;
}

.status-title {
  font-size: 48rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.status-icon {
  font-weight: normal;
  margin-left: 16rpx;
}

.status-time {
  font-size: 28rpx;
  margin-top: 16rpx;
  opacity: 0.9;
}

.order-main {
  position: relative;
  top: -150rpx;
}

.container {
  position: relative;
}

.delivery-info {
  background: #fff;
  margin: 20rpx 24rpx;
  padding: 32rpx;
  border-radius: 32rpx;
  display: flex;
}

.info-icon {
  height: 48rpx;
  width: 48rpx;
  margin-right: 16rpx;
}

.info-content {
  flex: 1;
}

.store-name {
  font-size: 32rpx;
  font-weight: bold;
}

.address {
  font-size: 28rpx;
  color: #666;
  line-height: 40rpx;
  margin: 12rpx 0 16rpx;
}

.contact {
  font-size: 28rpx;
  color: #666;
}

.goods-list {
  background: #fff;
  margin: 20rpx 24rpx;
  padding: 32rpx;
  border-radius: 32rpx;
  overflow: hidden;
}

.store-header {
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 28rpx;
}

.store-icon {
  height: 48rpx;
  width: 48rpx;
  margin-right: 16rpx;
}

.store-header .store-name {
  font-weight: bold;
}

.goods-item {
  margin-top: 32rpx;
  display: flex;
  flex-direction: column;
}

.goods-item:last-child {
  border-bottom: none;
}

.goods-items-container {
  display: flex;
  flex-direction: row;
}

.goods-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 24rpx;
  margin-right: 24rpx;
  background-color: #F5F7FC;
  object-fit: cover;
}

.goods-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-name {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods-spec {
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
}

.goods-price-row {
  display: flex;
  justify-content: start;
  align-items: center;
}

.price {
  font-size: 28rpx;
  color: #ff6b4a;
  font-weight: bold;
  margin-right: 16rpx;
}

.quantity {
  font-weight: normal;
  font-size: 24rpx;
  color: #999;
}

.goods-deposit {
  display: flex;
  flex-direction: column;
  background-color: #f5f6fc;
  padding: 24rpx 32rpx;
  margin-top: 20rpx;
  border-radius: 24rpx;
}

.goods-deposit-title {
  font-size: 24rpx;
  font-weight: bold;
  color: #333;
}

.deposit {
  color: #999;
  font-size: 28rpx;
  font-weight: bold;
  margin-top: 8rpx;
}

.cost-detail {
  background: #fff;
  margin: 20rpx 24rpx;
  padding: 32rpx;
  border-radius: 32rpx;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  font-size: 28rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.cost-item:last-child {
  border-bottom: none;
}

.label {
  color: #666;
}

.value {
  color: #333;
  font-weight: 500;
}

.discount {
  color: #ff6b4a;
}

.discount-icon {
  margin-left: 24rpx;
}

.total-section {
  background: #fff;
  margin: 20rpx 24rpx;
  padding: 24rpx 32rpx;
  border-radius: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1rpx solid #f5f5f5;
}

.total-label {
  font-size: 28rpx;
  color: #666;
}

.total-price {
  font-size: 32rpx;
  color: #ff6b4a;
  font-weight: bold;
}

.order-info {
  background: #fff;
  margin: 20rpx 24rpx;
  padding: 32rpx;
  border-radius: 32rpx;
}

.info-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 32rpx;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0;
  font-size: 28rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  color: #666;
}

.info-value {
  color: #333;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
  z-index: 999;
}

.bottom-left {
  display: flex;
  align-items: center;
}

.service-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24rpx;
  color: #666;
}

.service-icon {
  height: 48rpx;
  width: 48rpx;
}

.bottom-right {
  display: flex;
  gap: 20rpx;
}

.cancel-btn {
  padding: 20rpx 48rpx;
  border: 2rpx solid #ddd;
  border-radius: 48rpx;
  font-size: 28rpx;
  color: #666;
}

.pay-btn {
  padding: 20rpx 48rpx;
  background: linear-gradient(135deg, #ff6b4a, #ff8563);
  border-radius: 48rpx;
  font-size: 28rpx;
  color: #fff;
  font-weight: bold;
}

/* 弹窗样式优化 */
.popup-content {
  max-height: 60vh;
  padding: 32rpx;
}

.popup-header {
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
  margin-bottom: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
}

.tracking-content {
  padding: 20rpx 0;
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


