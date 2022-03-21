import request from "@/utils/request";

export function getCarousel(){
    return request({
        url:'/carousel/show',
        method: 'get',
    })
}
export function getCarouselList(page, size) {
    return request({
        url: '/carousel/getAll',
        method: 'get',
        params: {
            pageNo: page,
            size: size
        }
    })
}
export function deleteOne(id) {
    return request({
        url: `/carousel/deleteOne/${id}`,
        method: 'delete',
    })
}
export function disableOne(id) {
    return request({
        url: `/carousel/disableOne/${id}`,
        method: 'get',
    })
}
export function ableOne(id) {
    return request({
        url: `/carousel/ableOne/${id}`,
        method: 'post',
    })
}
export function insertOne(carouselDTO) {
    return request({
        url: `/carousel/insertOne`,
        method: 'post',
        data:carouselDTO
    })
}
