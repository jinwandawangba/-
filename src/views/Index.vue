<template>
  <div class="index">
    <div class="header" :style="{backgroundImage:'url('+datas.avatar+')'}">
      <div class="hLeft">
        <img :src="datas.avatar" />
      </div>
      <div class="hRight">
        <div>
          <img src="../assets/brand@2x.png" alt class="imgOne" />
          <span class="shopName">{{datas.name}}</span>
        </div>
        <div>
          <span>{{datas.description}}</span>
          <span>/{{datas.deliveryTime}}分钟送达</span>
        </div>
        <div>
          <img src="../assets/decrease_1@2x.png" alt class="imgTwo" />
          <span>{{datas.supports[0].description}},满50减10</span>
        </div>
      </div>
    </div>
    <div class="tableChange">
      <router-link to="/goods"><span  @click='change(1)' :class='{activeOne:pass===1}'>商品</span></router-link>
      <router-link to="/evaluate" ><span @click='change(2)' :class='{activeOne:pass===2}'>评价</span></router-link>
      <router-link to="/merchant" ><span @click='change(3)' :class='{activeOne:pass===3}'>商家</span></router-link>
    </div>
    <!-- 路由容器 -->
    <router-view></router-view>
    <p class="shopCar">
      <i-col span="16" class="left">
        <div class="leftOne">
          <img src="../assets/01.png" alt />
        </div>
      </i-col>
      <i-col span="8" class="right">￥20起送</i-col>
    </p>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
export default {
  data() {
    return {
      datas: {
        supports: [{ description: "" }],
       },
       pass:1

    };
  },
  created() {
    getSeller().then(res => {
      this.datas = res.data.data;
    });
  },
  methods:{
   change(index){
     this.pass=index
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  .tableChange {
    display: flex;
    justify-content: space-around;
    height: 30px;
    line-height: 30px;
    .activeOne{
      color:red;
    }
  }
}

.header {
  height: 150px;
  background-color: #434242;
  display: flex;
  justify-content: flex-start;
  color: #ffffff;
  // filter:blur(4px);
}
.imgOne {
  width: 30px;
}
.imgTwo {
  width: 12px;
}
.hLeft img {
  width: 100px;
  margin-top: 25px;
  margin-left: 25px;
}
.hRight {
  margin-top: 6%;
  margin-left: 5%;
  line-height: 35px;
}

.shopName {
  font-size: 20px;
}

.shopCar {
  background-color: #131d27;
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  .left,
  .right {
    height: 200px;
    line-height: 50px;
    text-align: center;
  }
  .right {
    background-color: #2a353a;
  }

  .left {
    position: relative;
    .leftOne {
      height: 80px;
      width: 80px;
      position: absolute;
      top: -20px;
      left: 20px;
      line-height: 110px;
      background-color: #131d27;
      border-radius: 50%;

      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>