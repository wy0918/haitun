<template>
<el-container>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px">
      <h3>设备维修单</h3>
  <el-form-item label="维修ID" prop="id">
    <el-input v-model.trim="ruleForm.id"></el-input>
  </el-form-item>
  <el-form-item label="设备ID" prop="ver_id">
    <el-input v-model.trim="ruleForm.ver_id"></el-input>
  </el-form-item>
  <el-form-item label="设备地点" prop="location">
    <el-input v-model.trim="ruleForm.location"></el-input>
  </el-form-item>
  <el-form-item label="紧急维修" prop="important">
     <el-switch v-model="ruleForm.important" active-value="true" inactive-value="false" @change="changeState"></el-switch>
  </el-form-item>
  <el-form-item label="申报说明" prop="remark">
    <el-input type="textarea" v-model.trim="ruleForm.remark"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交维修申请表</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-container>
</template>

<script>
import axios from "axios";
import qs from 'qs';
  export default {
    data() {
      return {
        ruleForm: {
          id: '',
          ver_id: '',
          ver_name:'',
          username:'',
          location: '',
          remark: '',
          state:'待维修',
          important:'',
          flag:'0',
          result:'审核中'
        },
        changeForm: {
          id:'',
          state:'待维修'
        },
        rules: {
          id: [
            { required: true, message: '请输入维修编号', trigger: 'blur' },
          ],
          ver_id: [
            { required: true, message: '请输入设备编号', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      submitForm(form) {
            this.ruleForm.username=localStorage.getItem("username");
            axios.get('version/getVersion',{params:{id:this.ruleForm.ver_id}})
            .then((response)=>{
              let ver=response.data;
              this.ruleForm.ver_name=ver.data.name; 
              this.ruleForm.location=ver.data.location;   
              axios.post('repair/addRepair',qs.stringify(this.ruleForm))
              .then((response)=>{
                  this.changeForm.id=this.ruleForm.ver_id;
                  axios.post('version/updateVersion',qs.stringify(this.changeForm))
                  this.$message.success('报修成功！已提交审核');
                  this.$refs[form].resetFields();
              })
              .catch(err=>{
                  this.$message.error('该设备不存在');
              })               
            })
            
      },
      resetForm(form) {
        this.$refs[form].resetFields();
      },
      changeState:function(callback){
        this.ruleForm.important=callback;
      }
    },
  }
</script>
<style scoped>
.el-form {
    margin-top:70px;
    margin-left:510px;
    padding:50px 120px 20px 0px;
    /* box-shadow: 5px 5px 10px 10px #ccc; */
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 15px;
}

</style>

