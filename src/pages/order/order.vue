<template>
  <view class="order-page">
    <view class="tabs">
      <view
          v-for="(tab, index) in tabs"
          :key="tab.status"
          class="tab-item"
          :class="{ active: activeTab === index }"
          @click="switchTab(index)"
      >
        {{ tab.name }}
      </view>
    </view>

    <!-- 订单列表 -->
    <view class="order-list">
      <view class="no-order" v-if="filteredOrders.length === 0">
        暂无更多
        <image src="/static/icon/no-order.png" class="no-order-icon" mode="widthFix"></image>
      </view>
      <view
          v-for="order in filteredOrders"
          :key="order.id"
          class="order-item"
      >
        <!-- 订单基本信息 -->
        <view class="order-header">
          <text class="order-number">订单编号:{{ order.orderNumber }}</text>
        </view>

        <!-- 商家信息 -->
        <view class="shop-info">
          <text class="shop-name">{{ order.shopName }}</text>
          <text class="order-status" :class="`status-${order.status}`">
            {{ order.statusText }}
          </text>
        </view>

        <!-- 商品列表 -->
        <view class="goods-container">

          <view class="goods-list">
            <view class=" goods-item" :class="{ fold: order.goods.length != 1}" v-for="good in order.goods"
                  :key="good.name">
              <image :src="safeImageUrl(good.image)" class="goods-image" mode="aspectFill"></image>
              <view class="goods-detail">
                <text class="goods-name">{{ good.name }}</text>
                <text class="goods-spec">{{ good.spec }}</text>
                <view class="goods-footer">
                  <text class="goods-price">¥{{ good.price }}</text>
                  <text class="goods-count">数量{{ good.count }}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="order-detail" @click="goToOrderDetail(order.id)" v-if="order.goods.length > 1">
            共{{ order.goods.length }}件
            <up-icon  name="arrow-right" size="24rpx"></up-icon>
          </view>
        </view>
        <!-- 订单金额 -->
        <view class="order-amount">
          <text class="deposit-text" v-if="order.deposit">含 ¥{{ order.deposit }} 押金</text>
          <text class="amount-text">实付款: ¥{{ order.totalDisplay }}</text>
        </view>

        <!-- 操作按钮 -->
        <view class="order-actions">
          <template v-if="order.status === 'pendingPayment'">
            <button class="action-btn cancel-btn" @click="cancelOrder(order.id)">
              取消订单
            </button>
            <button class="action-btn pay-btn" @click="payOrder(order.id)">
              立即支付
            </button>
          </template>

          <template v-if="order.status === 'pendingShipment'">
            <button class="action-btn track-btn" @click="trackOrder(order.id)">
              查看进度
            </button>
            <button class="action-btn cancel-btn" @click="refundOrder(order.id)">
              申请退款
            </button>
          </template>

          <template v-if="order.status === 'shipping'">
            <button class="action-btn track-btn" @click="trackOrder(order.id)">
              查看进度
            </button>
            <button class="action-btn confirm-btn" @click="confirmReceipt(order.id)">
              确认收货
            </button>
          </template>

          <button
              v-if="order.status === 'completed'"
              class="action-btn after-sales-btn"
              @click="afterSales(order.id)"
          >
            售后
          </button>

          <button
              v-if="['refundPending', 'refunded', 'closed', 'completed'].includes(order.status)"
              class="action-btn refunded-btn"
              @click="deleteOrder(order.id)"
          >
            删除订单
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
const ORDER_STATUS_MAP = {
  all: '全部',
  pendingPayment: '待支付',
  pendingShipment: '待发货',
  shipping: '配送中',
  completed: '已完成',
  closed: '已关闭',
  refundPending: '等待处理',
  refunded: '退款成功'
};

export default {
  data() {
    return {
      countdowns: {}, // 存储每个订单的倒计时信息
      activeTab: 0,
      isFold: false,
      tabs: [
        {name: '全部', status: 'all'},
        {name: '待支付', status: 'pendingPayment'},
        {name: '待发货', status: 'pendingShipment'},
        {name: '配送中', status: 'shipping'},
        {name: '已完成', status: 'completed'},
        {name: '已关闭', status: 'closed'},
        {name: '等待处理', status: 'refundPending'},
        {name: '退款成功', status: 'refunded'}
      ],
      orders: [
        {
          id: 1,
          orderNumber: '1366655522233663',
          shopName: 'UR官方旗舰店',
          status: 'pendingPayment',
          statusText: '待支付,剩余 23:24',
          deposit: 40,
          totalAmount: 589.9,
          goods: [
            {
              image: 'https://pic1.imgdb.cn/item/6927fae23203f7be003761ea.png',
              name: '新疆优质葡萄',
              spec: '3斤 | 5.99/斤',
              price: 15.9,
              count: 1
            },
            {
              image: 'https://pic1.imgdb.cn/item/69280b6d3203f7be00378463.png',
              name: '樱桃',
              spec: '2斤 | 8.99/斤',
              price: 17.98,
              count: 1
            },
            {
              image: 'https://pic1.imgdb.cn/item/69280b6d3203f7be00378463.png',
              name: '樱桃',
              spec: '1斤 | 12.99/斤',
              price: 12.99,
              count: 1
            },
            {
              image: 'https://pic1.imgdb.cn/item/69280b6d3203f7be00378463.png',
              name: '樱桃',
              spec: '1斤 | 12.99/斤',
              price: 12.99,
              count: 1
            }
          ]
        },
        {
          id: 2,
          orderNumber: '1366655522233663',
          shopName: 'UR官方旗舰店',
          status: 'pendingShipment',
          statusText: '待发货',
          deposit: 10,
          totalAmount: 589.9,
          goods: [
            {
              image: 'https://pic1.imgdb.cn/item/69280b6d3203f7be00378463.png',
              name: '红富士优质苹果(烟台富士)',
              spec: '3斤 | 5.99/斤',
              price: 15.9,
              count: 1
            }
          ]
        },
        {
          id: 3,
          orderNumber: '1366655522233663',
          shopName: 'UR官方旗舰店',
          status: 'shipping',
          statusText: '配送中',
          deposit: 10,
          totalAmount: 589.9,
          goods: [
            {
              image: 'https://pic1.imgdb.cn/item/69280b6d3203f7be00378463.png',
              name: '红富士优质苹果(烟台富士)',
              spec: '3斤 | 5.99/斤',
              price: 15.9,
              count: 1
            }
          ]
        },
        {
          id: 4,
          orderNumber: '1366655522233663',
          shopName: 'UR官方旗舰店',
          status: 'completed',
          statusText: '已完成',
          deposit: 0,
          totalAmount: 589.9,
          goods: [
            {
              image: '/static/images/goods1.jpg',
              name: '红富士优质苹果(烟台富士)',
              spec: '3斤 | 5.99/斤',
              price: 15.9,
              count: 1
            },
            {
              image: '/static/images/goods2.jpg',
              name: '新疆优质葡萄',
              spec: '3斤 | 5.99/斤',
              price: 25.9,
              count: 1
            }
          ]
        },
        {
          id: 5,
          orderNumber: '1366655522233663',
          shopName: 'UR官方旗舰店',
          status: 'refundPending',
          statusText: '等待处理',
          deposit: 10,
          totalAmount: 589.9,
          goods: [
            {
              image: '/static/images/goods1.jpg',
              name: '红富士优质苹果(烟台富士)',
              spec: '3斤 | 5.99/斤',
              price: 15.9,
              count: 1
            }
          ]
        },
        {
          id: 6,
          orderNumber: '1366655522233663',
          shopName: 'UR官方旗舰店',
          status: 'refunded',
          statusText: '退款成功',
          deposit: 30,
          totalAmount: 589.9,
          goods: [
            {
              image: '/static/images/goods1.jpg',
              name: '红富士优质苹果(烟台富士)',
              spec: '3斤 | 5.99/斤',
              price: 15.9,
              count: 1
            }
          ]
        },
        {
          id: 7,
          orderNumber: '1366655522233663',
          shopName: 'UR官方旗舰店',
          status: 'closed',
          statusText: '交易关闭',
          totalAmount: 589.9,
          goods: [
            {
              image: '/static/images/goods1.jpg',
              name: '红富士优质苹果(烟台富士)',
              spec: '3斤 | 5.99/斤',
              price: 15.9,
              count: 1
            }
          ]
        }
      ]
    };
  },

  computed: {
    // 筛选出当前状态的订单
    filteredOrders() {
      const currentStatus = this.tabs[this.activeTab].status;
      if (currentStatus === 'all') return this.orders;
      return this.orders.filter(order => order.status === currentStatus);
    }
  },

  mounted() {
    this.orders.forEach(order => {
      if (order.status === 'pendingPayment') {
        // 假设30分钟后过期
        const endTime = new Date().getTime() + 30 * 60 * 1000;
        this.initCountdown(order.id, endTime);
      }
    });

    // 预计算订单总额
    this.calculateOrderTotals();
  },

  beforeDestroy() {
    // 清理所有倒计时器防止内存泄漏
    Object.keys(this.countdowns).forEach(orderId => {
      this.clearCountdown(parseInt(orderId));
    });
  },

  methods: {
    goToOrderDetail(orderId) {
      uni.navigateTo({
        url: `/pages/order/order-detail?orderId=${orderId}`
      });
    },

    // 切换标签
    switchTab(index) {
      this.activeTab = index;
    },

    // 更新订单状态
    updateOrderStatus(orderId, status, statusText) {
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        order.statusText = statusText;

        // 状态变更时清理倒计时
        if (status !== 'pendingPayment') {
          this.clearCountdown(orderId);
        }
      }
    },

    // 初始化倒计时
    initCountdown(orderId, endTime) {
      const now = new Date().getTime();
      const duration = endTime - now;

      if (duration <= 0) {
        this.updateOrderStatus(orderId, 'closed', '交易关闭');
        return;
      }

      // 设置倒计时
      this.countdowns[orderId] = {
        duration,
        interval: setInterval(() => {
          this.updateCountdown(orderId);
        }, 1000)
      };
    },

    // 更新倒计时
    updateCountdown(orderId) {
      const countdown = this.countdowns[orderId];
      if (!countdown) return;

      countdown.duration -= 1000;

      if (countdown.duration <= 0) {
        clearInterval(countdown.interval);
        delete this.countdowns[orderId];
        this.updateOrderStatus(orderId, 'closed', '交易关闭');
        return;
      }

      // 格式化时间显示
      const minutes = Math.floor((countdown.duration % 3600000) / 60000);
      const seconds = Math.floor((countdown.duration % 60000) / 1000);

      const timeText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      // 更新订单状态文本
      const order = this.orders.find(o => o.id === orderId);
      if (order && order.status === 'pendingPayment') {
        order.statusText = `待支付，剩余 ${timeText}`;
      }
    },

    // 清理倒计时
    clearCountdown(orderId) {
      const countdown = this.countdowns[orderId];
      if (countdown) {
        clearInterval(countdown.interval);
        delete this.countdowns[orderId];
      }
    },

    // 安全图片URL处理
    safeImageUrl(url) {
      // 简单的URL白名单检查，实际项目中应更严格
      if (url.startsWith('http') && !url.includes('trusted-domain.com')) {
        return '/static/images/default-product.png';
      }
      return url;
    },

    // 预计算订单总额
    calculateOrderTotals() {
      this.orders.forEach(order => {
        // 计算商品总价
        const goodsTotal = order.goods.reduce((total, item) => {
          return total + item.price * item.count;
        }, 0);

        // 如果有押金则加上押金
        order.totalDisplay = order.deposit
            ? (goodsTotal + order.deposit).toFixed(2)
            : goodsTotal.toFixed(2);
      });
    },

    // 取消订单
    cancelOrder(orderId) {
      this.clearCountdown(orderId);

      uni.showModal({
        title: '提示',
        content: '确定要取消订单吗?',
        success: (res) => {
          if (res.confirm) {
            this.updateOrderStatus(orderId, 'closed', '交易关闭');
            uni.showToast({title: '订单已取消', icon: 'success'});
          }
        }
      });
    },

    payOrder(orderId) {
      this.clearCountdown(orderId);
      uni.showToast({title: '正在跳转支付...', icon: 'loading'});

      setTimeout(() => {
        this.updateOrderStatus(orderId, 'pendingShipment', '待发货');
        uni.hideToast();
        uni.showToast({title: '支付成功', icon: 'success'});
      }, 1000);
    },

    refundOrder(orderId) {
      uni.showModal({
        title: '提示',
        content: '确定要申请退款吗?',
        success: (res) => {
          if (res.confirm) {
            this.updateOrderStatus(orderId, 'refundPending', '等待处理');
            uni.showToast({title: '已提交退款申请', icon: 'success'});
          }
        }
      });
    },

    confirmReceipt(orderId) {
      uni.showModal({
        title: '提示',
        content: '确定已收到货物吗?',
        success: (res) => {
          if (res.confirm) {
            this.updateOrderStatus(orderId, 'completed', '已完成');
            uni.showToast({title: '确认收货成功', icon: 'success'});
          }
        }
      });
    },

    trackOrder(orderId) {
      uni.navigateTo({
        url: `/pages/order/track?id=${orderId}`
      });
    },

    afterSales(orderId) {
      uni.navigateTo({
        url: `/pages/order/afterSales?id=${orderId}`
      });
    },

    deleteOrder(orderId) {
      uni.showModal({
        title: '提示',
        content: '确定要删除该订单吗?',
        success: (res) => {
          if (res.confirm) {
            const index = this.orders.findIndex(o => o.id === orderId);
            if (index !== -1) {
              this.orders.splice(index, 1);
              this.clearCountdown(orderId); // 同步清理倒计时
              uni.showToast({title: '订单已删除', icon: 'success'});
            }
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.order-page {
  min-height: 100vh;
  background-color: #F5F7FC;
  position: relative;
}

.tabs {
  position: sticky;
  top: 0;
  display: flex;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);;
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.07);
  padding: 20rpx 48rpx;
  overflow-x: auto;
  z-index: 999;
}

.tab-item {
  padding: 10rpx 20rpx;
  font-size: 28rpx;
  color: #666;
  border-radius: 8rpx;
  margin-right: 20rpx;
  white-space: nowrap;
}

.tab-item.active {
  color: #ff4d4f;
  font-weight: bold;
}

.order-list {
  padding: 32rpx;
}

.no-order {
  text-align: center;
  padding: 100rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 60rpx;
  font-weight: bold;
}

.no-order-icon {
  width: 160rpx;
  height: 160rpx;
  margin-top: 40rpx;
}

.order-item {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 32rpx;
  border-radius: 32rpx;
  margin-bottom: 32rpx;
  overflow: hidden;
}

.order-header {
  font-size: 24rpx;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28rpx;
}

.order-number {
  font-size: 24rpx;
  color: #666;
}

.shop-info {
  font-size: 28rpx;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.shop-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.order-status {
  font-size: 24rpx;
  font-weight: bold;
  padding: 4rpx 12rpx;
  border-radius: 24rpx;
}

.status-pendingPayment {
  color: #ff4d4f;
  background-color: #fff0f0;
}

.status-pendingShipment {
  color: #faad14;
  background-color: #fff7e6;
}

.status-shipping {
  color: #108ee9;
  background-color: #e6f7ff;
}

.status-completed {
  color: #52c414;
  background-color: #f0f9ff;
}

.status-refundPending {
  color: #faad14;
  background-color: #fff7e6;
}

.status-refunded {
  color: #108ee9;
  background-color: #e6f7ff;
}

.status-closed {
  color: #999;
  background-color: #f5f5f5;
}

.goods-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 32rpx;
}

.goods-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 16rpx;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
}


.order-detail {

  padding: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  background-color: white;
  white-space: nowrap;
  right: 0;
  height: 100%;
  text-align: center;
  font-size: 24rpx;
  z-index: 99;
}

.goods-item {
  display: flex;
  align-items: center;
  flex-shrink: 0; /* 防止商品项被压缩 */

  &.fold {
    .goods-detail {
      display: none; // 隐藏详细信息
    }
  }
}

.goods-image {
  width: 150rpx;
  height: 150rpx;
  border-radius: 24rpx;
  object-fit: cover;
  background-color: #f5f5f5;
  overflow: hidden;
}

.goods-detail {
  display: flex;
  flex-direction: column;
  margin-left: 20rpx;
  flex: 1;
}

.goods-name {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.goods-spec {
  font-size: 22rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.goods-footer {
  display: flex;
  align-items: center;
  gap: 10rpx;
  flex: 1;
}

.goods-price {
  font-size: 28rpx;
  color: #ff4d4f;
  font-weight: bold;
}

.goods-count {
  font-size: 24rpx;
  color: #999;
}

.order-amount {
  font-size: 28rpx;
  color: #333;
  text-align: right;
  margin-bottom: 32rpx;
}

.deposit-text {
  font-size: 24rpx;
  color: #999;
  margin-right: 16rpx;
}

.amount-text {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
  flex-wrap: wrap;
}

.action-btn {
  margin: 0  !important;
  padding: 14rpx 24rpx !important;
  border-radius: 32rpx;
  font-size: 24rpx;
  border: 1rpx solid #ddd !important;
  line-height: 1;
  background-color: white;
  color: #666;
  min-width: 120rpx;
  font-weight: bold;
}

.cancel-btn {
  color: #999;
}

.pay-btn {
  background-color: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
  border: none !important;
}

.track-btn {
  color: #999;
}

.confirm-btn {
  background-color: rgba(16, 142, 233, 0.1);
  color: #108ee9;
  border: none !important;
}

.after-sales-btn {
  color: #999;
}

.refunded-btn {
  color: #999;
}
</style>