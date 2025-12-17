import { defineStore } from 'pinia'

const useCartStore = defineStore('cart', {
  state: () => ({
    cartList: []
  }),
  actions: {
    // 添加商品到购物车
    addCart(product) {
      // 检查购物车中是否已存在该商品
      const existingItem = this.cartList.find(item => item.id === product.id)

      if (existingItem) {
        // 如果商品已存在，增加数量
        existingItem.quantity += 1
      } else {
        // 如果是新商品，添加到购物车并设置数量为1
        this.cartList.push({ ...product, quantity: 1 })
      }
    },

    // 从购物车移除商品
    removeCart(productId) {
      this.cartList = this.cartList.filter(item => item.id !== productId)
    },

    // 更新商品数量
    updateQuantity(productId, quantity) {
      const item = this.cartList.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        // 如果数量小于等于0，则移除商品
        if (item.quantity <= 0) {
          this.removeCart(productId)
        }
      }
    },

    // 清空购物车
    clearCart() {
      this.cartList = []
    }
  },

  getters: {
    // 计算购物车商品总数
    cartTotalCount: (state) => {
      return state.cartList.reduce((total, item) => total + item.quantity, 0)
    },

    // 计算购物车总价
    cartTotalPrice: (state) => {
      return state.cartList.reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    // 获取购物车商品列表
    getCartList: (state) => {
      return state.cartList
    }
  }
})
export default useCartStore


