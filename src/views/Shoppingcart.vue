<template>
  <div class="shopCarPage">
    <div v-for="item in shopCarGoods" :key="item.name" class="shopCarFoods">
      <p>{{item.name}}*{{item.num}}</p>
      <div>
        <Icon type="ios-remove-circle-outline" @click="changeNum(item.name,-1)" />
        <span>{{item.num}}</span>
        <Icon type="md-add-circle" @click="changeNum(item.name,1)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    shopCarGoods() {
      return this.$store.getters.getShopcarGoods;
    }
  },
  methods: {
    changeNum(name, val) {
      this.$store.commit("changeNum", { name, val });
    }
  }
};
</script>

<style lang="less" scoped>
.shopCarFoods{
  display:flex;
  justify-content:space-between;
  padding: 20px;
  font-size: 20px;
  color:lightskyblue;
}
</style>