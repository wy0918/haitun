<template>
<div>
    <el-tabs :tab-position="tabPosition" class="versionTab">
    <el-tab-pane label="设备全列表">
        <el-card class="box-card" shadow="hover" v-for="item in versions" :key="item.id" >
            <div class="item" :id="item.id" @click="detail($event)">
                <el-row>
                <el-col :span="6">
                    <img :src="item.url"  width="200px" height="200px">
                </el-col>
                <el-col :span="18">
                    <h2 prop="name">{{item.name}}</h2>
                    <p>性能指标：<span prop="type">{{item.type}}</span></p>
                    <p>用途：<span prop="intro">{{item.intro}}</span></p>
                    <h4 style="float:right">状态：<span prop="state" :style="{'color':stateColor(item.state)}">{{item.state}}</span></h4>
                </el-col>
                </el-row>
            </div>
        </el-card>
    </el-tab-pane>
    <el-tab-pane label="备品备件列表">
        <el-table :data="sparesData" style="width: 100%" class="sparesTable">
                     <el-table-column prop="id" label="备件ID" width="100"></el-table-column>
                     <el-table-column prop="name" label="备件名称" width="220"></el-table-column>
                     <el-table-column prop="type" label="备件类型" width="180"></el-table-column>
                     <el-table-column prop="num" label="剩余数量" width="120"></el-table-column>
                     <el-table-column label="操作" >
                        <template>
                           <div>
                              <span>
                                 <el-button size="small" type="primary">申请出借</el-button>
                              </span>
                              </div>
                        </template>
			        </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="维修中设备">维修中设备</el-tab-pane>
    <el-tab-pane label="出借中设备">出借中设备</el-tab-pane>
  </el-tabs>
</div>
</template>
<style scoped>
.versionTab {
    padding: 50px 100px;
    height: 100%;
}
.box-card {
    /* width: 100%; */
    margin: 15px 50px;
  }
.item {
    text-align: left;
    font-size: 14px
}
.el-tabs__content {
    margin:0;
}
.sparesTable {
    padding:5px 200px;
}

</style>

<script>
import axios from "axios";
  export default {
    data() {
      return {
        tabPosition: 'left',
        versions:[],
        sparesData:[]
      };
    },
    mounted(){
        axios.get('version')
        .then((response)=>{
            let obj=response.data;
            this.versions=obj.data;
        })
        axios.get('spare')
        .then((response)=>{
            let obj=response.data;
            this.sparesData=obj.data;
        })
    },
    methods:{
        detail:function(event){
            this.$router.push({path: 'versionDetail', query: {ver_id: event.currentTarget.id}})            
        },
        stateColor:function(color){
        if(color == '可出借') {
        	return 'green';
        }
        if(color == '维修中') {
            return 'red'
        }
        if(color == '已借出') {
            return 'blue'
        }
        if(color == '待维修') {
            return 'grey'
        }
        }
    }
  };
</script>
