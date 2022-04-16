const getters = {
    token: state => state.user.token, //token
    user: state => state.user.user, //用户对象
    MsgInfo: state => state.MsgInfo, //消息对象
}
export default getters
