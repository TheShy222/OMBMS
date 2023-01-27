<template>
  <h2 class="shoes">袜子专区</h2>
  <ul>
    <li v-for="item,index in list" :key="index">
      <img :src="item.picture">
      <h2>{{ item.detail }}</h2>
      <p>{{ item.price }}元</p>
    </li>
  </ul>
</template>

<script>
import { RequestGoodsShow } from '@/api/GoodsShow/goodsShow.js'
export default {
  data() {
    return {
      list: [],
      type:'袜子'
    }
  },
  created() {
    this.getGoodsShow()
  },
  methods: {
    async getGoodsShow() {
      const res = await RequestGoodsShow(this.type)
      this.list=res.data.list
    }
  }
}
</script>

<style lang="scss" scoped>
.shoes{
  color: red;
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
  height: 320px;
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
  p{
    margin-top: 10px;
    width: 100%;
    color: red;
  }
}
</style>