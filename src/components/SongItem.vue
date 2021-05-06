<template>
  <div class="songItem">
    <div class="left">
      <h3 v-html="$options.filters.highLight(item.name, keywords)"></h3>
      <p>
        <template v-if="item.ar">
          - {{ item.ar[0].name }}
        </template>
        <template v-else-if="item.song">
          - {{ item.song.artists[0].name }}
        </template>
        <template v-else>
          - {{ item.name }}
        </template>
      </p>
    </div>
    <span class="playbtn" @click="play(item)"></span>
  </div>
</template>
<script>
export default {
  name: "SongItem",
  props: ["item", "keywords"],
  methods:{
    play(item){
      this.$root.musicStore.musicID=item.id;
      this.$root.musicStore.currentMusic=item;
      if(this.$root.musicStore.currentMusic.picUrl == undefined){
        this.$root.musicStore.currentMusic.picUrl = item.al.picUrl;
      }

      // console.log(this.$root.musicStore.currentMusic.picUrl);

      this.$root.plays=true;
      this.$root.bgc="zantin";
      this.$root.l="11px";
      this.$root.w="30px";
      this.$root.h="30px";
      this.$root.t="10px";
      
      let newArr = this.$root.musicStore.musicList;      
      let find=false;
      for(let n of newArr){
        if(n.id==item.id){
          find=true;
        }
      }
      if(!find) this.$root.musicStore.musicList.unshift(item);
      
      this.$emit('add-list');
    }
  },
  filters: {
    highLight(val, keywords) {
      if(typeof keywords == 'undefined'){
        return val;
      }
      let reg = new RegExp(keywords, "g");
      if (reg.test(val)) {
        return val.replace(
          reg,
          '<span style="color:red;">' + keywords + "</span>"
        );
      }
      return val;
    },
  },
};
</script>
<style lang="less" scoped>
.songItem {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 6px 0px;
  .left {
    flex: 1;
    h3 {
      color: #333;
    }
    p {
      color: #aaa;
      font-size: 12px;
    }
  }
  .playbtn {
    width: 22px;
    height: 22px;
    background: url(../assets/index_icon.png) no-repeat -24px 0px;
    background-size: 166px 97px;
  }
}
</style>