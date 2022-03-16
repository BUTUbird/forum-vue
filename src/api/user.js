import request from '@/utils/request'

// 用户主页
export function getInfoByName(username, page, size) {
  return request({
    url: '/user/' + username,
    method: 'get',
    params: {
      pageNo: page,
      size: size
    }
  })
}
// 用户主页
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
// 更新
export function update(user) {
  return request({
    url: '/user/update',
    method: 'post',
    data: user
  })
}


