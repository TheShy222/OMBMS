import axiosInstance from '@/utils/request.js'
/**
 * 获取供应商列表
 */
export const RequestGetSupplier = () => {
    return axiosInstance({
        method: 'get',
        url: '/getSupplier',
    })
}
/**
 * 添加供应商
 */
export const RequestAddSupplier = (supplier) => {
    return axiosInstance({
        method: 'post',
        url: '/addSupplier',
        data: {
            supplier
        }
    })
}
/**
 * 删除供应商
 */
export const RequestDeleteSupplier = (id) => {
    return axiosInstance({
        method: 'delete',
        url: '/deleteSupplier',
        params: {
            id
        }
    })
}
/**
 * 编辑供应商
 */
export const RequestEditSupplier = (supplier) => {
    return axiosInstance({
        method: 'put',
        url: '/editSupplier',
        data: {
            supplier
        }
    })
}