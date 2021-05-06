<template>
    <div class="result">
        <ul>
            <li v-for="(song,index) in result" :key="index">
                <SongItem :item="song" :keywords="keywords"></SongItem>
            </li>
        </ul>
        <Loading v-if="showLoading"></Loading>
        <p class="loadmore" @click="loadMore">加载更多</p>
        <div class="bottom"  v-if="$root.musicStore.musicID"></div>
    </div>
</template>

<script>
import SongItem from "@/components/SongItem"
import Loading from "@/components/Loading"
export default {
    name:"SearchResult",
    props:['keywords'],
    components:{
        SongItem,
        Loading
    },
    data(){
        return{
            result:[],
            page:1,
            showLoading:true,
        }
    },
    methods:{
        loadSearch(){
            this.$http.get('/search?keywords='+this.keywords+"&type=1&offset="+((this.page-1)*30)).then(data=>{
                this.result=this.result.concat(data.data.result.songs);
                for(var i = 0 ; i < this.result.length ; i++){
                    this.result[i].picUrl = data.data.result.songs[i].album.artist.img1v1Url;
                    // console.log( this.result[i])
                }
                this.showLoading=false;
            })
                console.log(this.result)
        },
        loadMore(){
            this.page++;
            this.showLoading=true;
            this.loadSearch();
        }
    },
    created(){
        this.loadSearch();
    }
}
</script>

<style lang="less" scoped>
    .result{
        padding: 20px 10px;
        p.loadmore{
            text-align: center;
        }
        .bottom{
            width: 100%;
            height: 42px;
        }
    }
</style>
