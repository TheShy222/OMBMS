<template>
  <el-row>
    <el-col>
      <div id="main" style="width: 100%; height: 300px"></div>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <div id="main2" style="width: 100%; height: 300px"></div>
    </el-col>
  </el-row>
</template>

<script>
// * 表示导入所有，as 别名
import * as echarts from "echarts"
import { RequestIssueOrder } from '@/api/Order/order.js'
export default {
  /**
   * vue组件 生命周期函数执行规则:
   *    vue生命周期created中启动异步任务，不会等待异步任务结果，在执行mounted生命周期函数，
   *    如果要在mounted生命周期使用数据，在mounted启动异步任务，接收数据处理后续操作
   */
  data() {
    return {
       orderList:[]
    }
  },
  mounted() {
    this.getIssueOrder()
    this.drawBar2()
  },
  methods: {
    //获取订单信息
    async getIssueOrder() {
      const res = await RequestIssueOrder('10','1')
      if (res.data.code == 1) {
        this.orderList = res.data.list
        this.drawOrderBar()
      }
    },
    drawOrderBar() {
      const orderX = this.orderList.map(item=>item.goodsId) 
      const orderNumber = this.orderList.map(item=>item.number) 
      const orderPrice = this.orderList.map(item=>item.totalPrice) 
      const echart = echarts.init(document.getElementById('main'))
      echart.setOption({
        title: {
          text: '产品销量',
        },
        legend: {
          data: ['销量', '收入'],
        },
        xAxis: {
          data: orderX
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar', // 柱状图
            data: orderNumber,
          },
          {
            name: '收入',
            type: 'line', // 柱状图
            data: orderPrice,
          },
        ],
      })
    },
    drawBar2() {
      const echart = echarts.init(document.getElementById('main2'))
      echart.setOption({
        title: {
          text: '产品销量',
        },
        legend: {
          data: ['销量'],
        },
        series: [
          {
            name: '销量',
            type: 'pie', // 柱状图
            data: [{ name: '耐克', value: 89 },
            { name: '安踏', value: 44 },
            { name: '李宁', value: 15 },
            { name: '斐乐', value: 46 },
            { name: '北面', value: 43 },
            { name: '特步', value: 25 }
            ],
            color: [
              '#dd6b66',
              '#759aa0',
              '#e69d87',
              '#8dc1a9',
              '#ea7e53',
              '#eedd78',
            ]
          },
        ],
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
