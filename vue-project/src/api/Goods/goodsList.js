import axiosInstance from '@/utils/request.js'
/**
 * 商品信息接口
 */
export const RequestGoodsInfo = (pageSize,pageNo,searchId) => {
  return axiosInstance({
      method: 'get',
      url: '/goodsInfo',
      params:{
          pageSize,
          pageNo,
          searchId,
      }
  })
}
/**
 * 获取商品种类接口
 */
export const RequestGoodsType = () => {
  return axiosInstance({
      method: 'get',
      url: '/goodsType',
  })
}
/**
 * 获取商品品牌种类接口
 */
export const RequestGoodsBrandType = () => {
  return axiosInstance({
      method: 'get',
      url: '/goodsBrandType',
  })
}
/**
 * 获取商品尺码接口
 */
export const RequestGoodsSizeType = () => {
  return axiosInstance({
      method: 'get',
      url: '/goodsSizeType',
  })
}
/**
 * 添加商品接口
 */
export const RequestAddGoods = (formData) => {
  return axiosInstance({
      method: 'post',
      url: '/addGoods',
      data:{
        formData
      }
  })
}
/**
 * 删除商品接口
 */
export const RequestDeleteGoods = (id,size) => {
  return axiosInstance({
      method: 'get',
      url: '/deleteGoods',
      params:{
        id,
        size
      }
  })
}
/**
 * 批量删除商品接口
 */
export const RequestBatchDelete = (ids) => {
  return axiosInstance({
      method: 'get',
      url: '/batchDeleteGoods',
      params:{
        ids
      }
  })
}
/**
 * 编辑商品接口
 */
export const RequestEditGoods = (formData) => {
  return axiosInstance({
      method: 'post',
      url: '/editGoods',
      data:{
        formData
      }
  })
}