import request from "@/utils/request";

export function upload(file) {
    return request({
        url: '/upload',
        method: 'post',
        data: file
    })
}
