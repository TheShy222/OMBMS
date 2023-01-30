import axiosInstance from '@/utils/request.js'
/**
 * 前台管理员信息接口
 */
export const RequestReceptionAdmin = () => {
  return axiosInstance({
    method: 'get',
    url: '/getReceptionAdmin',
  })
}
/**
 * 新增前台管理员信息接口
 */
export const RequestAddReceptionAdmin = (formData) => {
  return axiosInstance({
    method: 'post',
    url: '/addReceptionAdmin',
    headers: { "Content-Type": 'multipart/form-data'},
    data:formData
  })
}
/**
 * 编辑前台管理员信息接口
 */
export const RequestEditReceptionAdmin = (formData) => {
  return axiosInstance({
    method: 'post',
    url: '/editReceptionAdmin',
    headers: { "Content-Type": 'multipart/form-data'},
    data:formData
  })
}
/**
 * 删除前台管理员信息接口
 */
export const RequestDeleteReceptionAdmin = (id) => {
  return axiosInstance({
    method: 'delete',
    url: '/deleteReceptionAdmin',
    params:{
      id
    }
  })
}