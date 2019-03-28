# 这是一个NB的项目

## 牛不牛逼，用心去感受，每一行代码中诗情雅意

### 我们是有灵魂的程序员，所以，我们的代码富有诗意；

#### 丫的，实在编不下去了，哈哈哈

## 用（传统方式）命令行把修改的代码上传到githup上

1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页APP组件
1. 完成Header区域，使用的是mit-ui中的header组件
2. 制作底部的Tabbar区域，使用的是MUI的tabbar.html
    + 在制作购物车小图标的时候，操作会多一些：
    + 先把扩展图标的css样式拷贝到项目中去
    + 拷贝扩展字体库的ttf文件，到项目中
    + 为购物车小图标，添加如下样式：mui-icon mui-icon-extra mui-icon-extra-cart
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造tabbar为router-link

## 设置路由高亮

## 点击tabbar中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，如何获取呢，使用vue-resource
2.使用vue-resource的 this.$http.get获取数据
3.获取到的数据，要保存到data身上
4.使用v-for循环，渲染每个item项

## 改造九宫格区域的样式