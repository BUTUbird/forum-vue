import request from '@/utils/request'

export function fetchCommentsByTopicId(topic_Id) {
  return request({
    url: '/comment/get_comments',
    method: 'get',
    params: {
      topicid: topic_Id
    }
  })
}

export function pushComment(data) {
  return request({
    url: '/comment/add_comment',
    method: 'post',
    data: data
  })
}

export function pushChildComment(data) {
  return request({
    url: '/comment/add_child_comment',
    method: 'post',
    data: data
  })
}

export function getComment(page, size) {
  return request({
    url: '/comment/getAll',
    method: 'get',
    params: {
      pageNo: page,
      size: size
    }
  })
}
export function delete_comment(id) {
  return request({
    url: `/comment/delete_comment/${id}`,
    method: 'delete',
  })
}


