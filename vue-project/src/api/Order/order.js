import axiosInstance from '@/utils/request.js'
/**
 * 订单信息接口
 */
export const RequestIssueOrder = (pageSize,pageNo,searchId) => {
  return axiosInstance({
      method: 'get',
      url: '/issueOrder',
      params:{
          pageSize,
          pageNo,
          searchId,
      }
  })
}
/**
 * 添加出库订单接口
 */
export const RequestAddIssueOrder = (formData) => {
  return axiosInstance({
      method: 'post',
      url: '/addIssueOrder',
      data:{
          formData
      }
  })
}
/**
 * 获取出库订单状态接口
 */
export const RequestIssueOrderState = () => {
  return axiosInstance({
      method: 'get',
      url: '/getIssueOrderState',
  })
}
/**
 * 获取物流方式接口
 */
export const RequestExpressType = () => {
  return axiosInstance({
      method: 'get',
      url: '/getExpressType',
  })
}
/**
 * 获取出库订单状态接口
 */
export const RequestChangeIssueOrderState = (orderNumber,expressType) => {
  return axiosInstance({
      method: 'post',
      url: '/issueOrderStateChange',
      data:{
        orderNumber,
        expressType
      }
  })
}
/**
 * 编辑出库订单接口
 */
export const RequestEditIssueOrder = (formData) => {
  return axiosInstance({
      method: 'post',
      url: '/editIssueOrder',
      data:{
        formData
      }
  })
}
/**
 * 商品库存更新接口
 */
export const RequestGoodsNumberChange = (formData) => {
  return axiosInstance({
      method: 'post',
      url: '/goodsNumberChange',
      data:{
        formData
      }
  })
}