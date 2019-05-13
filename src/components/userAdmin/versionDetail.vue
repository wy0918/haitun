<template>
<div>
    
    <el-row class="detailBox">
        <el-col :span="10">
            <img width="500px" :src="url">
        </el-col>
        <el-col :span="14">
        <el-row>
        <el-col :span="20">
            <h1>{{name}}</h1>
            <p><strong>设备编号：</strong>{{id}}</p>
            <p><strong>设备规格：</strong>{{type}}</p>
            <p><strong>所属部门：</strong>{{depart}}</p>
            <p><strong>生产制造商：</strong>{{producer}}</p>
            <p><strong>存放地点：</strong>{{location}}</p>
            <p ><strong>状态：<span :style="{'color':stateColor(state)}">{{state}}</span></strong></p>
        </el-col>
        <el-col :span="4" style="text-align:right;margin-top:20px;">
            <el-button type="text" @click="returnVersion"><< 返回设备列表</el-button>
        </el-col>
        </el-row>
        <div style="text-align:right;margin-top:50px">
        <el-button type="danger" @click="dialogRepairVisible=true">申请维修</el-button>
        <el-button type="primary" @click="ifLend">申请出借</el-button>
        </div>
        </el-col>
    </el-row>
    <p style="padding:0px 120px;text-align:left"><strong>详情说明：</strong>{{intro}}</p>
    <!-- lend -->
<el-dialog title="出借申请"  :visible.sync="dialogLendVisible" style="width:70%;left:16%">
  <el-form :model="lendForm" label-width="80px">
      <el-form-item label="申请编号">
				<el-input v-model.trim="lendForm.id"></el-input>
	  </el-form-item>
      <el-form-item label="出借理由">
				<el-input v-model.trim="lendForm.remark"></el-input>
	  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogLendVisible = false">取 消</el-button>
    <el-button type="primary" @click="lend">提 交</el-button>
  </div>
</el-dialog>
<!-- lend -->
<!-- repair -->
<el-dialog title="维修申请"  :visible.sync="dialogRepairVisible" style="width:70%;left:16%">
  <el-form :model="lendForm" label-width="80px">
      <el-form-item label="申请编号">
				<el-input v-model.trim="repairForm.id"></el-input>
	  </el-form-item>
      <el-form-item label="紧急维修" prop="important">
     <el-switch v-model="repairForm.important" active-value="true" inactive-value="false" @change="changeState"></el-switch>
      </el-form-item>
      <el-form-item label="维修说明">
				<el-input v-model.trim="repairForm.remark"></el-input>
	  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogRepairVisible = false">取 消</el-button>
    <el-button type="primary" @click="repair">提 交</el-button>
  </div>
</el-dialog>
<!-- repair -->
</div>
</template>
<style scoped>
.detailBox {
    padding:20px 120px;
    text-align: left;
}
.el-switch {
    text-align: left!important;
}
</style>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    data(){
        return{
            id:'',
            name:'',
            intro:'',
            type:'',
            producer:'',
            depart:'',
            location:'',
            state:'',
            url:'',
            dialogLendVisible: false,
            dialogRepairVisible:false,
            lendForm: {
                id:'',
                ver_id:'',
                ver_name:'',
                username:'',
                location:'',
                remark:'',
                result:'审核中',
                flag:'0',
            },
            repairForm: {
                id:'',
                ver_id:'',
                ver_name:'',
                username:'',
                location:'',
                remark:'',
                important:'',
                result:'审核中',
                state:'待维修',
                flag:'0',
            },
            changeForm: {
                id:'',
                state:'待维修'
             },
        }
    },
    mounted(){
        axios.get('version/getVersion',{params:{id:this.$route.query.ver_id}})
        .then((response)=>{
            let obj=response.data;
            this.id=obj.data.id;
            this.name=obj.data.name;
            this.intro=obj.data.intro;
            this.type=obj.data.type;
            this.producer=obj.data.producer;
            this.location=obj.data.location;
            this.url=obj.data.url;
            this.depart=obj.data.depart;
            this.state=obj.data.state;
        })
        
    },
    methods:{
        returnVersion:function(){
            this.$router.push({name: 'version'}) 
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
        },
        ifLend:function(){
            if(this.state=="可出借"){
               this.dialogLendVisible=true
            }
            else{
                this.$message.error('该设备暂时无法出借');
            }
        },
        lend:function(){            
            this.lendForm.ver_id=this.id;
            this.lendForm.ver_name=this.name;
            this.lendForm.username=localStorage.getItem("username");
            this.lendForm.location=this.location;
            axios.post('lend/addLend',qs.stringify(this.lendForm))
            .then((response)=>{
                  this.$message.success('出借申请提交成功！');
                  this.dialogLendVisible = false
            })
            .catch(err=>{
               this.$message.error('该出借申请单已存在！');
            })           
        },
        repair:function(){
            this.repairForm.ver_id=this.id;
            this.repairForm.ver_name=this.name;
            this.repairForm.username=localStorage.getItem("username");
            this.repairForm.location=this.location;
            this.changeForm.id=this.id;
            axios.post('repair/addRepair',qs.stringify(this.repairForm))
            .then((response)=>{
                  axios.post('version/updateVersion',qs.stringify(this.changeForm));
                  this.$message.success('设备维修申请提交成功！');
                  this.dialogRepairVisible = false;
                  setTimeout(function(){ 
                      location.reload();
                }, 2000);
            })
        },
        changeState:function(callback){
        this.repairForm.important=callback;
        }
    }
}
</script>

