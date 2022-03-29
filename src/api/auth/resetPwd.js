import request from "@/utils/request";


// 获取用户信息
export function getUser(token) {
    return request({
        url: `/user/getMailUser`,
        method: 'get',
        params: {
            token: token
        }
    })
}
//修改密码
export function resetPassword(data){
    return request({
        url: `/user/resetPwd`,
        method:'post',
        data
    })
}
//发送邮件
export function findMail(mail){
    return request({
        url: `/user/findMail`,
        method:'get',
        params: {
            mail:mail
        }
    })
}
