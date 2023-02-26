import axiosInstance from '@/utils/request.js'
/**
 * 评论接口
 */
export const RequestComment = (pageSize, pageNo, searchId) => {
    return axiosInstance({
        method: 'get',
        url: '/getComment',
        params: {
            pageSize,
            pageNo,
            searchId,
        },
    })
}
/**
 * 添加评论接口
 */
export const RequestAddComment = formData => {
    return axiosInstance({
        method: 'post',
        url: '/addComment',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
    })
}
/**
 * 编辑评论接口
 */
export const RequestEditComment = formData => {
    return axiosInstance({
        method: 'put',
        url: '/editComment',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
    })
}
/**
 * 删除评论接口
 */ 
export const RequestDeleteComment = commentId => {
    return axiosInstance({
        method: 'delete',
        url: '/deleteComment',
        params: {
            commentId,
        },
    })
}
