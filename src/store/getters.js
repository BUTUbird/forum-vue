const getters = {
    token: state => state.user.token, //token
    user: state => state.user.user, //用户对象
    role: state => state.user.roles //权限
}
export default getters
