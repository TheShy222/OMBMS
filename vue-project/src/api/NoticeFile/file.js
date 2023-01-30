import axiosInstance from '@/utils/request.js'
/**
 * 商品信息接口
 */
export const RequestAddFile = (file) => {
  return axiosInstance({
      method: 'post',
      url: '/addFile',
      data: {
        file
      }
  })
}