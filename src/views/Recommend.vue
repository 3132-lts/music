<template>
    <div>
        <BorderTitle>推荐歌单</BorderTitle>
        <ul class="songlist">
            <ListItem v-for="sl in songList" :key="sl.id" :item="sl"></ListItem>
        </ul>
        <Loading v-if="!songList"></Loading>
        <BorderTitle>最新音乐</BorderTitle>
        <ul class="newsong" v-if="newSong.length">
            <li v-for="s in newSong" :key="s.id">
                <SongItem :item="s" @add-list="addMusicList(newSong)"></SongItem>
            </li>
        </ul>
        <Loading v-if="!newSong"></Loading>
    </div>
</template>

<script>
import BorderTitle from '@/components/BorderTitle'
import ListItem from '@/components/ListItem'
import SongItem from '@/components/SongItem'
import Loading from '@/components/Loading'
export default {
    name:"recommend",
    components:{
        BorderTitle,
        ListItem,
        SongItem,
        Loading
    },
    data(){
        return{
            songList:[],
            newSong:[],
        }
    },
    methods:{
        addMusicList(newSong){
            let newArr=this.$root.musicStore.musicList;
            newSong.map(d=>{
                let find = false;
                for(let n of newArr){
                    if(n.id==d.id){
                        find=true;
                        break;
                    }
                }
                if(!find) newArr.push(d);
            });
            this.$root.musicStore.musicList=newArr;
        }
    },
    created(){
        this.$http.get('/personalized?limit=6').then(data=>{
            this.songList=data.data.result;
        }).catch(err=>{
            console.log(err) ;
        });
        this.$http.get('personalized/newsong?limit=20').then(data=>{
            this.newSong=data.data.result;
        }).catch(err=>{
            console.log(err) ;
        });
    }
}
</script>

<style lang="less" scoped>
.songlist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    li{
        width: 33%;
    }
}
.newsong{
    padding: 10px 10px;
}

</style>
