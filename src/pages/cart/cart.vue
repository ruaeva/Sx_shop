<template>
  <view class="cart-page">
    <view class="page-header">
      <!--      <CartNavbar />-->
    </view>

    <view class="page-content">
      <CartList/>
      <Recommend :is-managing="isManaging" @item-click="onRecommendItemClick" @add-cart="onAddToCart"/>
    </view>

    <view class="page-footer">
      <!--      <CartFooter />-->
      <CartFooter/>
    </view>

  </view>
</template>
<script setup lang="ts">

// import { useCartStore } from '@/store/cartStore'
import { ref } from 'vue';
import CartList from "@/pages/cart/components/CartList.vue";
import CartFooter from "@/pages/cart/components/CartFooter.vue";
import Recommend from "@/pages/cart/components/Recommend.vue";

// 管理模式状态
const isManaging = ref(false);

// 处理推荐商品点击事件
const onRecommendItemClick = (item: any) => {
  console.log('推荐商品被点击:', item);
  // 这里可以跳转到商品详情页
};

// 处理添加到购物车事件
const onAddToCart = async (id: number) => {
  console.log('添加到购物车:', id);
  // 这里可以实现添加到购物车的逻辑
};

// const CartStore = useCartStore()
//
// CartStore.getCartList()


</script>
<style lang="scss">
.cart-page {
  padding: 90px 0;
  background-color: $uni-bg-color;

  .page-header {
    //height: 100rpx;

  }

  .page-content {

  }

}

</style>