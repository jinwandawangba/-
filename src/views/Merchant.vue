<template>
  <div class="Merchant">
    <div class="collect">
      <div>
        <p class="Mname">{{ merchantInfo.name}}</p>
        <p>
          <Rate disabled v-model="valueDisabled" />
          <span>(661)</span>
          <span>月售690单</span>
        </p>
      </div>
      <div>
        <Icon type="ios-heart" />
        <p>已收藏</p>
      </div>
    </div>
    <div class="sendPrice">
      <div>
        <p>起送价</p>
        <p>{{merchantInfo.minPrice}}</p>
      </div>
      <div>
        <p>商家配送</p>
        <p>{{merchantInfo.deliveryPrice}}</p>
      </div>
      <div>
        <p>平均配送时间</p>
        <p>{{merchantInfo.deliveryTime}}</p>
      </div>
    </div>
    <div class="bagd"></div>
    <ul>
      <li>
        <p class="notice">公告与活动</p>
        <p class="nChild">{{merchantInfo.bulletin}}</p>
      </li>
      <li v-for="item in merchantInfo.supports" :key="item.id">{{item.description}}</li>
    </ul>
    <div class="bagd"></div>
    <div class="photo">
      <p>商家实景</p>
      <div class="img">
        <img
          v-for="item in merchantInfo.pics"
          :key="item.id"
          :src="item"
          style="width:90px;height:100px;"
        />
      </div>
      <!-- <img src alt />
      <img src alt />-->
    </div>
    <div class="bagd"></div>
    <div class="information">
      <p>商家信息</p>
      <p v-for="item in merchantInfo.infos" :key="item.id">{{item}}</p>
    </div>
    <div class="end"></div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
export default {
  data() {
    return {
      valueDisabled: 4
    };
  },
  created() {
    getSeller().then(res => {
      console.log(this.$store.state.merchantInfo);
      this.$store.commit("initMerchant", res.data.data);
    });
  },
  computed: {
    merchantInfo() {
      return this.$store.state.merchantInfo;
    }
  }
};
</script>

<style lang="less" scoped>
.collect {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.sendPrice {
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  border-top: 1px solid #e4e4e4;
  p {
    text-align: center;
  }
}
.bagd {
  height: 25px;
  background-color: #f3f6f6;
  border-bottom: 1px solid #e6e9e9;
  border-top: 1px solid #e6e9e9;
}
.end {
  height: 100px;
}

.ivu-icon-ios-heart {
  font-size: 24px;
  color: #eb1711;
  padding-left: 5px;
}
.notice {
  font-size: 20px;
  color: #040e16;
}
ul {
  padding: 20px;
  list-style: none;
  li {
    border-bottom: 1px solid #e6e9e9;
    padding: 15px;
  }
}
.nChild {
  color: #eb1711;
  line-height: 30px;
}
.photo {
  padding: 15px;
  .img {
    display: flex;
    justify-content: space-around;
  }
  p{
    padding: 5px;
    font-size: 20px;
  }
}
.information{
  padding: 20px;
   line-height: 30px;
   p{
     border-bottom: 1px solid #e6e9e9;
     padding: 15px 0;
   }
}
.Mname{
  font-size: 24px;
  color: #040e16;
}
</style>