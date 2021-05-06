<template>
  <div>
    <div class="top-box">
      <div class="top">
        <img @click="back" src="../assets/fanhui.png" />
      </div>
      <img :src="coverImg" class="img1" />
      <img :src="coverImg" class="img2" />
      <div class="name">{{ name }}</div>
      <div class="description">{{ description }}</div>
    </div>
    <div class="songlistname">歌曲列表</div>
    <ul class="songlist">
      <li v-for="s in songList" :key="s.id">
        <SongItem :item="s"></SongItem>
      </li>
    </ul>
    <Loading v-if="isLoading"></Loading>
    <div class="loadingmore" @click="loadMore">加载更多</div>
    <h3 class="border-title"><slot>最新评论</slot></h3>
    <div class="pl-box" v-for="(pl, index) in plarray" :key="index">
      <img :src="pl.user.avatarUrl" />
      <div class="text-box">
        <div class="username">{{ pl.user.nickname }}:</div>
        <div class="content">{{ pl.content }}</div>
        <div class="time">{{ pl.time | timelate }}</div>
      </div>
      <img
        @click="plarray[index].liked = true"
        v-show="!plarray[index].liked"
        class="zan"
        src="../assets/zan.png"
        alt=""
      />
      <img
        @click="plarray[index].liked = false"
        v-show="plarray[index].liked"
        class="zan"
        src="../assets/hzan.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem";
import Loading from "@/components/Loading";
export default {
  data() {
    return {
      listID: null,
      songListod: [],
      songList: [],
      musicID: null,
      coverImg: null,
      name: null,
      description: null,
      plarray: [],
      isLoading: false,
      page: 1,
    };
  },
  created() {
    this.dateMusic();
  },
  methods: {
    dateMusic() {
      this.listID = this.$route.params.id;
      this.$http.get("/playlist/detail?id=" + this.listID).then((data) => {
        this.songListod = data.data.playlist.trackIds;
        this.coverImg = data.data.playlist.coverImgUrl;
        this.name = data.data.playlist.name;
        this.description = data.data.playlist.description;
        for (var i = 10*(this.page-1); i < 10 * this.page && i < this.songListod.length; i++) {
          this.$http
            .get("/song/detail?ids=" + this.songListod[i].id)
            .then((data) => {
              // console.log(data.data.songs[0])
              this.songList.push(data.data.songs[0]);
            });
        }
        // console.log( this.songList);
      });
      this.$http.get("/comment/playlist?id=" + this.listID).then((data) => {
        // console.log("歌单评论", data);
        this.plarray = data.data.comments;
      });
    },
    back() {
      this.$router.back();
    },
    loadMore() {
      this.isLoading = true;
      this.page++;
      if (this.page > 20) {
        return false;
      }
      
      this.dateMusic();
          this.isLoading = false;
    },
  },
  components: {
    SongItem,
    Loading,
  },
  filters: {
    timelate(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDay();
      let h = date.getHours();
      let min = date.getMinutes();
      let s = date.getSeconds();
      let datenow = new Date();
      let ynow = datenow.getFullYear();
      let mnow = datenow.getMonth();
      let dnow = datenow.getDay();
      let hnow = datenow.getHours();
      let minnow = datenow.getMinutes();
      let snow = datenow.getSeconds();
      if (y < ynow) {
        return ynow - y + "年前";
      } else if (m < mnow) {
        return mnow - m + "个月前";
      } else if (d < dnow) {
        return dnow - d + "天前";
      } else if (h < hnow) {
        return hnow - h + "小时前";
      } else if (min < minnow) {
        return minnow - min + "分钟前";
      } else if (s < snow) {
        return snow - s + "秒前";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.songlist {
  margin: 0 10px 0;
}
.top-box {
  height: 35vh;
  width: 100vw;
  position: relative;
  background-color: rgba(0, 0, 0, 0.25);
  overflow: hidden;
  .top {
    width: 100%;
    height: 40px;
    img {
      position: absolute;
      z-index: 2;
      width: 30px;
      height: 30px;
      margin-top: 5px;
      margin-left: 10px;
    }
  }
  .img1 {
    height: 35vh;
    width: 100vw;
    filter: blur(20px);
    -webkit-filter: blur(20px);
    -ms-filter: blur(20px);
    -moz-filter: blur(20px);
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(1.5);
  }
  .img2 {
    height: 18vh;
    width: 18vh;
    border-radius: 30px;
    position: absolute;
    top: 7vh;
    left: 2vh;
  }
  .name {
    font-size: 20px;
    color: rgb(246, 247, 240);
    position: absolute;
    top: 8vh;
    left: 22vh;
  }
  .description {
    width: 30vh;
    height: 8vh;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    overflow: hidden;
    font-size: 14px;
    color: rgb(63, 65, 66);
    position: absolute;
    top: 16vh;
    left: 22vh;
  }
}
.songlistname {
  height: 22px;
  width: 100vw;
  line-height: 22px;
  font-size: 12px;
  color: #949595;
  padding-left: 2vw;
  background-color: #eeeff0;
}
.border-title {
  padding-left: 5px;
  padding: 0px;
  line-height: 40px;
  &::before {
    content: "";
    height: 14px;
    display: inline-block;
    border-left: 3px solid #dd001b;
    padding-right: 10px;
  }
}
.pl-box {
  width: 100%;
  height: 80px;
  position: relative;
  .text-box {
    float: left;
  }
  .text-box > div {
    margin-bottom: 3px;
  }
  img {
    width: 66.6px;
    height: 66.6px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
    float: left;
  }
  .username {
    color: #85b9e6;
  }
  .content {
    width: 70vw;
    // background-color: red;
    height: 20.8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .time {
    color: gray;
    font-size: 10px;
  }
  .zan {
    width: 30px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    top: 18.3px;
    right: 0px;
  }
}
.loadingmore {
  text-align: center;
}
</style>