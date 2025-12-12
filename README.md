# 一个基于Uniapp的B2B生鲜商城 

一个基于 Vue 3 的项目，使用了 uni-app 框架。

实习练手的小项目，基于 uni-app 框架，使用 Vue 3 + TS + uView-Plus开发，使用 Pinia 状态管理，使用 Vite 构建。

> 仅完成客户端UI部分，后端部分需自行完善

- **适配平台：** H5、微信小程序、App（IOS/Android）

```shell

如果对您有帮助，您可以点右上角 “Star” 收藏一下 ，获取第一时间更新，谢谢！

```

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
- Uni-app
- Nodejs 20.19
- Vite
- Pinia
- uView-Plus 组件库

## 安装依赖

> **注意** node >= 20.0.0 以下组件库依赖可能引入不成功

```bash
npm install
```

或

```bash
yarn install
```

## 开发运行

```bash
uni
```

## 构建

```bash
uni build
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

## 版权须知

- 允许个人学习、研究使用本项目代码及资源；

- 支持基于本项目进行二次开发；

- 允许将二次开发后的成果用于商业用途，无需额外授权。
