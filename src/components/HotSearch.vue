<template>
    <div>
        <ul class="hotSearch">
            <div>热门搜索</div>
            <li v-for="(hot,index) in hotSearch" :key="index" @click="$emit('change',hot.first)"><span>{{hot.first}}</span></li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"HotSearch",
    data(){
        return{
            hotSearch:[]
        }
    },
    created(){
        this.$http.get("/search/hot").then(data=>{
            this.hotSearch = data.data.result.hots;
        })
    }   
}
</script>
<style lang="less" scoped>
    .hotSearch{
        list-style: none;
        margin-top: 20px;
        overflow: hidden;
        li{
            float: left;
            border:1px solid #ddd;
            font-size: 12px;
            padding: 5px;
            border-radius: 15px;
            margin: 8px 8px 4px 8px;
            font-size: 14px;
            span{
                padding: 0 5px;
            }
        }
        div{
            margin-top: 10px;
            font-size: 12px;
            color: #666666;
        }
    }
</style>