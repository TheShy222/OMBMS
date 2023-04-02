import axiosInstance from '@/utils/request.js'
/**
 * 推荐接口
 */
export const RequestRecommend = () => {
    return axiosInstance({
        method: 'get',
        url: '/getRecommend',
    })
}
export const RequestDeleteRecommend = id => {
    return axiosInstance({
        method: 'delete',
        url: '/deleteRecommend',
        params: {
            id,
        },
    })
}
export const RequestAddRecommend = formData => {
    return axiosInstance({
        method: 'post',
        url: '/addRecommend',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
    })
}
export const RequestEditRecommend = formData => {
    return axiosInstance({
        method: 'put',
        url: '/editRecommend',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
    })
}
