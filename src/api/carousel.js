import request from "@/utils/request";

export function getCarousel(){
    return request({
        url:'/carousel/show',
        method: 'get',
    })
}
