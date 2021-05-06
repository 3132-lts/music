<template>
  <transition
    enter-active-class="animate__animated animate__bounceIn"
    leave-active-class="animate__animated animate__bounceOut"
  >
    <div class="player" v-if="$root.musicStore.musicID">
      <audio
        :src="`https://music.163.com/song/media/outer/url?id=${$root.musicStore.musicID}.mp3`"
        autoplay
        @timeupdate="timeUpdate"
        ref="audio"
        @ended="nextSong"
      ></audio>
      <div class="playBar" v-if="$root.musicStore.musicID">
        <img
          class="blur"
          :src="
            $root.musicStore.currentMusic.picUrl +
            '?imageView&thumbnail=360y360&quality=75&tostatic=0'
          "
        />

        <div class="blurblack"></div>
        <div class="fullblack"></div>

        <div class="flot">
          <i ref="randImg"
            ><img
              :src="
                $root.musicStore.currentMusic.picUrl +
                '?imageView&thumbnail=360y360&quality=75&tostatic=0'
              "
          /></i>
          <i @click="picrun">{{ $root.musicStore.currentMusic.name }}</i>
          <i @click="changePlay">
            <canvas height="2000" width="2000" ref="processBtn"></canvas>
            <img
              class="playstop"
              :src="require(`../assets/${this.$root.bgc}.png`)"
              :style="{
                left: `${this.$root.l}`,
                top: `${this.$root.t}`,
                width: `${this.$root.w}`,
                height: `${this.$root.h}`,
              }"
            />
          </i>
        </div>
      </div>
      <transition
        enter-active-class="animate__animated animate__slideInUp"
        leave-active-class="animate__animated animate__slideOutDown"
      >
        <div class="fullPage" v-if="isfullPage">
          <img
            class="blurfullPage"
            :src="
              $root.musicStore.currentMusic.picUrl +
              '?imageView&thumbnail=360y360&quality=75&tostatic=0'
            "
          />

          <div class="fullblurblack"></div>
          <div class="fullblackblur"></div>
          <div class="top">
            <img
              class="back"
              @click="isfullPage = false"
              src="../assets/fanhui.png"
            />
            <div class="name">{{ $root.musicStore.currentMusic.name }}</div>
            <img class="gave" src="../assets/fenxiang.png" />
          </div>
          <div ref="songImg" class="songImgone">
            <img
              :src="
                $root.musicStore.currentMusic.picUrl +
                '?imageView&thumbnail=360y360&quality=75&tostatic=0'
              "
            />
          </div>
          <div class="lyric" v-if="this.$root.lyric">
            <ul :style="obj">
              <li
                v-for="(l, index) in this.$root.lyric"
                :key="index"
                :class="{ active: currentIdx == index }"
              >
                {{ l.lyric }}
              </li>
            </ul>
          </div>
          <div class="progress">
            <div>{{ currentTime | timestyle }}</div>
            <input
              type="range"
              min="0"
              :max="duration"
              :value="currentTime"
              @change="changeTime"
            />
            <i
              :style="{
                width: `${(currentTime / duration) * 60}vw`,
              }"
            ></i>
            <div>{{ duration | timestyle }}</div>
          </div>
          <div class="controlBar">
            <img
              v-show="playfs == 'sxbf'"
              @click="playfs = 'sjbf'"
              class="sxbf"
              src="../assets/shunxubofang.png"
            />
            <img
              v-show="playfs == 'sjbf'"
              @click="playfs = 'dqxh'"
              class="sxbf"
              src="../assets/suijibofang.png"
            />
            <img
              v-show="playfs == 'dqxh'"
              @click="playfs = 'sxbf'"
              class="sxbf"
              src="../assets/danquxunhuan.png"
            />
            <img
              class="sys"
              @click="prevSong"
              src="../assets/shangyishou.png"
            />
            <div @click="changePlay">
              <img
                class="playstopone"
                :src="require(`../assets/${this.$root.bgc}.png`)"
              />
            </div>
            <img class="xys" @click="nextSong" src="../assets/xiayishou.png" />
            <img
              @click="playList = !playList"
              class="gd"
              src="../assets/gedan.png"
            />
          </div>
          <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <div v-show="playList" @click="playL" class="mb"></div>
          </transition>
          <transition
            enter-active-class="animate__animated animate__fadeInUp"
            leave-active-class="animate__animated animate__fadeOutDown"
          >
            <div v-show="playList" class="playList">
              <ul>
                <li
                  @click="playMusic(v)"
                  v-for="v in $root.musicStore.musicList"
                  :key="v.id"
                  :style="{
                    color: v.id == $root.musicStore.musicID ? 'red' : '',
                  }"
                >
                  {{ v.name }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Play",
  data() {
    return {
      isPlay: true,
      isfullPage: false,
      duration: 0,
      currentTime: 0,
      currentIdx: 0,
      obj: {
        transform: "translateY(250px)",
      },
      playfs: "sxbf",
      playList: false,
    };
  },
  methods: {
    playL() {
      if (this.playList) {
        this.playList = false;
      }
    },
    playMusic(item) {
      this.$root.musicStore.musicID = item.id;
      this.$root.musicStore.currentMusic = item;
    },
    prevSong() {
      let currentIndex = 0;
      let musicList = this.$root.musicStore.musicList;
      for (let i in musicList) {
        if (musicList[i].id === this.$root.musicStore.musicID) {
          currentIndex = i;
          break;
        }
      }
      currentIndex--;
      if (this.playfs == "sjbf") {
        currentIndex = parseInt(musicList.length * Math.random());
      }
      if (currentIndex < 0) {
        currentIndex = musicList.length - 1;
      }
      this.$root.musicStore.musicID = musicList[currentIndex].id;
      this.$root.musicStore.currentMusic = musicList[currentIndex];
    },
    nextSong() {
      let currentIndex = 0;
      let musicList = this.$root.musicStore.musicList;
      for (let i in musicList) {
        if (musicList[i].id === this.$root.musicStore.musicID) {
          currentIndex = i;
          break;
        }
      }
      currentIndex++;
      if (this.playfs == "sjbf") {
        currentIndex = parseInt(musicList.length * Math.random());
      }
      if (currentIndex > musicList.length - 1) {
        currentIndex = 0;
      }
      this.$root.musicStore.musicID = musicList[currentIndex].id;
      this.$root.musicStore.currentMusic = musicList[currentIndex];
    },
    picrun() {
      this.isfullPage = true;
      // let songImg = null;
      // if(this.isfullPage){
      //   songImg = this.$refs.songImg;
      // }
      // if(this.$root.plays == false) songImg.style.animationPlayState = "paused";
    },
    changeTime(event) {
      let time = event.target.value;
      this.currentTime = time;
      this.$refs.audio.currentTime = this.currentTime;
    },
    changePlay() {
      let audio = this.$refs.audio;
      let randImg = this.$refs.randImg;
      let songImg = null;
      if (this.isfullPage) {
        songImg = this.$refs.songImg;
      }
      if (this.$root.plays == true) {
        audio.pause();
        this.isPlay = false;
        this.$root.plays = false;
        this.$root.bgc = "bofang";
        this.$root.l = "15px";
        this.$root.w = "25px";
        this.$root.h = "25px";
        this.$root.t = "12px";
        randImg.style.animationPlayState = "paused";
        if (this.isfullPage && !this.$root.plays)
          songImg.style.animationPlayState = "paused";
      } else {
        audio.play();
        this.isPlay = true;
        this.$root.plays = true;
        this.$root.bgc = "zantin";
        this.$root.l = "11px";
        this.$root.w = "30px";
        this.$root.h = "30px";
        this.$root.t = "10px";
        randImg.style.animationPlayState = "running";
        if (this.isfullPage && this.$root.plays)
          songImg.style.animationPlayState = "running";
      }
    },
    timeUpdate(event) {
      let audio = event.target;
      let currentTime = audio.currentTime;
      let duration = audio.duration;
      this.currentTime = currentTime;
      this.duration = duration;
      this.drawCircle(currentTime, duration);
      let playTime = event.target.currentTime;

      for (var i = 0; i < this.$root.lyric.length; i++) {
        if (
          this.$root.lyric[i].time < playTime &&
          playTime < this.$root.lyric[i + 1].time
        ) {
          this.currentIdx = i;
          this.obj.transform = "translateY(" + (16.3 - (i + 1) * 3.25) + "vh)";
          break;
        }
      }
    },
    drawCircle(currentTime, duration) {
      let canvas = this.$refs.processBtn.getContext("2d");
      canvas.beginPath();
      canvas.strokeStyle = "gray";
      canvas.lineWidth = 150;
      canvas.arc(1000, 1000, 850, 0, 2 * Math.PI);

      canvas.stroke();
      canvas.closePath();

      canvas.beginPath();
      canvas.strokeStyle = "#2d2d2d";
      canvas.lineWidth = 150;
      canvas.arc(
        1000,
        1000,
        850,
        0,
        2 * Math.PI * parseFloat(currentTime / duration)
      );
      canvas.stroke();
      canvas.closePath();
    },
  },
  filters: {
    timestyle(value) {
      let formatStr = Math.floor(value);
      let mm = Math.floor(formatStr / 60);
      let ss = formatStr % 60;
      if (mm < 10) {
        mm = "0" + mm;
      }
      if (ss < 10) {
        ss = "0" + ss;
      }
      if (formatStr < 60) {
        formatStr = "00:" + ss;
      } else {
        formatStr = mm + ":" + ss;
      }
      return formatStr;
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.blur {
  width: 100vw;
  height: 50px;
  filter: blur(20px);
  -webkit-filter: blur(20px);
  -ms-filter: blur(20px);
  -moz-filter: blur(20px);
  position: absolute;
  bottom: 0;
  z-index: -2;
  transform: scale(1.5);
  overflow: hidden;
}
.blurblack {
  width: 100vw;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.fullblack {
  width: 100vw;
  height: 60px;
  background-color: rgb(139, 138, 138);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -3;
}
.player {
  position: fixed;
  z-index: 9;
  bottom: 0px;
  width: 100%;
  audio {
    height: 50px;
  }
  .playBar {
    position: relative;
    overflow: hidden;
    .flot {
      display: flex;
      align-items: center;
      padding: 5px 10px;
      i {
        &:first-of-type {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          overflow: hidden;
          animation: randImg 10s linear 0s infinite;
        }
        &:nth-of-type(2) {
          flex: 1;
          font-size: 14px;
          height: 50px;
          line-height: 50px;
          font-style: normal;
          text-align: center;
          font-size: normal;
        }
        &:last-of-type {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          position: relative;
          .playstop {
            background-size: contain;
            z-index: 19;
            position: absolute;
          }
          canvas {
            width: 50px;
            height: 50px;
          }
        }
      }
    }
  }
  .fullPage {
    width: 100vw;
    height: 100vh;
    position: relative;
    .top {
      display: -webkit-flex;
      display: flex;
      -webkit-justify-content: space-around;
      justify-content: space-around;
      .back {
        width: 5vh;
        height: 5vh;
        margin-top: 2vh;
      }
      .name {
        width: 70vw;
        font-size: 20px;
        margin-top: 2vh;
        text-align: center;
        color: white;
      }
      .gave {
        width: 4.3vh;
        height: 4.3vh;
        margin-top: 2.3vh;
        margin-right: 1.4vh;
      }
    }
    .blurfullPage {
      width: 100%;
      height: 100%;
      filter: blur(20px);
      -webkit-filter: blur(20px);
      -ms-filter: blur(20px);
      -moz-filter: blur(20px);
      position: absolute;
      bottom: 0;
      z-index: -2;
    }
    .fullblurblack {
      width: 100vw;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .fullblackblur {
      width: 100vw;
      height: 100%;
      background-color: rgb(139, 138, 138);
      position: absolute;
      top: 0;
      left: 0;
      z-index: -3;
    }
    .songImgone {
      width: 30vh;
      height: 30vh;
      border-radius: 50%;
      overflow: hidden;
      animation: randImg 20s linear 0s infinite;
      margin: 10vh auto 6vh;
    }
    .lyric {
      height: 29vh;
      width: 80vw;
      margin: auto;
      overflow: hidden;
      text-align: center;
      ul > li {
        color: rgb(255, 255, 255);
        list-style: none;
        text-align: center;
        font-size: 2.5vh;
      }
      .active {
        color: rgb(238, 23, 23);
      }
    }
    .progress {
      margin: 4vh auto 2vh;
      font-size: 18px;
      display: -webkit-flex;
      display: flex;
      -webkit-justify-content: space-around;
      justify-content: space-around;
      position: relative;
      input {
        width: 60vw;
        appearance: none;
        -webkit-appearance: none;
        background: transparent;
        position: relative;
        z-index: 2;
        &::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          margin-top: -5px;
          border-radius: 50%;
          background: violet;
        }
        &::-webkit-slider-runnable-track {
          appearance: none;
          height: 10px;
          -webkit-appearance: none;
          border-radius: 5px;
          background: rgba(red, 0, 0, 1);
          box-shadow: inset 0px 10px 10px rgba(255, 255, 255, 0.3);
        }
      }
      i {
        position: absolute;
        width: 50px;
        height: 10.5px;
        background: skyblue;

        box-shadow: inset 0px 10px 10px pink;
        left: 20vw;
        top: 6.5px;
        z-index: 1;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      div {
        color: white;
      }
    }

    .controlBar {
      display: -webkit-flex;
      display: flex;
      -webkit-justify-content: space-around;
      justify-content: space-around;
    }
    .playstopone {
      width: 5vh;
      height: 5vh;
      float: left;
    }
    .sxbf {
      width: 5vh;
      height: 5wh;
      float: left;
    }
    .sys {
      width: 5vh;
      height: 5wh;
      float: left;
    }

    .xys {
      width: 5vh;
      height: 5wh;
      float: left;
    }
    .gd {
      width: 5vh;
      height: 5wh;
      float: left;
    }
    .mb {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2;
    }
    .playList {
      height: 50vh;
      width: 90vw;
      overflow-y: auto;
      border: 2px solid gray;
      position: absolute;
      border-radius: 20px;
      bottom: 9vh;
      right: 4vw;
      background: rgba(0, 0, 0);
      color: white;
      z-index: 3;
      ul > li {
        padding: 2vw 5vw;
      }
    }
  }
}
@keyframes randImg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>