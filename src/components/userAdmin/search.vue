<template>
   <div class="search-container">
    <div id="search">
      <h1 style="text-align:center;color:#fff;font-size:50px">
        全平台设备检索&nbsp;&nbsp;&nbsp;&nbsp;
        </h1>
        <el-input placeholder="请输入需要查询的设备名称" v-model="input" clearable>
            <el-button type="primary" slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
    </div>
   </div>
</template>
<style scoped>
.search-container{
  width: 100%;
  height: 100%;
  padding:0;
  background-image: url("../../../static/search-bg.jpg");
  background-repeat: no-repeat;
} 
#search {
    width: 45%;
    position: absolute; 
    left:52%; top: 40%;
    transform: translate(-50%, -50%);   
}
.el-input__inner {
    height: 55px
}
.el-input-group__append, .el-input-group__prepend {
    background-color: #409EFF;
    border-color: #409EFF;
    color: white;
    padding: 0 25px;
  }
</style>
<script>
import axios from "axios";
export default {
    data(){
        return{
            input:''
        }
    },
    methods:{
        search:function(){
            axios.get('version/searchVersion',{params:{name:this.input}})
            .then((response)=>{
                let obj=response.data;
                let verId=obj.data.id;
                localStorage.setItem("verId", obj.data.id); 
                console.log(verId);
                this.$router.push({path: 'versionDetail', query: {ver_id: verId}})  
            })
            .catch((error)=>{
                this.$message.error('该设备不存在！');
            })
        }
    }
}
</script>

