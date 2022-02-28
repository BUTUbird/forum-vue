import request from "@/utils/request";

export function getBillBoard(){
    return request({
        url:'/billboard/show',
        method: 'get',
    })
}
