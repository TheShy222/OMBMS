import axiosInstance from '@/utils/request.js'
/**
 * 轮播图接口
 */
export const RequestCarousel = () => {
  return axiosInstance({
      method: 'get',
      url: '/getCarousel',
  })
}
/**
 * 添加轮播图接口
 */
export const RequestAddCarousel = (formData) => {
  return axiosInstance({
      method: 'post',
      url: '/addCarousel',
      headers: { "Content-Type": 'multipart/form-data'},
      data: formData
  })
}
/**
 * 删除轮播接口
 */
export const RequestDeleteCarousel = (carouselid) => {
  return axiosInstance({
      method: 'get',
      url: '/deleteCarousel',
      params:{
        carouselid
      }
  })
}
/**
 * 编辑轮播图接口
 */
export const RequestEditCarousel = (formData) => {
  return axiosInstance({
      method: 'post',
      url: '/editCarousel',
      headers: { "Content-Type": 'multipart/form-data'},
      data: formData
  })
}