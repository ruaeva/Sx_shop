<template>
  <view class="category-panel">
    <up-scroll-list indicatorBarWidth="24">
      <view class="scroll-list">
        <view
            class="scroll-list__line"
            v-for="(item, index) in menuArr"
            :key="index"
        >
          <view
              class="scroll-list__line__item"
              v-for="(item1, index1) in item"
              :key="index1"
              :class="[(index1 === item.length - 1) && 'scroll-list__line__item--no-margin-right']"
          >
            <image
                class="scroll-list__line__item__image"
                :src="menuBaseUrl + item1.icon"
                mode=""
            ></image>
            <text class="scroll-list__line__item__text">{{ item1.name }}</text>
          </view>
        </view>
      </view>
    </up-scroll-list>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const goodsBaseUrl = ref('https://cdn.uviewui.com/uview/goods/')
const menuBaseUrl = ref('https://cdn.uviewui.com/uview/menu/')
const menuArr = ref([
  [{
    name: '天猫新品',
    icon: '11.png'
  },
    {
      name: '今日爆款',
      icon: '9.png'
    }, {
    name: '天猫国际',
    icon: '17.png'
  }, {
    name: '饿了么',
    icon: '6.png'
  }, {
    name: '天猫超市',
    icon: '11.png'
  }, {
    name: '分类',
    icon: '2.png'
  }, {
    name: '天猫美食',
    icon: '3.png'
  }, {
    name: '阿里健康',
    icon: '12.png'
  }, {
    name: '口碑生活',
    icon: '7.png'
  }
  ],
  [{
    name: '充值中心',
    icon: '8.png'
  },
    {
      name: '机票酒店',
      icon: '10.png'
    }, {
    name: '金币庄园',
    icon: '18.png'
  }, {
    name: '阿里拍卖',
    icon: '15.png'
  }, {
    name: '淘宝吃货',
    icon: '16.png'
  }, {
    name: '闲鱼',
    icon: '4.png'
  }, {
    name: '会员中心',
    icon: '6.png'
  }, {
    name: '造点新货',
    icon: '13.png'
  }, {
    name: '土货鲜食',
    icon: '14.png'
  }
  ]
])
</script>


<style lang="scss" scoped>
.category-panel {
}

.scroll-list {
  margin: 0 24rpx;
  @include flex(column);

  &__goods-item {
    margin-right: 20px;

    &__image {
      width: 60px;
      height: 60px;
      border-radius: 4px;
    }

    &__text {
      color: #f56c6c;
      text-align: center;
      font-size: 12px;
      margin-top: 5px;
    }
  }

  &__show-more {
    background-color: #fff0f0;
    border-radius: 3px;
    padding: 3px 6px;
    @include flex(column);
    align-items: center;

    &__text {
      font-size: 12px;
      width: 12px;
      color: #f56c6c;
      line-height: 16px;
    }
  }

  &__line {
    @include flex;
    margin-top: 10px;

    &__item {
      @include flex(column);
      align-items: center;
      flex: 1;
      margin-right: 15px;

      &__image {
        width: 61px;
        height: 48px;
      }

      &__text {
        margin-top: 5px;
        color: $u-content-color;
        font-size: 12px;
        text-align: center;
      }

      &--no-margin-right {
        margin-right: 0;
      }
    }
  }
}
</style>