<template>
  <view class="short-video-page">
    <up-short-video
        :tabs-list="tabsList"
        :video-list="videoList"
        :current-tab="currentTabIndex"
        :current-video="currentVideoIndex"
        @tabChange="handleTabChange"
        @videoChange="handleVideoChange"
        @like="handleLike"
        @comment="handleComment"
        @share="handleShare"
        @collect="handleCollect"
    >
      <!-- 自定义菜单按钮 -->
      <template #menu>
        <view class="custom-menu-btn">
          <up-icon name="grid" size="22px" color="#ddd"></up-icon>
        </view>
      </template>

      <!-- 自定义搜索按钮 -->
      <template #search>
        <view class="custom-search-btn">
          <up-icon name="search" size="22px" color="#ddd"></up-icon>
        </view>
      </template>

      <!-- 自定义操作按钮组 -->
      <template #actions="{ item, index }">
        <view class="video-actions">
          <!-- 点赞按钮 -->
          <view class="action-item" @click="handleLike({ item, index })">
            <up-icon
                :name="item.isLiked ? 'thumb-up-fill' : 'thumb-up'"
                size="32px"
                color="#eee"
            ></up-icon>
            <text class="action-count">{{ formatCount(item.likeCount) }}</text>
          </view>

          <!-- 评论按钮 -->
          <view class="action-item" @click="handleComment({ item, index })">
            <up-icon name="chat" size="32px" color="#eee"></up-icon>
            <text class="action-count">{{ formatCount(item.commentCount) }}</text>
          </view>

          <!-- 分享按钮 -->
          <view class="action-item" @click="handleShare({ item, index })">
            <up-icon name="share" size="32px" color="#eee"></up-icon>
            <text class="action-count">{{ formatCount(item.shareCount) }}</text>
          </view>

          <!-- 收藏按钮 -->
          <view class="action-item" @click="handleCollect({ item, index })">
            <up-icon
                :name="item.isCollected ? 'bookmark-fill' : 'bookmark'"
                size="32px"
                color="#eee"
            ></up-icon>
            <text class="action-count">{{ formatCount(item.collectCount) }}</text>
          </view>
        </view>
      </template>

      <!-- 底部导航栏 -->
      <template #tabbar>
        <up-tabbar
            :fixed="true"
            :placeholder="true"
            :safeAreaInsetBottom="true"
            borderColor="rgba(255,255,255,0.25)"
            backgroundColor="rgba(255,255,255,0.05)"
        >
          <up-tabbar-item
              @click="navigateToHome"
              text="首页"
              icon="home"
          ></up-tabbar-item>

          <up-tabbar-item
              text="放映厅"
              icon="photo"
          ></up-tabbar-item>

          <up-tabbar-item
              text="直播"
              icon="play-right"
          ></up-tabbar-item>

          <up-tabbar-item
              text="我的"
              icon="account"
          ></up-tabbar-item>
        </up-tabbar>
      </template>
    </up-short-video>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// ==================== 状态管理 ====================
const currentTabIndex = ref(0);
const currentVideoIndex = ref(0);

// 标签页列表
const tabsList = ref([
  { name: '推荐' },
  { name: '关注' },
  { name: '朋友' },
  { name: '本地' }
]);

// 视频列表数据
const videoList = ref([
  {
    videoUrl: 'https://uview-plus.jiangruyi.com/big/rjtsdl.MP4',
    progress: 0,
    bgColor: '#000',
    author: {
      avatar: '/static/avatar1.jpg',
      name: '创作者1',
      desc: '这是一段视频描述'
    },
    isLiked: false,
    likeCount: 128,
    commentCount: 25,
    shareCount: 12,
    collectCount: 8,
    isCollected: false
  },
  {
    videoUrl: 'https://uview-plus.jiangruyi.com/big/shanghai.mp4',
    progress: 0,
    bgColor: '#000',
    author: {
      avatar: '/static/avatar2.jpg',
      name: '创作者2',
      desc: '记录美好生活'
    },
    isLiked: true,
    likeCount: 863,
    commentCount: 96,
    shareCount: 32,
    collectCount: 45,
    isCollected: true
  },
  {
    videoUrl: 'https://uview-plus.jiangruyi.com/big/shanghai.mp4',
    progress: 0,
    bgColor: '#000',
    author: {
      avatar: '/static/avatar3.jpg',
      name: '创作者3',
      desc: '生活需要仪式感'
    },
    isLiked: false,
    likeCount: 562,
    commentCount: 47,
    shareCount: 21,
    collectCount: 19,
    isCollected: false
  }
]);

// ==================== 工具函数 ====================
/**
 * 格式化数字显示
 * @param {Number} count - 原始数字
 * @returns {String} 格式化后的字符串
 */
const formatCount = (count) => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + 'w';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

// ==================== 事件处理 ====================
/**
 * 切换标签页
 * @param {Number} index - 标签页索引
 */
const handleTabChange = (index) => {
  console.log('切换标签页到:', index, tabsList.value[index].name);
  currentTabIndex.value = index;

  // 可以在这里加载对应标签页的视频数据
  // loadVideosByTab(index);
};

/**
 * 切换视频
 * @param {Number} index - 视频索引
 */
const handleVideoChange = (index) => {
  console.log('切换视频到:', index);
  currentVideoIndex.value = index;

  // 可以在这里记录视频播放
  // trackVideoView(videoList.value[index]);
};

/**
 * 点赞视频
 * @param {Object} params - 包含 item 和 index
 */
const handleLike = ({ item, index }) => {
  console.log('点赞视频:', index, item.author.name);

  const video = videoList.value[index];
  video.isLiked = !video.isLiked;
  video.likeCount += video.isLiked ? 1 : -1;

  // 实际项目中调用API
  // await likeVideo(item.id, video.isLiked);

  uni.showToast({
    title: video.isLiked ? '点赞成功' : '取消点赞',
    icon: 'none',
    duration: 1000
  });
};

/**
 * 评论视频
 * @param {Object} params - 包含 item 和 index
 */
const handleComment = ({ item, index }) => {
  console.log('评论视频:', index, item.author.name);

  // 实际项目中打开评论弹窗
  uni.showToast({
    title: '打开评论',
    icon: 'none'
  });
};

/**
 * 分享视频
 * @param {Object} params - 包含 item 和 index
 */
const handleShare = ({ item, index }) => {
  console.log('分享视频:', index, item.author.name);

  // 实际项目中调用分享API
  uni.showActionSheet({
    itemList: ['分享到微信', '分享到朋友圈', '复制链接'],
    success: (res) => {
      console.log('选择分享方式:', res.tapIndex);
      videoList.value[index].shareCount++;
    }
  });
};

/**
 * 收藏视频
 * @param {Object} params - 包含 item 和 index
 */
const handleCollect = ({ item, index }) => {
  console.log('收藏视频:', index, item.author.name);

  const video = videoList.value[index];
  video.isCollected = !video.isCollected;
  video.collectCount += video.isCollected ? 1 : -1;

  // 实际项目中调用API
  // await collectVideo(item.id, video.isCollected);

  uni.showToast({
    title: video.isCollected ? '收藏成功' : '取消收藏',
    icon: 'none',
    duration: 1000
  });
};

/**
 * 导航到首页
 */
const navigateToHome = () => {
  uni.switchTab({
    url: '/pages/index/index'
  });
};
</script>

<style scoped lang="scss">
.short-video-page {
  width: 100%;
  height: 100vh;
  background-color: #000;
}

// 自定义按钮样式
.custom-menu-btn,
.custom-search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: opacity 0.3s;

  &:active {
    opacity: 0.7;
  }
}

// 视频操作按钮组
.video-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;

  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 60rpx;
    transition: transform 0.2s;

    &:active {
      transform: scale(0.9);
    }

    .action-count {
      margin-top: 8rpx;
      font-size: 24rpx;
      color: #fff;
      line-height: 1;
      text-align: center;
    }
  }
}
</style>


