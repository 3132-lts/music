<template>
  <div>
    <div class="hotbg">
      <div class="top">
        <router-link :to="`/hot`">
          <img src="../assets/fanhui.png"/>
        </router-link>
      </div>
      <div class="date" v-if="playList">
        更新日期：{{ playList.updateTime | formatDate }}
      </div>
      <div class="u-hmsprtbig" :style="{backgroundImage:`url(${img})`}"></div>
      <div class="u-hmsprtsmall" :style="{backgroundImage:`url(${img})`}"></div>
      <!-- <div class="bjmb"></div> -->
    </div>
    <ul class="hotsong" v-if="hotSong.length > 0">
      <li v-for="(s, index) in hotSong" :key="s.id">
        <div class="idx">{{ index | ind }}</div>
        <SongItem class="px" :item="s"></SongItem>
      </li>
    </ul>
    <Loading v-if="isLoading"></Loading>
    <div class="loadingmore" @click="loadMore">加载更多</div>
    
  </div>
</template>

<script>
import SongItem from "@/components/SongItem";
import Loading from "@/components/Loading.vue";

export default {
  name: "Hot",
  data() {
    return {
      hotSong: [],
      playList: null,
      page: 1,
      isLoading: true,
      img: ""
    };
  },
  created() {
    this.loadMusic();
  },
  methods: {
    loadMusic() {
      this.$http
        .get("/playlist/detail?id="+this.$route.params.listsongid)
        .then((data) => {
          this.img = data.data.playlist.coverImgUrl;
          console.log(data.data.playlist.trackIds)
          let trackIDS = data.data.playlist.trackIds.slice(
            (this.page - 1) * 20,
            20 * this.page
          );
          this.playList = data.data.playlist;
          let ids = trackIDS.map((d) => {
            return d.id;
          });
          return ids.join(",");
        })
        .then((ids) => {
          this.$http.get("/song/detail?ids=" + ids).then((songData) => {
            this.isLoading = false;
            songData.data.songs.map((d) => {
              d.song = {
                artists: d.ar,
              };
              this.hotSong.push(d);
              return d;
            });
          });
        });
    },
    loadMore() {
      this.page++;
      if (this.page > 10) {
        return false;
      }
      this.isLoading = true;
      this.loadMusic();
    },
  },
  components: {
    SongItem,
    Loading,
  },
  filters: {
    ind(val) {
      val++;
      if (val < 10) {
        return "0" + val;
      } else {
        return val;
      }
    },
    formatDate(val) {
      let date = new Date(val);
      return date.getMonth() + 1 + "月" + date.getDate() + "日";
    },
  },
};
</script>

<style lang="less" scoped>
.hotbg {
  position: relative;
  height: 150px;
  width: 100vw;
  // background-image: url("../assets/hotbg.jpg");
  .top {
    width: 100%;
    height: 40px;
    img {
      position: absolute;
      z-index: 6;
      width: 20px;
      height: 20px;
      margin-top: 5px;
      margin-left: 10px;
    }
  }
  .u-hmsprtbig {
    width: 100%;
    height: 150px;
    background-size: 166px 97px;
    background: no-repeat;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
    background-position: -22px -27px
  }
  
  .u-hmsprtsmall {
    width: 145px;
    height: 72px;
    background-size: 166px 97px;
    position: absolute;
    top: 28px;
    left: 23px;
    z-index: 3;
    background-position: -10px -10px
  }
  .date {
    position: absolute;
    top: 112px;
    left: 26px;
    color: white;
    font-size: 12px;
    z-index: 3;
  }
  .bjmb {
    background-color: rgba(0, 0, 0, 0.1);
    height: 150px;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
}
.px {
  padding-right: 5px;
}
.loadingmore {
  text-align: center;
}
.idx {
  float: left;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  padding: 14px 12px;
}
.hotsong li:first-child .idx {
  font-size: 20px;
  color: orangered;
  padding: 11px 10px 11px;
}
.hotsong li:nth-child(2) .idx {
  font-size: 20px;
  color: orangered;
  padding: 11px 10px 11px;
}
.hotsong li:nth-child(3) .idx {
  font-size: 20px;
  color: orangered;
  padding: 11px 10px 11px;
}
</style>
