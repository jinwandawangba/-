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
        },
        // 改变商品数量
        changeNum(state,obj){
            for (let v of state.goodsList){
                for(let j of v.foods){
                    if(j.name==obj.name){
                        j.num+=obj.val
                    }
                }
            }
        }
    },
    getters:{
      getShopcarGoods(state){
        //   定义两个空数组去重
           let arr=[]
           let goodsName=[]

           for(let objType of state.goodsList){
               for(let food of objType.foods ){
                   if(food.num>0){
                       if(!goodsName.includes(food.name)){
                        //    如果后面数组内有相应名字就不push
                           arr.push(food)
                           goodsName.push(food.name)
                       }
                   }
               }
           }

           return arr
      }
    }
})



export default store