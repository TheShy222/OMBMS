import axiosInstance from '@/utils/request.js'

export const RequestGetAfterSaleOrder = (pageSize, pageNo, searchId) => {
    return axiosInstance({
        method: 'get',
        url: '/getAfterSaleOrder',
        params: {
            pageSize,
            pageNo,
            searchId,
        },
    })
}
export const RequestAddAfterSaleOrder = formData => {
    return axiosInstance({
        method: 'post',
        url: '/addAfterSaleOrder',
        data: {
            formData,
        },
    })
}
export const RequestDeleteAfterSaleOrder = orderNumber => {
    return axiosInstance({
        method: 'delete',
        url: '/deleteAfterSaleOrder',
        params: {
            orderNumber,
        },
    })
}
