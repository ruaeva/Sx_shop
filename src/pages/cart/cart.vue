<template>
  <view class="cart-page">
    <view class="header">
      <CartNav/>
    </view>
    <view class="content">
      <CartList/>
    </view>
    <CartBottomBar/>
  </view>
</template>

<script setup lang="ts">

// import {onLoad} from "@dcloudio/uni-app";
// import CartNav from "@/pages/cart/components/CartNavbar.vue";
// import CartList from "@/pages/cart/components/CartList.vue";
// import CartBottomBar from "@/pages/cart/components/BottomBar.vue";

onLoad(() => {
  console.log('onLoad');
});
</script>
<style scoped lang="scss">

</style>


