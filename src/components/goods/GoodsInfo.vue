<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lubotu"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <!-- 问题：我们不知道什么时候能够拿到max值，但是。终归有一刻，会得到一个真正的max值 -->
          <!-- 我们可以使用watch属性监听父组件传递过来的max值，不管watch会被触发几次，但是最后一次，肯定是一个合法的max数值 -->
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析：如何实现加入购物车时候，拿到选择的数量 -->
            <!-- 1. 经过分析发现：按钮属于goodsinfo 页面，数字数据numberbox组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了,所以,无法直接在goodsinfo页面中获取到选中的商品数量值 -->
            <!-- 3. 怎么解决这个问题：设计到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质：父向子传递方法，子调用这个方法，同时 把数据当做参数，传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数对象中的id挂载到data上，方便后期调用
      lubotu: [], //轮播图数据
      goodsinfo: {}, //获取到的商品的信息
      ballFlag: false, // 控制小球隐藏和显示的标识符
      selectedCount:1 //保存用户选中的商品数量，默认认为用户买一个
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 先循环轮播图数组的每一项，为item添加img属性，因为轮播图 组件中，只认识 item.img 不认识 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lubotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      // 获取商品信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      // 点击使用编程式导航，跳转到图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 点击跳转到 评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 不能把小球动画的横纵位移坐标写死，不然会造成页面滑动或者屏幕像素比改变的情况下，导致小球动画轨迹有偏差。
      // 要先得到徽标的横纵坐标，在得到小球的横纵坐标，然后让横纵坐标值求差，就能得到位移的距离。
      // 获取小球和徽标的位置： Object.getBoundingClientRect()

      // 获取小球在页面中的位置
      const ballPosition =  this.$refs.ball.getBoundingClientRect();
      //获取徽标在页面中的位置
      const badgePosition = document.getElementById("badge").getBoundingClientRect();

      // 计算横纵坐标差
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count){
      // 当子组件把选中的数量传递给父组件的时候，那选中的值保存到selectedCount身上
      this.selectedCount = count;
      console.log('父组件拿到的值为：'+ this.selectedCount)
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    left: 146px;
    top: 390px;
  }
}
</style>
