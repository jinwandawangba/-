import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
    state:{
        name:'张三',
        obj:{name:'李白',age:20},
        goodsList:[],
        talkList:[],
        merchantInfo:{},
    },
    // 改变，改变state的唯一方式
    mutations:{
        // 每一个改变函数都会接收一个state参数，指向上面的state
        initGoodsList(state,newArr){
            state.goodsList=newArr
        },
        initTalklist(state,newArr){
            state.talkList=newArr
        },
        initMerchant(state,newArr){
             state.merchantInfo=newArr
        }
    },
    getters:{
      addnum(state){
          for (let v of state.goodsList){
              for(let j of v.foods){
                  return j
              }
          }
      }
    }
})



export default store