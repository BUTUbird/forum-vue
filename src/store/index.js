import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";
import getters from "@/store/getters";

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    wsData:[],
    MsgInfo:'',
  },
  getters,
  mutations: {
    setWebSocket(state,data){
      state.wsData = data;
    },
    SET_MSG_STATE: (state, MsgInfo) => {
      state.MsgInfo = MsgInfo
    },
  },
  actions: {
  },
  modules: {
    user
  },

})

