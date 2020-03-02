<template>
  <div class="Goods">
    <Row class="goodsOne">
      <i-col span="6" class="One">
        <p
          v-for="(item,index) in goodsList"
          :key="item.id"
          :class="{active:index==indexOne}"
          @click="clickTitle(index)"
        >
          <img v-show="item.type==1" src="../assets/discount_3@2x.png" alt />
          <img v-show="item.type==2" src="../assets/special_3@2x.png" alt />
          <!-- 左边商品名 -->
          {{ item.name }}
        </p>
      </i-col>
      <i-col span="18" class="Two">
        <ul class="content">
          <div v-for="(item,index) in goodsList" :key="item.id" :id="index">
            <div class="classify">{{ item.name }}</div>
            <li v-for="child in item.foods" :key="child.id">
              <div>
                <img :src="child.image" />
              </div>
              <div class="goodsInfo">
                <div>{{child.name}}</div>
                <!-- <div>{{child.description}}</div> -->
                <div>月销{{child.sellCount}}好评{{child.rating}}%</div>
                <div class="addNum">
                  <span>￥{{child.price}}</span>
                  <span>
                    <Icon type="ios-remove-circle-outline" v-show="child.num>0" />
                    <span v-show=" child.num>0">{{child.num}}</span>
                    <Icon type="md-add-circle" @click="addNum(child.num)" />
                  </span>
                </div>
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
import BScroll from "better-scroll";
export default {
  data() {
    return {
      indexOne: 0,
    };
  },
  created() {
    getGoods().then(res => {
      this.$store.commit("initGoodsList", res.data.data);
      console.log(this.$store.getters.addnum);
      // console.log(res); 
    });
  },
  mounted() {
    // 右侧滚动板
    // 右联左
    this.rightDiv = new BScroll(
      document.querySelector(".Two"),
      {
        probeType: 3 ,//实时派发滚动事件
        click:true //允许点击事件的发生
      }
    );
    this.rightDiv.on("scroll", ({ y }) => {
      let _y = Math.abs(y);
      for (let divObj of this.getDiv) {
        if (_y >= divObj.min && _y < divObj.max) {
          this.indexOne = divObj.index;
          // console.log(this.indexOne);
          return;
        }
      }
    });
  },
  methods: {
    // 左联右
    clickTitle(index) {
      this.indexOne = index;
      this.rightDiv.scrollToElement(document.getElementById(index), 600);
    },
    addNum(k) {
         if(k==0){
        this.$store.getters.addnum.num+=1
         }
    }
  },
  computed: {
    // 右联左
    getDiv() {
      let arr = [];
      let total = 0;
      for (let i = 0; i < this.goodsList.length; i++) {
        //由于高度和实际多了一像素，所以这里多减一像素
        let curDivheight = document.getElementById(i).offsetHeight - 1;
        arr.push({ min: total, max: total + curDivheight, index: i });
        total += curDivheight;
      }
      return arr;
    },
    goodsList() {
      return this.$store.state.goodsList;
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
  .One {
    img {
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
      justify-content: flex-start;
      height: 100px;
      line-height: 10px;
      padding-left: 20%;
      div {
        margin-top: 10px;
      }
    }
  }

  .goodsInfo {
    width: 100%;
    padding: 0 10px;
  }
  .classify {
    text-align: center;
    background-color: #f4f5f7;
    height: 21px;
  }

  .active {
    background-color: antiquewhite;
    border-right: 2px solid #fc9507;
  }

  .addNum {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .ivu-icon-ios-remove-circle-outline {
    font-size: 25px;
    color: #009fd8;
  }
  .ivu-icon-md-add-circle {
    font-size: 25px;
    color: #02a1dd;
  }
  .end{
    height: 500px;
  }
}
</style>