<template>
  <div class="box">
    <form @submit.prevent="change(keywords)">
      <div class="input">
        <i></i>
        <input
          type="text"
          v-model="keywords"
          placeholder="搜索歌曲、歌手、专辑"
          @input="inputing = true"
        />
      </div>
    </form>
    <component :is="search" :keywords="keywords" @change="change"></component>
    <div class="history-box" v-if="this.$root.historyBox">
      <div class="history">
        历史记录<img @click="qingkong" src="../assets/qingkong.png" alt="" />
      </div>
      <ul class="list">
        <li v-for="(s, index) in this.$root.lishi" :key="index">
          <img class="lishi" src="../assets/lishi.png" alt="" />
          <span @click="change(s)">{{ s }}</span>
          <img
            @click="shanchu(index)"
            class="shanchu"
            src="../assets/shanchu.png"
            alt=""
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchSuggest from "@/components/SearchSuggest";
import HotSearch from "@/components/HotSearch";
import SearchResult from "@/components/SearchResult";
export default {
  name: "Search",
  data() {
    return {
      search: "HotSearch",
      keywords: "",
      inputing: false,
    };
  },
  created() {},
  methods: {
    qingkong() {
      this.$root.lishi = [];
      this.$root.historyBox = false;
    },
    shanchu(val) {
      this.$root.lishi.splice(val, 1);
      if (this.$root.lishi.length == 0) {
        this.$root.historyBox = false;
      } else {
        this.$root.historyBox = true;
      }
    },
    change(val) {
      this.keywords = val;
      this.inputing = false;
      this.search = "SearchResult";
      for (var i = 0; i < this.$root.lishi.length; i++) {
        if (this.$root.lishi[i] == this.keywords) {
          this.$root.lishi.splice(i, 1);
        }
      }
      this.$root.lishi.unshift(this.keywords);
      console.log(this.$root.lishi);
        this.$root.historyBox = false;
    },
  },
  watch: {
    keywords(val) {
      if (val == "") {
        this.search = "HotSearch";
      } else if (this.inputing) {
        this.search = "SearchSuggest";
      }
    },
  },
  components: {
    HotSearch,
    SearchSuggest,
    SearchResult,
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 50px;
  margin: 20px 10px 20px 10px;
  border-bottom: 1px solid #ddd;
}
.input {
  position: relative;
  width: 100%;
  height: 30px;
  padding: 0 30px;
  box-sizing: border-box;
  background: #ebecec;
  border-radius: 30px;
  display: flex;
  align-items: center;
  i {
    display: inline-block;
    width: 13px;
    height: 13px;
    background-image: url(../assets/search_icon.svg);
  }
  input {
    flex: 1;
    background-color: transparent;
    outline: none;
    border: none;
  }
}
.history {
  width: 94vw;
  height: 40px;
  border-top: 3px solid #efefef;
  font-size: 12px;
  margin-top: 2vh;
  line-height: 4vh;
  color: #666666;
  img {
    margin-top: 0.3vh;
    width: 16px;
    height: 16px;
    float: right;
  }
}
.list {
  margin-left: 2vw;

  li {
    width: 90vw;
    height: 32px;
    line-height: 16px;
    margin-bottom: 20px;
    border-bottom: 3px solid #efefef;
    .lishi {
      width: 16px;
      height: 16px;
      float: left;
      margin-right: 1vw;
    }

    .shanchu {
      width: 16px;
      height: 16px;
      float: right;
    }
  }
}
</style>
