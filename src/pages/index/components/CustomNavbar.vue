<template>
  <view
      class="navbar-container"
      :style="{
      paddingTop: statusBarHeight + 'px',
      background: navbarBg
    }"
  >
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 导航栏主体 -->
    <view class="navbar-content">
      <!-- 左侧位置图标 -->
      <view class="navbar-left" @click="handleLocationClick">
        <view class="location-icon">
          <up-icon name="map" color="#fff" size="20"></up-icon>
        </view>
        <text class="location-text">{{ location }}</text>
      </view>

      <!-- 中间搜索框 -->
      <view class="navbar-center">
        <view class="search-box" @click="handleSearchClick">
          <up-icon name="search" color="#999" size="18"></up-icon>
          <input
              v-if="!readonly"
              class="search-input"
              :placeholder="placeholder"
              v-model="searchValue"
              @confirm="handleSearch"
              :focus="autoFocus"
          />
          <text v-else class="search-placeholder">{{ placeholder }}</text>
        </view>
      </view>

      <!-- 右侧消息图标 -->
      <view class="navbar-right" @click="handleMessageClick">
        <view class="message-icon">
          <up-icon name="bell" color="#fff" size="22"></up-icon>
          <view class="badge" v-if="messageCount > 0">
            <text class="badge-text">{{ messageCount > 99 ? '99+' : messageCount }}</text>
          </view>
        </view>
        <text class="message-text">消息</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      background:{backgroundColor:'#fd5365'},
      height:0,
      navbarRight:0,
      opacity: 0,
      scrollY: 0,
    }
  },
  onLoad(e) {
    console.log(uni.getMenuButtonBoundingClientRect())
    let res =uni.getSystemInfoSync()
    this.height = res.windowHeight;
    this.navbarRight = res.windowWidth - uni.getMenuButtonBoundingClientRect().left;
  },
  methods:{
    scroll: function(e) {
      var that = this,
          scrollY = e.detail.scrollTop;
      var opacity = scrollY / 200;
      opacity = opacity > 1 ? 1 : opacity;
      that.$set(that, 'opacity', opacity);
      that.$set(that, 'scrollY', scrollY);
      if (that.lock) {
        that.$set(that, 'lock', false);
        return;
      }
    },
  }
}
</script>

<style scoped lang="scss">
.navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transition: background 0.3s ease;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.status-bar {
  width: 100%;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 24rpx;
  height: 88rpx;
}

.navbar-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  .location-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48rpx;
    height: 48rpx;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    margin-right: 8rpx;
  }

  .location-text {
    font-size: 28rpx;
    font-weight: 600;
    color: #fff;
    max-width: 100rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.navbar-center {
  flex: 1;
  margin: 0 24rpx;

  .search-box {
    display: flex;
    align-items: center;
    height: 64rpx;
    background-color: #fff;
    border-radius: 32rpx;
    padding: 0 24rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

    .search-input {
      flex: 1;
      margin-left: 12rpx;
      font-size: 28rpx;
      color: #333;
    }

    .search-placeholder {
      flex: 1;
      margin-left: 12rpx;
      font-size: 28rpx;
      color: #999;
    }
  }
}

.navbar-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;

  .message-icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48rpx;
    height: 48rpx;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;

    .badge {
      position: absolute;
      top: -8rpx;
      right: -8rpx;
      min-width: 32rpx;
      height: 32rpx;
      background-color: #ff4d4f;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 8rpx;
      border: 2rpx solid #fff;

      .badge-text {
        font-size: 20rpx;
        color: #fff;
        font-weight: 600;
        line-height: 1;
        transform: scale(0.9);
      }
    }
  }

  .message-text {
    margin-top: 4rpx;
    font-size: 20rpx;
    color: #fff;
  }
}
</style>