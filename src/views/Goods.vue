<template>
  <div class="Goods">
    <Row class="goodsOne">
      <i-col span="6" class="One">
        <p   v-for="(item,index) in datas" :key="item.id" :class="{active:index==indexOne}" @click='clickTitle(index)' >
          <img v-show='item.type==1'  src="../assets/discount_3@2x.png" alt="">
          <img v-show="item.type==2"   src="../assets/special_3@2x.png" alt="">
          <!-- 左边商品名 -->
          {{ item.name }}
        </p>
      </i-col>
      <i-col span="18" class="Two">
        <ul class="content">
          <div v-for="(item,index) in datas" :key="item.id" :id="index">
            <div class="classify">{{ item.name }}</div>
            <li v-for="child in item.foods" :key="child.id">
              <div>
                <img :src="child.image" />
              </div>
              <div class="goodsInfo">
                <div>{{child.name}}</div>
                <!-- <div>{{child.description}}</div> -->
                <div>月销{{child.sellCount}}好评{{child.rating}}%</div>
                <div>￥{{child.price}}</div>
              </div>
            </li>
          </div>
        </ul>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { getGoods } from "../api/apis";
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      datas:[],
      indexOne:0,
    };
  },
  created() {
    getGoods().then(res => {
      console.log(res);
      this.datas = res.data.data;
    });
  },
  mounted(){
    // 右侧滚动板
    this.rightDiv=new BScroll(document.querySelector('.Two'),{
      probeType:3 //实时派发滚动事件
    });
    this.rightDiv.on('scroll',( {y} )=>{
       let _y=Math.abs(y)
       for(let divObj of this.getDiv){
         if(_y>=divObj.min && _y<divObj.max){
           this.indexOne=divObj.index
           return
         }
       }
    })

  },
  methods:{
    clickTitle(index){
     this.indexOne=index
     this.rightDiv.scrollToElement(document.getElementById(index),600)
    }
  },
  computed:{
  getDiv(){
    let arr=[]
    let total=0
    for(let i=0;i<this.datas.length;i++){
      let curDivheight=document.getElementById(i).offsetHeight
      arr.push({min:total,max:total+curDivheight,index:i})
      total+=curDivheight
    }
    console.log(arr)
    return arr 
  }
  }
};
</script>

<style lang="less" scoped>
.goodsOne {
  height: 100%;
  max-height: 1100px;
  .One,
  .Two {
    height: 100%;
  }
  .One{
    img{
      width: 12px;
    }
  }
  .Two {
    max-height: 600px;
    overflow-y: scroll;
  }
  p {
    height: 50px;
    width: 90%;
    margin-left: 5%;
    border-bottom: 1px solid #ccc;
    // line-height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
  ul {
    list-style: none;
    img {
      width: 80px;
      height: 80px;
    }

    li {
      display: flex;
      justify-content:flex-start;
      height: 100px;
      line-height: 10px;
      padding-left: 20%;
      div {
        margin-top: 10px;
      }
    }
  }

  .goodsInfo {
    padding-left: 10px;
  }
  .classify {
    text-align: center;
    background-color: #f4f5f7;
  }

  .active{
    background-color: antiquewhite;
  }
}
</style>