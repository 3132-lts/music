<template>
    <div class="suggest">
        <div class="search">搜索"{{keywords}}"</div>
        <ul>
            <template v-if="suggestList.artists">
                <li v-for="(v) in suggestList.artists" :key="v.id" @click="$emit('change',v.name)">
                    <i></i>歌手:{{v.name}}
                </li>                
            </template>
            <template v-if="suggestList.albums">
                <li v-for="(v) in suggestList.albums" :key="v.id" @click="$emit('change',v.name)">
                    <i></i>专辑:{{v.name}}
                </li>                
            </template>
            <template v-if="suggestList.songs">
                
                <li v-for="(v) in suggestList.songs" :key="v.id" @click="$emit('change',v.name)">
                    <i></i>歌曲:{{v.name}}
                </li>                
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    name:"SearchSuggest",
    props:['keywords'],
    data(){
        return{
            suggestList:{}
        }
    },
    created(){
        this.loadSuggest(this.keywords);
    },
    watch:{
        keywords(val){
            this.loadSuggest(val);
        }
    },
    methods:{
        loadSuggest(val){
            this.$http.get('/search/suggest?keywords='+val+'&type=mobile').then(data=>{
                // this.suggestList=[];
                let result=data.data.result;
                // let orders=result.order;
                // for(var key in orders){
                //     this.suggestList=this.suggestList.concat(result[orders[key]]);
                // }
                this.suggestList=result;
            });
        }
    }
}
</script>

<style lang="less" scoped>
.search{
    margin-top: 20px;
    color: #507daf;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    
}
li{
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
}
i{
    display: inline-block;
    vertical-align:middle;
    margin: 0 10px 0 10px;
    width: 14px;
    height: 14px;
    background-image: url(../assets/search_icon.svg)
}
</style>
