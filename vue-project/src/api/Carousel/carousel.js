import axiosInstance from '@/utils/request.js'
/**
 * 商品信息接口
 */
export const RequestCarousel = () => {
  return axiosInstance({
      method: 'get',
      url: '/getCarousel',
  })
}