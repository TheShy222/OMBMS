<template>
    <div class="container" v-show="show">
        <div class="top">
            <div class="total-price">
                今日付款总金额
                <div>7451</div>
            </div>
            <div class="order">
                今日付款订单数
                <div>342</div>
            </div>
            <div class="today">
                今日访客
                <div>135</div>
            </div>
            <div class="send">
                今日待发货
                <div>46</div>
            </div>
        </div>
        <div id="main"></div>
        <div id="main2"></div>
        <div id="main3"></div>
        <div id="main4"></div>
    </div>
    <div v-show="!show">欢迎使用本系统！</div>
</template>

<script>
// * 表示导入所有，as 别名
import * as echarts from 'echarts'
export default {
    data() {
        return {
            show: false,
        }
    },
    created() {
        this.job = JSON.parse(localStorage.getItem('loginAccount'))[0].job
        if (this.job == '超级管理员') {
            this.show = true
        } else {
            this.show = false
        }
    },
    mounted() {
        this.drawBar()
        this.drawBar2()
        this.drawBar3()
        this.drawBar4()
    },
    methods: {
        drawBar() {
            const echart1 = echarts.init(document.getElementById('main'))
            document
                .getElementById('main')
                ?.removeAttribute('_echarts_instance_') //解决第一次图表不显示问题
            echart1.setOption({
                title: {
                    text: '商品销量和收入',
                },
                legend: {
                    data: ['销量', '收入'],
                },
                xAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#00F6FF',
                        },
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 16,
                        color: '#00F6FF',
                    },
                    //取消x轴的刻度线显示
                    axisTick: {
                        show: false,
                    },
                    data: [
                        '彪马',
                        '安踏',
                        '特步',
                        '斐乐',
                        '北面',
                        '李宁',
                        '耐克',
                    ],
                },
                yAxis: {
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#00F6FF',
                        },
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 16,
                        color: '#00F6FF',
                    },
                },
                series: [
                    {
                        name: '销量',
                        type: 'bar', // 柱状图
                        data: [101, 202, 303, 404, 505, 202, 404],
                        color: '#268AFC',
                    },
                    {
                        name: '收入',
                        type: 'line', // 柱状图
                        color: '#FF0084',
                        data: [600, 700, 800, 900, 1000, 606, 334],
                    },
                ],
            })
        },
        drawBar2() {
            const echart2 = echarts.init(document.getElementById('main2'))
            document
                .getElementById('main2')
                ?.removeAttribute('_echarts_instance_')
            echart2.setOption({
                title: {
                    text: '商品库存',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    top: '5%',
                    left: 'center',
                },
                series: [
                    {
                        name: '品牌',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold',
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: [
                            {
                                value: 1048,
                                name: '彪马',
                                itemStyle: { color: '#00F6FF' },
                            },
                            {
                                value: 735,
                                name: '安踏',
                                itemStyle: { color: '#00FFA2' },
                            },
                            {
                                value: 580,
                                name: '特步',
                                itemStyle: { color: '#FFF000' },
                            },
                            {
                                value: 484,
                                name: '斐乐',
                                itemStyle: { color: '#FFAE00' },
                            },
                            {
                                value: 300,
                                name: '北面',
                                itemStyle: { color: '#268AFC' },
                            },
                            {
                                value: 400,
                                name: '李宁',
                                itemStyle: { color: '#FF0084' },
                            },
                            {
                                value: 500,
                                name: '耐克',
                                itemStyle: { color: '#FF1E00' },
                            },
                        ],
                    },
                ],
            })
        },
        drawBar3() {
            const echart3 = echarts.init(document.getElementById('main3'))
            document
                .getElementById('main3')
                ?.removeAttribute('_echarts_instance_')
            echart3.setOption({
                title: {
                    text: '订单量',
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月'],
                    axisLine: {
                        lineStyle: {
                            color: '#00F6FF',
                        },
                    },
                    boundaryGap: false,
                    //取消x轴的刻度线显示
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        fontSize: 16,
                    },
                },
                yAxis: {
                    nameGap: 30,
                    minInterval: 1,
                    nameTextStyle: {
                        fontSize: 16,
                        color: '#00F6FF', //X轴文字颜色
                        verticalAlign: 'center',
                    },
                    type: 'value',
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            width: 1,
                            color: '#00F6FF',
                            opacity: '0.5',
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#00F6FF',
                        },
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 16,
                        color: '#00F6FF',
                    },
                    splitArea: {
                        show: false,
                    },
                },
                series: {
                    name: '数值',
                    type: 'line',
                    color: '#00F6FF',
                    symbol: 'none',
                    smooth: true,
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#00F6FF', // 0% 处的颜色
                                },
                                {
                                    offset: 0.8,
                                    color: '#00304C ', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    data: [200, 100, 300, 440, 350],
                    markLine: {
                        // 锁定最后一个元素展示纵向虚线
                        symbol: ['none', 'none'],
                        lineStyle: {
                            type: 'solid',
                            color: '#00F6FF',
                        },
                        label: { show: false },
                        data: [{ xAxis: 4 }],
                    },
                },
            })
        },
        drawBar4() {
            const echart4 = echarts.init(document.getElementById('main4'))
            document
                .getElementById('main4')
                ?.removeAttribute('_echarts_instance_')
            echart4.setOption({
                title: {
                    text: '商品种类销量',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLine: {
                        lineStyle: {
                            color: '#00F6FF',
                        },
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 16,
                        color: '#00F6FF',
                    },
                    //取消x轴的刻度线显示
                    axisTick: {
                        show: false,
                    },
                },
                yAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#00F6FF',
                        },
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 16,
                        color: '#00F6FF',
                    },
                    //取消x轴的刻度线显示
                    axisTick: {
                        show: false,
                    },
                    type: 'category',
                    data: ['鞋子', '外套', '短袖', '袜子', '帽子', '羽绒服'],
                },
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [182, 234, 290, 1049, 1317, 630],
                        color: '#FF00D2',
                    },
                ],
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative;
    &::-webkit-scrollbar {
      width: 0;
    }
    .top {
        display: flex;
        width: 100%;
        height: 80px;
        justify-content: space-between;
        margin-bottom: 20px;
        .total-price {
            width: 200px;
            background-color: rgb(221, 151, 60);
            color: white;
            font-size: 18px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            div {
                font-size: 30px;
            }
        }
        .order {
            width: 200px;
            background-color: rgb(66, 151, 236);
            color: white;
            font-size: 18px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            div {
                font-size: 30px;
            }
        }
        .today {
            width: 200px;
            background-color: rgb(62, 230, 56);
            color: white;
            font-size: 18px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            div {
                font-size: 30px;
            }
        }
        .send {
            width: 200px;
            background-color: rgb(247, 89, 89);
            color: white;
            font-size: 18px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            div {
                font-size: 30px;
            }
        }
    }
    #main {
        width: 50%;
        height: 300px;
        position: absolute;
        left: 0;
    }
    #main2 {
        width: 50%;
        height: 300px;
        position: absolute;
        right: 0;
        top: 100px;
    }
    #main3 {
        width: 50%;
        height: 300px;
        position: absolute;
        left: 0;
        top: 400px;
    }
    #main4 {
        width: 50%;
        height: 300px;
        position: absolute;
        right: 0;
        top: 400px;
    }
}
</style>
