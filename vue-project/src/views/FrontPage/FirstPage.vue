<template>
  <el-carousel :interval="3000" arrow="always">
    <!-- 轮播区域 -->
    <el-carousel-item v-for="item in carouselList" :key="item.carouselid">
      <img :src=item.url>
    </el-carousel-item>
  </el-carousel>
  <h2 class="recommend">商品推荐专区</h2>
  <ul>
    <li v-for="item in recommendList" :key="item.id">
      <img :src="item.url">
      <h2>{{ item.name }}</h2>
      <p>{{ item.price }}</p>
    </li>
  </ul>
</template>

<script>
import {RequestCarousel} from '@/api/Carousel/carousel.js'
import {RequestRecommend} from '@/api/Recommend/recommend.js'
export default {
  data() {
    return {
      carouselList: [],
      recommendList:[]
    }
  },
  created() {
    this.getCarousel()
    this.getRecommend()
  },
  methods: {
    async getCarousel(){
      const res=await RequestCarousel()
      if(res.data.code===1){
        this.carouselList=res.data.list
      }
    },
    async getRecommend(){
      const res=await RequestRecommend()
      if(res.data.code===1){
        this.recommendList=res.data.list
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel img{
  width: 100%;
  height: 100%;
}
.recommend{
  margin-top: 30px;
  margin-left: 50px;
  color: red;
  font-weight: 700;
}
ul{
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  text-align: center;
  margin-top: 20px;
}
li{
  width: 284px;
  height: 300px;
  margin-left: 20px;
  margin-right: 20px;
  &:first-child{
    margin-left: 0;
  }
  &:nth-child(4n){
    margin-right: 0;
  }
  img{
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }
}

</style>