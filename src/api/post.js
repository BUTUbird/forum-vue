import request from '@/utils/request'

// 列表
export function getList(pageNo, size, tab) {
    return request(({
        url: '/post/list',
        method: 'get',
        params: { pageNo: pageNo, size: size, tab: tab }
    }))
}

// 列表
export function getLike(pageNo, size, id) {
    return request(({
        url: '/post/like',
        method: 'get',
        params: { pageNo: pageNo, size: size, id: id }
    }))
}

// 发布
export function post(topic) {
    return request({
        url: '/post/create',
        method: 'post',
        data: topic
    })
}

// 浏览
export function getTopic(id) {
    return request({
        url: `/post`,
        method: 'get',
        params: {
            id: id
        }
    })
}

// 获取详情页推荐
export function getRecommendTopics(id) {
    return request({
        url: '/post/recommend',
        method: 'get',
        params: {
            topicId: id
        }
    })
}
export function getHot() {
    return request({
        url: '/post/hot',
        method: 'get',
    })
}

export function update(topic) {
    return request({
        url: '/post/update',
        method: 'post',
        data: topic
    })
}

export function deleteTopic(id) {
    return request({
        url: `/post/delete/${id}`,
        method: 'delete'
    })
}
export function getPost(page, size) {
    return request({
        url: `/post/getAll`,
        method: 'get',
        params: {
            pageNo: page,
            size: size
        }
    })
}
export function deleteOne(id) {
    return request({
        url: `/post/deleteOne/${id}`,
        method: 'delete',
    })
}
export function detailOne(id) {
    return request({
        url: `/post/detailOne/${id}`,
        method: 'get',
    })
}

export function searchOne(page,size,keyword) {
    return request({
        url: '/post/searchOne',
        method: 'get',
        params: {
            pageNo: page,
            size: size,
            keyword: keyword
        }
    })
}
