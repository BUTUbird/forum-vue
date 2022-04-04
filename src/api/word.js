import request from '@/utils/request'




export function getWord(page, size) {
    return request({
        url: '/word/getAll',
        method: 'get',
        params: {
            pageNo: page,
            size: size
        }
    })
}
export function deleteOne(id) {
    return request({
        url: `/word/deleteOne/${id}`,
        method: 'delete',
    })
}

export function insertOne(data) {
    return request({
        url: '/word/insertOne',
        method: 'post',
        data: data
    })
}
