import request from "@/utils/request";
import store from '@/store/index';
import ElementUI  from "element-ui";
export function initWebSocket(e){
    const wsUri = process.env.VUE_APP_WEBSOCKET_URL  + e;
    this.socket = new WebSocket(wsUri);
    this.socket.onopen = websocketOnOpen;
    this.socket.onerror = webSocketOnError;
    this.socket.onmessage = webSocketOnMessage;
    this.socket.onclose = closeWebsocket;
}
function webSocketOnError(e) {
    ElementUI.Notification({
        title: "",
        message: "WebSocket连接发生错误" + e,
        type: "error",
        duration: 0,
    });
}
function websocketOnOpen() {
    console.log("websocket打开成功");
}
function webSocketOnMessage(e) {
    console.log("发送消息");
    let data = JSON.parse(e.data);
    console.log(data);
    localStorage.setItem("Msg",JSON.stringify(data))
    store.commit("SET_MSG_STATE",data)

}
// 关闭websocket
function closeWebsocket() {
    console.log("连接已关闭...");
}
function close() {
    // this.socket.close(); // 关闭 websocket
    this.socket.onclose = function(e) {
        console.log(e); //监听关闭事件
        console.log("关闭");
    };
}
function webSocketSend() {
    // 发送参数
    this.socket.send();
}
export default {
    initWebSocket,
    webSocketSend,
    close,
};
export function initWebSocketData() {
    return request({
        url: '/user/initWebSocketData',
        method: 'get',
    })
}
