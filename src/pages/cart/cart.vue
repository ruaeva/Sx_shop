<template>
  <view class="cart-page">
    <view class="page-header">
      <!--      <CartNavbar />-->
    </view>

    <view class="page-content">
      <CartList/>
      <Recommend/>
    </view>

    <view class="page-footer">
      <!--      <CartFooter />-->
      <CartFooter/>
    </view>

  </view>
</template>
<script setup lang="ts">

// import { useCartStore } from '@/store/cartStore'
import CartList from "@/pages/cart/components/CartList.vue";
import CartFooter from "@/pages/cart/components/CartFooter.vue";
import Recommend from "@/pages/cart/components/Recommend.vue";

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