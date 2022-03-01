import request from "@/utils/request";

export function getList(){
    return request({
        url:'/promotion/list',
        method: 'get',
    })
}
