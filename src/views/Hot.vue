<template>
  <div class="box">
    <h3 class="border-title"><slot>热门榜单</slot></h3>
    <div class="item" v-for="(li, index) in list" :key="index" @click="changeId(li.id)">
      <img :src="li.coverImgUrl" />
      <!-- <div>{{ li.name }}</div> -->
    </div>
    <div class="bottom"  v-if="$root.musicStore.musicID"></div>
  </div>
</template>

<script>
export default {
  name: "Hot",
  data() {
    return {
      list: [],
      listsongid: "",
    };
  },
  components: {},
  created() {
    this.toplist();
  },
  methods: {
    toplist() {
      this.$http.get("/toplist").then((data) => {
        this.list = data.data.list;
      });
    },
    changeId(listsongid) {
      this.listsongid = listsongid;
      this.$router.push({
        path: `/hots/${listsongid}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.border-title{
  width: 100%;
    padding-left: 5px;
    padding: 0px;
    line-height: 40px;
    &::before{
        content: '';
        height: 14px;
        display: inline-block;
        border-left: 3px solid #dd001b;
        padding-right: 10px;
    }
}
.box{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item{
    width: 30vw;
    display: inline-block;
    margin-bottom: 10px;
    flex-grow:0;
    // flex-wrap: wrap;
    
    img{
        width: 100%;
    }
}
.bottom{
    width: 100%;
    height: 42px;
}
</style>
