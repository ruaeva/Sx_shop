<template>
  <view
      class="navbar-placeholder"
      :style="{ height: totalHeight + 'px' }"
  ></view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Props
const props = defineProps({
  // 导航栏内容高度(不含状态栏)
  navbarHeight: {
    type: Number,
    default: 44 // 默认44px
  },
  // 是否包含状态栏高度
  includeStatusBar: {
    type: Boolean,
    default: true
  },
  // 额外的间距
  extraHeight: {
    type: Number,
    default: 0
  }
});

// 状态栏高度
const statusBarHeight = ref(0);

// 计算总高度
const totalHeight = computed(() => {
  let height = props.navbarHeight;

  if (props.includeStatusBar) {
    height += statusBarHeight.value;
  }

  height += props.extraHeight;

  return height;
});

onMounted(() => {
  // 获取系统状态栏高度
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 20;
});

// 暴露总高度给父组件使用
defineExpose({
  totalHeight
});
</script>

<style scoped lang="scss">
.navbar-placeholder {
  width: 100%;
  flex-shrink: 0;
}
</style>