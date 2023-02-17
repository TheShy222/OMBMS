import axios from 'axios'
/**
 * 创建axios实例
 *   封装baseURL
 */
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8888', // 服务根地址
    timeout: 3000, // 超时时间
})

export default axiosInstance