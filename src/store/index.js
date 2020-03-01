import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
    state:{
        name:'张三',
        obj:{name:'李白',age:20}
    },
    // 改变，改变state的唯一方式
    mutations:{
        // 每一个改变函数都会接收一个state参数，指向上面的state
        changeName(state,name){
            state.name=name
        }
    }
})
// 参数一，要触发的参数名字，要传入的参数
store.commit('changeName','杜甫')
console.log(store.state.name)