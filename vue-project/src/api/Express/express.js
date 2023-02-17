import axiosInstance from '@/utils/request.js'
/**
 * 添加物流方式接口
 */
export const RequestAddExpress = (formData) => {
  return axiosInstance({
    method: 'post',
    url: '/addExpress',
    headers: { "Content-Type": 'multipart/form-data' },
    data: formData
  })
}
/**
* 添加物流方式接口
*/
export const RequestEditExpress = (formData) => {
  return axiosInstance({
    method: 'put',
    url: '/editExpress',
    headers: { "Content-Type": 'multipart/form-data' },
    data: formData
  })
}
/**
* 删除物流方式接口
*/
export const RequestDeleteExpress = (id) => {
  return axiosInstance({
    method: 'delete',
    url: '/deleteExpress',
    params: {
      id
    }
  })
}