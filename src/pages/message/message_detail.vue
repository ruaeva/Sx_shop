<!-- src/pages/message/message-detail.vue -->
<template>
  <view class="message-detail-page">
    <view class="header">
      <text class="title">{{ message.title }}</text>
      <text class="time">{{ message.time }}</text>
    </view>
    <view class="content">
      <text>{{ message.content }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {onLoad} from '@dcloudio/uni-app'; // 引入 onLoad

const isRead = ref<boolean>(false);

interface Message {
  id: string;
  title: string;
  content: string;
  time: string;
}

const message = ref<Message>({
  id: '',
  title: '',
  content: '',
  time: ''
});

// 使用 uni-app 推荐的方式获取页面参数
onLoad((options) => {
  if (options?.message) {
    try {
      message.value = JSON.parse(decodeURIComponent(options.message));
      isRead.value = options.isRead === 'true';
    } catch (error) {
      console.error('解析消息数据失败:', error);
    }
  } else {
    // 使用模拟数据
    message.value = mockMessage;
    isRead.value = mockMessage.isRead;
  }
});

// 在 script setup 中添加模拟数据
const mockMessage = {
  id: '1',
  title: '系统通知',
  content: '由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。由于移动社区具有互动随时随地、互动频繁和互动及时性的特点，适当的消息提醒显得尤为重要。',
  time: '23:59',
  isRead: false
};

const markAsRead = () => {
  isRead.value = true;
  // 可以在这里发送 API 请求更新服务器状态
};


</script>

<style scoped lang="scss">
.message-detail-page {
  padding: 30rpx;
  background-color: #ffffff;
}

.header {
  display: flex;
  flex-direction: column;
  margin-bottom: 40rpx;
}

.title {
  font-size: 48rpx;
  color: #333;
  font-weight: bold;
}

.time {
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
}

.content {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}
</style>
