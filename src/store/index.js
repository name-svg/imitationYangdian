/**
 * Created by Administrator on 2019/9/29.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
           msg:{},
           pid:{},
           shop:[]
    },
  mutations:{
    pass1(state,x){
      return state.msg = x
    },
    pid1(state,y){
      return state.pid = y
    },
    sk1(state,z){
      return state.shop.push(z)
    }
  },
  actions:{
    pass(context,x){
      context.commit('pass1',x)
    },
    pid(context,y){
      context.commit('pid1',y)
    },
    sk(context,z){
      context.commit('sk1',z)
    }
  }

});
export default store
