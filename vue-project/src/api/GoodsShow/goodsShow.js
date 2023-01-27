import axiosInstance from '@/utils/request.js'
/**
 * 商品信息接口
 */
export const RequestGoodsShow = (type) => {
  return axiosInstance({
      method: 'get',
      url: '/goodsShow',
      params:{
          type
      }
  })
}