import axiosInstance from '@/utils/request.js'
/**
 * 管理员信息接口
 */
export const RequestAdminsInfo = () => {
  return axiosInstance({
    method: 'get',
    url: '/adminsInfo',
  })
}
/**
 * 添加管理员接口
 */
export const RequestAddAdmin = (formData) => {
  return axiosInstance({
    method: 'post',
    url: '/addAdmin',
    data: {
      formData
    }
  })
}
/**
 * 删除管理员接口
 */
export const RequestdeleAdmin = (id) => {
  return axiosInstance({
    method: 'get',
    url: '/deleAdmin',
    params: {
      id
    }
  })
}
/**
 * 编辑管理员接口
 */
export const RequestEditAdmin = (formData) => {
  return axiosInstance({
    method: 'post',
    url: '/editAdmin',
    data: {
      formData
    }
  })
}

