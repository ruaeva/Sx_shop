<template>
  <view class="message-page">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="header-left">
        <text class="back-icon" @click="goBack">‹</text>
      </view>
      <view class="header-center">
        <text class="title">消息</text>
      </view>
      <view class="header-right">
        <button class="mark-read-btn" @click="markAllAsRead">
          <image src="/static/icon/message/1.png" class="read-icon"></image>
          <text class="read-text">全部已读</text>
        </button>
      </view>
    </view>

    <!-- 消息列表 -->
    <view class="message-list">
      <view v-for="(item, index) in messages" :key="index" class="message-item" @click="goToMessageDetail(item)">
        <view class="message-content">
          <view class="message-header">
            <view class="avatar-container">
              <image src="/static/icon/message/3.png" class="avatar"></image>
              <view v-if="item.unread" class="unread-dot"></view>
            </view>
            <view class="message-info">
              <view class="message-title">{{ item.title }}</view>
              <view class="message-time">{{ item.time }}</view>
            </view>
          </view>
          <view class="message-body">
            <text class="message-text">{{ item.content }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 消息数据结构
interface Message {
  id: string;
  title: string;
  content: string;
  time: string;
  avatar: string;
  unread: boolean;
}

// 模拟消息数据
const messages = ref<Message[]>([
  {
    id: '1',
    title: '系统通知',
    content: '由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。',
    avatar: '/static/icon/message/1.png',
    time: '23:59',
    unread: true
  },
  {
    id: '2',
    title: '系统通知',
    content: '由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。',
    avatar: '/static/icon/message/2.png',
    time: '23:59',
    unread: false
  }
]);

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 标记所有消息为已读
const markAllAsRead = () => {
  messages.value.forEach(item => {
    item.unread = false;
  });
};

// 跳转到消息详情页
const goToMessageDetail = (message: Message) => {
  uni.navigateTo({
    url: '/pages/message/message_detail' ,
    success: () => {
      // 将当前消息标记为已读
      message.unread = false;
    }
  });
};
</script>

<style scoped lang="scss">
.message-page {
  background-color: #F5F7FC;
  height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 999;
}

.header-left {
  .back-icon {
    font-size: 40rpx;
    color: #333;
  }
}

.header-center {
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
}

.header-right {
  .mark-read-btn {
    display: flex;
    align-items: center;
    padding: 10rpx 20rpx;
    border-radius: 20rpx;
    background-color: transparent;
    border: none;
    color: #ff4d4f;
    font-size: 28rpx;
    margin-right: 20rpx;

    &:active {
      opacity: 0.8;
    }
  }

  .read-icon {
    width: 24rpx;
    height: 24rpx;
    margin-right: 10rpx;
  }

  .read-text {
    font-size: 28rpx;
  }
}

.message-list {
  margin-top: 20rpx;
}

.message-item {
  background-color: #ffffff;
  border-radius: 24rpx;
  margin: 0 30rpx 20rpx;
  overflow: hidden;
}

.message-content {
  padding: 30rpx;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 4rpx;
}

.avatar-container {
  position: relative;
  margin-right: 20rpx;
}

.avatar {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  object-fit: cover;
}

.unread-dot {
  width: 12rpx;
  height: 12rpx;
  background-color: #ff4d4f;
  border-radius: 50%;
  position: absolute;
  top: -5rpx;
  right: -5rpx;
}

.message-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
}

.message-title {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}

.message-time {
  font-size: 24rpx;
  color: #999;
  margin-top: 4rpx;
}

.message-body {
  .message-text {
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
  }
}
</style>

