import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
let musicStore = {
  musicID: null,
  musicList: [],
}

new Vue({
  data: {
    musicStore,
    lyric: null,
    plays: 'false',
    bgc: "zantin",
    l: "11px",
    w: "30px",
    h: "30px",
    t: "10px",
    lishi: [],
    historyBox: false
  },
  watch: {
    musicStore: {
      handler() {
        let musicID = this.musicStore.musicID;
        this.$http.get('lyric?id=' + musicID).then(data => {
          let lyricArr = data.data.lrc.lyric.split('\n');
          lyricArr.pop();
          let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
          let newLyric = lyricArr.map(d => {
            if (reg.test(d)) {
              return {
                time: parseInt(RegExp.$1 * 60) + parseFloat(RegExp.$2),
                lyric: RegExp.$3
              }
            }
          });
          this.lyric = newLyric;
        });
      },
      deep: true,
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
