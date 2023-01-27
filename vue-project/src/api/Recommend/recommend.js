import axiosInstance from '@/utils/request.js'
/**
 * 登录接口
 */
export const RequestRecommend = () => {
    return axiosInstance({
        method: 'get',
        url: '/getRecommend',
    })
}