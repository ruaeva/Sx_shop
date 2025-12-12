# my-vue3-project

一个基于 Vue 3 的项目，使用了 uni-app 框架。

## 项目结构

```
src/
├── App.vue                 # 根组件
├── main.ts                 # 应用入口文件
├── components/             # 全局组件
│   ├── LoadingPage.vue
│   └── NavbarPlaceholder.vue
├── pages/                  # 页面组件
│   ├── cart/               # 购物车相关页面
│   ├── category/           # 分类页面
│   ├── coupon/             # 优惠券页面
│   ├── index/              # 首页
│   ├── message/            # 消息页面
│   ├── order/              # 订单页面
│   ├── user/               # 用户页面
│   └── wallet/             # 钱包页面
├── data/                   # 数据文件
│   └── GoodsData.json
├── static/                 # 静态资源
└── store/                  # 状态管理
    └── cartStore.ts
```

## 技术栈

- Vue 3
- TypeScript
- uni-app
- Vite
- Pinia

## 安装依赖

```bash
npm install
```

或

```bash
yarn install
```

## 开发运行

```bash
npm run dev
```

## 构建

```bash
npm run build
```

## 项目功能

- 首页浏览
- 商品分类
- 购物车功能
- 用户中心
- 订单管理
- 优惠券功能
- 消息系统
- 钱包功能