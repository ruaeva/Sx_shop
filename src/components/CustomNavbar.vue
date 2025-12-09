<script setup lang="ts">
import {ref} from 'vue';

const opacity = ref(0); // 修改初始值为 1


let scrollTimer: number | null = null;

const onPageScroll = (e: { scrollTop: number }) => {
  // 异常处理和边界检查
  if (!e || typeof e.scrollTop !== 'number' || e.scrollTop < 0) {
    return;
  }

  // 使用防抖优化性能
  if (scrollTimer) clearTimeout(scrollTimer);
  scrollTimer = window.setTimeout(() => {
    if (e.scrollTop <= 44) {
      // 预计算常量值 1/44 ≈ 0.022727
      opacity.value = 1 - e.scrollTop * 0.022727;
    } else {
      opacity.value = 0;
    }
  }, 16); // 约60fps的刷新率
};
</script>


<template>
  <view class="custom-navbar" :style="{'background-color':`rgba(255,255,255,${opacity})`}">
    <view>
      <view>111</view>

    </view>
  </view>
</template>

<style scoped lang="scss">
.custom-navbar {
  flex: 1;
  height: 44px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

</style>