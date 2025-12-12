<script setup lang="ts">
import {ref} from 'vue';
import NavbarPlaceholder from "@/components/NavbarPlaceholder.vue";

// 定义 emit
const emit = defineEmits<{
  'change': [category: { index: number; name: string; icon: string }]
}>()

// 默认图片URL提取为常量
const DEFAULT_IMAGE_URL = 'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0';

const categoryActiveIndex = ref(1);

const categoryList = ref([
  {index: 1, name: '全部', icon: ''},
  {index: 2, name: '手机', icon: ''},
  {index: 3, name: '电脑', icon: ''},
  {index: 4, name: '平板', icon: ''},
  {index: 5, name: '电视', icon: ''},
  {index: 6, name: '智能家居', icon: ''},
  {index: 7, name: '配件', icon: ''},
  {index: 8, name: '相机', icon: ''},
  {index: 9, name: '耳机', icon: ''},
  {index: 10, name: '音箱', icon: ''},
  {index: 11, name: '路由器', icon: ''},
  {index: 12, name: '充电器', icon: ''},
  {index: 13, name: '数据线', icon: ''},
  {index: 14, name: '其他', icon: ''}
]);

const showCategoryPopup = ref(false);

const handleCategoryChange = (index: number) => {
  if (categoryActiveIndex.value === index) return;

  categoryActiveIndex.value = index;

  // 查找选中的分类并通过 emit 传递给父组件
  const selectedCategory = categoryList.value.find(item => item.index === index);
  if (selectedCategory) {
    emit('change', selectedCategory);
    // 关闭弹窗（如果打开的话）
    closeMore();
  }
};

const showMore = () => {
  showCategoryPopup.value = true;
};

const closeMore = () => {
  showCategoryPopup.value = false;
};
</script>

<template>
  <view class="scroll-bar-container">
    <view class="scroll-list">
      <up-scroll-list :indicator="false">
        <view
            v-for="(item, index) in categoryList"
            :key="index"
            class="category-item"
            :class="{ active: categoryActiveIndex === item.index }"
            @click="handleCategoryChange(item.index)"
        >
          <image
              :src="item.icon || DEFAULT_IMAGE_URL"
              class="category-item__icon"
          />
          <text class="category-item__name">{{ item.name }}</text>
        </view>

        <view class="scroll-list__show-more" @click="showMore">
          <text class="scroll-list__show-more__text">查看更多</text>
          <u-icon name="arrow-right" color="#f56c6c" size="12"/>
        </view>

        <u-popup
            :show="showCategoryPopup"
            :round="24"
            mode="top"
            @close="closeMore"
            @open="showMore"
        >
          <!-- 自定义导航栏高度 -->
          <NavbarPlaceholder
              :navbar-height="50"
              :include-status-bar="true"
              :extra-height="10"
          />

          <view class="category-popup">
            <view class="nav"></view>
            <view class="category-list">
              <view
                  v-for="(item, index) in categoryList"
                  :key="index"
                  class="category-item"
                  :class="{ active: categoryActiveIndex === item.index }"
                  @click="handleCategoryChange(item.index)"
              >
                <image
                    :src="item.icon || DEFAULT_IMAGE_URL"
                    class="category-item__icon"
                />
                <text>{{ item.name }}</text>
              </view>
            </view>
          </view>
        </u-popup>
      </up-scroll-list>
    </view>

  </view>
</template>


<style scoped lang="scss">

.scroll-bar-container {

}

.scroll-list {

}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20rpx;
  margin-bottom: 10rpx;

}

.category-item.active {
  position: relative;

  &:before {

    content: "";
    position: absolute;
    bottom: 0;
    width: 60%;
    height: 4rpx;
    border-radius: 4rpx;
    background: rgb(255, 3, 3);
  }

  .category-item__name {
    position: relative;
    color: red;
    padding-bottom: 6rpx;

  }

}

.category-item__icon {
  width: 120rpx;
  height: 120rpx;
  
  margin-bottom: 10rpx;
  background: #f5f5f5;
}

.scroll-list__show-more {
  position: sticky;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10rpx;
  background: #c2866c;
  line-height: 1.25;
  border-radius: 20rpx 0 0 20rpx;
}

.category-popup {
  display: flex;
  flex-direction: column;

  padding: 20rpx;
  border-radius: 24rpx;

  .category-list {
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;
  }
}


</style>