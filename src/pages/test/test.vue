<template>
  <view class="product-list">
    <view v-if="loading">
      <text>加载中...</text>
    </view>

    <view v-else-if="productList.length > 0">
      <view
        v-for="item in productList"
        :key="item.id"
        class="product-item"
      >

            <image
                :src="getImageUrl(item)"
                mode="aspectFill"
                class="product-image"
                @error="onImageError(item)"
                @load="onImageLoad(item)"
            />

        <text>{{ item.name || '未知商品' }}</text>
        <text>价格: ¥{{ item.price || 0 }}</text>
      </view>
    </view>

    <view v-else>
      <text>暂无商品数据</text>
    </view>
  </view>
</template>



 模板
<script lang="ts" setup>
import ProductAPI from '@/api/Product'
import { ref, onMounted } from 'vue'

const productList = ref<any[]>([])
const loading = ref(false)
const imageLoaded = ref<Record<number, boolean>>({})
const imageError = ref<Record<number, boolean>>({})
const defaultImage = 'https://www.ciphp.com/zh/image/placeholder?width=800&height=600&bg=cccccc&text=Product&color=666666&font_size=64'


const getImageUrl = (item: any) => {
  return item.image || 'https://via.placeholder.com/'
}

const onImageError = (item: any) => {
  console.warn('图片加载失败:', item.image)
  // 可以设置备用图片
  item.image = 'https://via.placeholder.com/400x400?text=加载失败'
}

const onImageLoad = (item: any) => {
  console.log('图片加载成功:', item.image)
}

const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await ProductAPI.getAllProducts({ page: 1, pageSize: 10 })

    // 修复数据处理逻辑 - 从 records 字段获取数据
    if (response && response.records && Array.isArray(response.records)) {
      productList.value = response.records
    } else if (response && response.data && Array.isArray(response.data)) {
      productList.value = response.data
    } else {
      productList.value = []
    }

    console.log('处理后的商品列表:', productList.value)
  } catch (error) {
    console.error('获取商品失败:', error)
    productList.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>


<style scoped>.product-image {
  width: 100%;
  height: 300rpx;
  background-color: #f0f0f0;
  transition: opacity 0.3s ease;
}

.product-image:not(.image-loaded) {
  opacity: 0.5;
}

.product-image.image-error {
  opacity: 1;
  background-image: url('https://via.placeholder.com/400x400?text=加载失败');
  background-size: cover;
  background-position: center;
}
</style>

<style scoped>
.product-list-page {
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #fff;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.scroll-view {
  flex: 1;
  padding: 20rpx;
  overflow-y: auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.product-item {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
}

.product-image {
  width: 100%;
  height: 300rpx;
  background-color: #f0f0f0;
}

.product-info {
  padding: 20rpx;
}

.product-name {
  font-size: 28rpx;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 1.4;
  min-height: 78rpx;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16rpx;
}

.price {
  font-size: 32rpx;
  color: #ff4d4f;
  font-weight: bold;
}

.stock {
  font-size: 24rpx;
  color: #999;
}

.status-tag {
  margin-top: 12rpx;
  padding: 6rpx 16rpx;
  border-radius: 8rpx;
  font-size: 22rpx;
  display: inline-block;
}

.status-tag.on-sale {
  background-color: #e6f7ff;
  color: #1890ff;
}

.status-tag.off-sale {
  background-color: #f5f5f5;
  color: #999;
}

.loading-more,
.no-more {
  text-align: center;
  padding: 30rpx;
  color: #999;
  font-size: 28rpx;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>
