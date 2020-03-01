<template>
  <div class="Evaluate">
    <div class="score">
      <div class="scoreLeft">
        <p class="pOne">3.9</p>
        <p class="pTwo">综合评分</p>
        <p>高于周边商家69.2%</p>
      </div>
      <div class="scoreRight">
        <p>
          <span class="pTwo">服务态度:</span>
          <Rate disabled v-model="valueDisabled" />
          <span>3.9</span>
        </p>
        <p>
          <span class="pTwo">服务态度:</span>
          <Rate disabled v-model="valueDisabled" />
          <span>4.0</span>
        </p>
        <p>
          <span class="pTwo">送达时间:</span>
          <span>44分钟</span>
        </p>
      </div>
    </div>
    <div class="degree">
      <Button type="primary">全部</Button>
      <Button type="info">满意</Button>
      <Button>不满意</Button>
    </div>
    <div class="see">
      <Icon type="md-checkmark-circle"  size='25'/>
      <label>只看有内容的评价</label>
    </div>
    <div class="userEva" v-for="item in datas" :key="item.id">
      <div>
        <img :src="item.avatar" alt />
      </div>
      <div class="evalution">
        <p class="lbP">
          <label>{{item.username}}</label>
          <label>{{item.rateTime}}</label>
        </p>
        <p>
          <Rate disabled v-model="valueDisabled" />
          {{item.deliveryTime}}分钟送达
        </p>
        <p>{{item.text}}</p>
        <span v-for="child in item.recommend" :key="child.id">{{child}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings } from "../api/apis";
export default {
  data() {
    return {
      datas: [],
      valueDisabled: 4
    };
  },
  created() {
    getRatings().then(res => {
      // console.log(res);
      this.datas = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.score {
  display: flex;
  justify-content: space-around;
  border-bottom: 15px solid #f4f5f7;
  padding-bottom: 15px;
  .scoreLeft {
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    padding-top: 20px;
    .pOne {
      font-size: 30px;
      color: coral;
    }
  }
  .pTwo {
    font-weight: 600;
  }

  .scoreRight {
    font-size: 12px;
  }
}
.degree {
  margin-top: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f4f5f7;
  button {
    margin-left: 15px;
  }
}
.see {
  padding: 10px 0;
  text-indent: 1em;
  border-bottom: 1px solid #f4f5f7;
}
.userEva {
  display: flex;
  justify-content: flex-start;
  padding: 15px 10px;
  border-bottom: 1px solid #f4f5f7;
  img {
    width: 50px;
    border-radius: 25px;
  }
}
.lbP {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.evalution {
  width: 100%;
}
</style>