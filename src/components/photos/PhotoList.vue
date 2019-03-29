<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id === 0?'mui-active':'']"
            v-for="item in cates"
            :key="item.id"
            @tap="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+ item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>

      <!-- 模拟出来一个图片以及文字，方便接下来的详情页，因为接口没有数据 -->
      <router-link :to="'/home/photoinfo/'+ 37" tag="li">
        <img src="https://p3fx.kgimg.com/stdmusic/20150718/20150718065653668323.jpg" >
        <div class="info">
          <h1 class="info-title">林俊杰</h1>
        </div>
      </router-link>

    </ul>
  </div>
</template>

<script>
// 1. 导入mui的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [], // 所有分类的列表数组
      list: [] //图片列表的数组
    };
  },
  created() {
    this.getAllCreategory();
    //默认进入页面，就主动请求所有图片列表的数据
    this.getPhotoListByCateId(0);
  },
  mounted() {
    //当组件中的dom结构已经被渲染好，并放到页面中后，会执行这个钩子函数
    // 如果要操作元素，最好在mounted里操作，因为这里的dom元素是最新的
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCreategory() {
      // 获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 手动拼接出一个最完整的分类列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(cateId) {
      //根据分类ID，获取图片元素
      this.$http.get("api/getimages" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = this.result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 24px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
