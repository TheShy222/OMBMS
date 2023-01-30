import axiosInstance from '@/utils/request.js'
/**
 * 用户信息接口
 */
export const RequestUsersInfo = (pageSize,pageNo,searchId,asc,desc) => {
  return axiosInstance({
      method: 'get',
      url: '/usersInfo',
      params:{
          pageSize,
          pageNo,
          searchId,
          asc,
          desc
      }
  })
}
/**
 * 添加用户信息接口
 */
export const RequestAddUser = (user) => {
  return axiosInstance({
      method: 'post',
      url: '/addUser',
      data:{
          user
      }
  })
}
/**
 * 编辑用户信息接口
 */
export const RequestEditUser = (user) => {
  return axiosInstance({
      method: 'post',
      url: '/editUser',
      data:{
          user
      }
  })
}