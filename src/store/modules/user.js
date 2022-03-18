import { getUserInfo, login, logout } from '@/api/auth/auth'
import { getToken, removeToken, setToken } from '@/utils/auth'

const state = {
    token: getToken(), // token
    user: '', // 用户对象
    name: '',
    avatar: '',
    introduction: '',
    role: ''
}
const mutations = {
    SET_TOKEN_STATE: (state, token) => {
        state.token = token
    },
    SET_USER_STATE: (state, user) => {
        state.user = user
    },
}

const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        const { name, pass, rememberMe,code} = userInfo
        return new Promise((resolve, reject) => {
            login({ username: name.trim(), password: pass, rememberMe: rememberMe,code: code }).then(response => {
                const { data } = response
                commit('SET_TOKEN_STATE', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo(state.token).then(response => {
                const { data } = response
                if (!data) {
                    commit('SET_TOKEN_STATE', '')
                    commit('SET_USER_STATE', '')
                    removeToken()
                    resolve()
                    reject('Verification failed, please Login again.')
                }
                commit('SET_USER_STATE', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 注销
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(response => {
                console.log(response)
                commit('SET_TOKEN_STATE', '')
                commit('SET_USER_STATE', '')
                removeToken()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN_STATE', '')
            commit('SET_USER_STATE', '')
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

