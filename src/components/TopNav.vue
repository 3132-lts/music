<template>
  <ul class="topnav" v-show="$route.meta.showNav">
    <li><router-link to="/recommend">推荐音乐</router-link></li>
    <li><router-link to="/hot">排行榜</router-link></li>
    <li @click="his"><router-link to="/search">搜索</router-link></li>
  </ul>
</template>
<script>
export default {
  name: "Topnav",
  methods: {
    his() {
      if (this.$root.lishi.length == 0) {
        this.$root.historyBox = false;
      } else {
        this.$root.historyBox = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.topnav {
  display: flex;
  border-bottom: 1px solid #ddd;
  position: fixed;
  z-index: 9;
  background-color: white;
  top: 0px;
  width: 100%;
  li {
    flex: 1;
    text-align: center;
    line-height: 40px;
    a {
      color: #000;
      display: inline-block;
      text-decoration: none;
      &.router-link-exact-active {
        color: #dd001b;
        border-bottom: 2px solid #dd001b;
      }
    }
  }
}
</style>
