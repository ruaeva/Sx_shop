<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductAPI from '@/api/Product'

const productList = ref<any[]>([])

onMounted(() => {
  fetchProductList()
})

const fetchProductList = async () => {
  try {
    console.log('正在请求商品列表...')
    const response: any = await ProductAPI.getList({})
    console.log('原始响应数据:', response)

    // 更灵活的数据处理
    if (response) {
      if (Array.isArray(response.data)) {
        productList.value = response.data
      } else if (Array.isArray(response)) {
        productList.value = response
      } else if (response.data && Array.isArray(response.data.records)) {
        // 处理分页数据结构
        productList.value = response.data.records
      }
    }

    console.log('处理后的商品列表:', productList.value)
  } catch (error: any) {
    console.error('获取商品列表失败:', error)
    console.error('错误详情:', {
      message: error.message,
      code: error.code,
      response: error.response
    })
  }
}
</script>

