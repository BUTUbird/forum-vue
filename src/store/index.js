import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";
import getters from "@/store/getters";

Vue.use(Vuex)



// export default new Vuex.Store({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//     user
//   },
//
// })
const store = new Vuex.Store({
  modules: {
    user
  },
  getters
})

export default store
