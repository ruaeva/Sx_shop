<script setup lang="ts">
import {ref} from 'vue';
import NavbarPlaceholder from "@/components/NavbarPlaceholder.vue";

const categoryActiveIndex = ref(0);


const categoryList = ref([
  {
    id: 1,
    name: '全部',
    icon: ''
  },
  {
    id: 2,
    name: '手机',
    icon: ''
  },
  {
    id: 3,
    name: '电脑',
    icon: ''
  },
  {
    id: 4,
    name: '电脑',
    icon: ''
  },
  {
    id: 5,
    name: '电脑',
    icon: 'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0'
  },
  {
    id: 6,
    name: '电脑',
    icon: 'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0'

  },
  {
    id: 7,
    name: '111',
    icon: 'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0'

  },
  {
    id: 1,
    name: '全部',
    icon: 'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0'

  },
  {
    id: 2,
    name: '手机',
    icon: 'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0'

  },
  {
    id: 3,
    name: '电脑',
    icon: 'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0'

  },
  {
    id: 4,
    name: '电脑',
    icon: 'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0'

  },
  {
    id: 5,
    name: '电脑',
    icon: 'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0'

  },
  {
    id: 6,
    name: '电脑',
    icon: ''
  },
  {
    index: 7,
    name: '111',
    icon: ''
  },
])

const showCategoryPopup = ref(false);

const showMore = () => {
  showCategoryPopup.value = true;
}

const closeMore = () => {
  showCategoryPopup.value = false;
}
</script>

<template>
  <view class="scroll-bar-container">
    <view class="scroll-list">
      <up-scroll-list>
        <view v-for="(item, index) in categoryList" :key="index" class="category-item">
          <image :src="item.icon ? item.icon :   'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0'
 " class="category-item__icon"></image>

          <text>{{ item.name }}</text>
        </view>

        <view class="scroll-list__show-more" @click="showMore">
          <text class="scroll-list__show-more__text">查看更多</text>
          <u-icon name="arrow-leftward" color="#f56c6c" size="12"></u-icon>
        </view>

        <u-popup :show="showCategoryPopup" :round="24" mode="top" @close="closeMore" @open="showMore">

          <!-- 自定义导航栏高度 -->
          <NavbarPlaceholder
              :navbar-height="50"
              :include-status-bar="true"
              :extra-height="10"
          />

          <view class="category-popup">
            <view class="nav">
            </view>
            <view class="category-list">
              <view v-for="(item, index) in categoryList" :key="index" class="category-item">
                <image :src="item.icon ? item.icon :   'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0'
 " class="category-item__icon"></image>

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
  position: relative;
}

.category-item {
  display: flex;
  flex-direction: column;
  margin-left: 20rpx;


}

.category-item__icon {
  width: 120rpx;
  height: 120rpx;
  margin: 0 auto;
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
  padding: 20rpx;
  background: #fff;
}

.category-popup {
  display: flex;
  flex-direction: column;

  background: #fff;
  padding: 20rpx;

  .category-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}


</style>