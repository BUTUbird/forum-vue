import request from "@/utils/request";

export function userRegister(userDTO){
    return request({
        url:'/user/register',
        method: 'post',
        data:userDTO
    })
}
// 前台用户登录
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

//登录后获取前台用户信息
export function getUserInfo() {
    return request({
        url: '/user/info',
        method: 'get',
    })
}
//前台用户注销
export function logout() {
    return request({
        url: '/user/logout',
        method: 'get',
    })
}
//验证码
export function getVerify(time) {
    return request({
        url: '/user/verify/?time='+time,
        method: 'get',
        data:time
    })
}
export function disableOne(id) {
    return request({
        url: `/user/disableOne/${id}`,
        method: 'get',
    })
}
