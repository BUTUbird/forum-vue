import request from '@/utils/request'

export function getTopicsByTag(paramMap) {
  return request({
    url: '/tag/' + paramMap.name,
    method: 'get',
    params: {
      page: paramMap.page,
      size: paramMap.size
    }
  })
}
export function getTagechar() {
  return request({
    url: '/tag/echar',
    method: 'get'
  })
}

export function getTag(page, size) {
  return request({
    url: '/tag/getAll',
    method: 'get',
    params: {
      pageNo: page,
      size: size
    }
  })
}
export function deleteOne(id) {
  return request({
    url: `/tag/deleteOne/${id}`,
    method: 'delete',
  })
}