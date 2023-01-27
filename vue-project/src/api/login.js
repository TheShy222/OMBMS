import axiosInstance from '@/utils/request.js'
/**
 * 登录接口
 */
export const RequestLogin = (name, password) => {
    return axiosInstance({
        method: 'post',
        url: '/login',
        data: {
            name,
            password
        }
    })
}