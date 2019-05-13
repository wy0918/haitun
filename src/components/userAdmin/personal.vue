<template>
<div class="personalBox">
   <el-row>
    <el-col :span="6">
        <el-card>
          <img src="../../../static/logo.png" width="80px" height="80px" style="padding:0 30%">
          <p>{{realname}}</p>
          <p>工号:<span>{{userId}}</span></p>
          <p>所属单位：<span>{{department}}</span></p>
          <el-button type="primary" @click="changePwd">修改密码</el-button>
        </el-card>
    </el-col>
   <el-col :span='18'>
      <el-card>
          <el-row>
            <el-col :span="6" class="service" @click.native="goRepair">
              <i class="iconfont icon-baoxiu" style="font-size: 50px;"></i> <p>设备报修</p>
            </el-col>
            <el-col :span="6" class="service" @click.native="dialogLend=true">
              <i class="iconfont icon-chujieguanli" style="font-size: 50px;"></i> <p>出借申请</p>
            </el-col>
            <el-col :span="6" class="service" @click.native="dialogReturn=true">
              <i class="iconfont icon-guihuan" style="font-size: 50px;"></i> <p>设备归还</p>
            </el-col>
            <el-col :span="6" class="service">
              <i class="iconfont icon-shenhe" style="font-size: 50px;"></i> <p>申请审核</p>
            </el-col>
          </el-row>
        </el-card>
        <el-row>
           <el-col :span='12'>
               <h1 style="text-align:left;margin-left:30px">审核列表</h1>
               <el-card>
               <el-tabs type="card">
                  <el-tab-pane label="我的出借申请">
                     <el-table :data="tableData2" style="width: 100%">
                     <el-table-column prop="ver_name" label="设备名称" width="260"></el-table-column>
                     <el-table-column prop="remark" label="出借说明" width="130"></el-table-column>
                     <el-table-column prop="result" label="审核情况" width="80"></el-table-column>
                     </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="我的维修申请">
                     <el-table :data="repairTable" style="width: 100%">
                     <el-table-column prop="ver_name" label="设备名称" width="260"></el-table-column>
                     <el-table-column prop="remark" label="维修说明" width="130"></el-table-column>
                     <el-table-column prop="result" label="审核情况" width="80"></el-table-column>
                     </el-table>
                  </el-tab-pane>
               </el-tabs>
               </el-card>
               
           </el-col>
           <el-col :span='12'>
               <h1 style="text-align:left;margin-left:30px">系统公告</h1>
               <el-card>
                  <el-table :data="tableData" style="width: 100%">
                     <el-table-column prop="title" label="标题" width="180"></el-table-column>
                     <el-table-column prop="date" label="日期" width="180"></el-table-column>
                     <el-table-column label="操作" >
                        <template slot-scope="event">
                           <div>
                              <span>
                                 <el-button size="small" type="text" @click="noticeDetail(event.row.content)">查看详情</el-button>
                              </span>
                              </div>
                        </template>
			            </el-table-column>
                  </el-table>
               </el-card>
           </el-col>
        </el-row>        
   </el-col>
   </el-row>
   <!-- 公告详情 -->
   <el-dialog title="公告详情" :visible.sync="dialogNotice" width="30%">
       <span>{{noticeContent}}</span>
       <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="dialogNotice = false">确 定</el-button>
       </span>
</el-dialog>
   <!-- 公告详情 -->
   <!-- 设备归还 -->
   <el-dialog title="设备归还" :visible.sync="dialogReturn" width="50%">
       <el-table :data="returnTable" style="width: 100%">
                     <el-table-column property="name" label="设备名称" width="400"></el-table-column>
                     <el-table-column property="state" label="设备状态" width="150"></el-table-column>
                     <el-table-column label="操作" width="150">
                        <template slot-scope="event">
                           <div>
                              <span>
                                 <el-button size="small" type="text" @click="returnVersion(event.row.id)">归还设备</el-button>
                              </span>
                              </div>
                        </template>
			            </el-table-column>
         </el-table>
       <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="dialogReturn = false">确 定</el-button>
       </span>
</el-dialog>
   <!-- 设备归还 -->
   <!-- 设备出借 -->
   <el-dialog title="设备出借申请" :visible.sync="dialogLend" width="40%">
       <el-form :model="lendForm" ref="lendForm" :rules="rules" label-width="100px">
             <el-form-item label="出借单ID" prop="id">
             <el-input v-model.trim="lendForm.id"></el-input>
             </el-form-item>
             <el-form-item label="设备ID" prop="ver_id">
             <el-input v-model.trim="lendForm.ver_id"></el-input>
             </el-form-item>
             <el-form-item label="出借说明" prop="remark">
             <el-input type="textarea" v-model.trim="lendForm.remark"></el-input>
             </el-form-item>
       </el-form>
       <span slot="footer" class="dialog-footer">
      <el-button @click="dialogLend = false">取 消</el-button>
       <el-button type="primary" @click="lend">确 定</el-button>
       </span>
</el-dialog>
   <!-- 设备出借 -->
</div>
</template>
<script>
import axios from "axios";
import qs from 'qs';
export default {
   data(){
      return{
         username:localStorage.getItem('username'),
         userId:'',
         realname:'',
         department:'',
         dialogNotice:false,
         noticeContent:'',
         dialogReturn:false,
         dialogLend:false,
         tableData: [],
         tableData2: [],
         repairTable:[],
         returnTable:[],
         changeForm: {
                id:'',
                state:'可出借'
             },
         userForm:{
            id:'',
            password:''
         },
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
         rules: {
          id: [
            { required: true, message: '请输入出借单编号', trigger: 'blur' },
          ],
          ver_id: [
            { required: true, message: '请输入设备编号', trigger: 'blur' },
          ]
        }
      }
   },
   mounted(){
       axios.get('user/searchUser',{params:{name:this.username}})
       .then((response)=>{
          let obj=response.data;
          this.userId=obj.data.id;
          this.userForm.id=obj.data.id;
          this.realname=obj.data.realname;
          this.department=obj.data.department;
       })
       axios.get('notice')
       .then((response)=>{
             let obj=response.data;
             this.tableData=obj.data;
       })
       axios.get('lend/allLend')
       .then((response)=>{
             let obj=response.data;
             this.tableData2=obj.data;
       })
       axios.get('repair/allRepair')
       .then((response)=>{
             let obj=response.data;
             this.repairTable=obj.data;
       })
       axios.get('version/getLendVersion')
       .then((response)=>{
             let obj=response.data;
             this.returnTable=obj.data;
             console.log(this.returnTable);
       })
   },
   methods:{
      changePwd:function(){
          this.$prompt('请输入新的密码', '提示', {
          confirmButtonText: '确认修改',
          cancelButtonText: '取消',
        }).then(({ value }) => {
           this.userForm.password=value;
           axios.post('user/updateUser',qs.stringify(this.userForm))
          this.$message({type: 'success',message: '密码修改成功！'});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      noticeDetail:function(event){
         this.noticeContent=event;
          this.dialogNotice=true;
          //console.log(event)
      },
      returnVersion:function(event){
         this.$confirm('确认归还该设备吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.changeForm.id=event;
          axios.post('version/updateVersion',qs.stringify(this.changeForm));
          this.$message({type: 'success',message: '设备归还成功!'});
          this.dialogReturn=false;
        }) 
        .catch(() => {
          this.dialogReturn=false;        
        })     
      },
      goRepair:function(){
         this.$router.push({path: 'repair'})  
      },
      lend:function(){
         axios.get('version/getVersion',{params:{id:this.lendForm.ver_id}})
         .then((response)=>{
             let obj=response.data;
             let versionState=obj.data.state;
             this.lendForm.ver_id=obj.data.id;
             this.lendForm.ver_name=obj.data.name;
             this.lendForm.username=localStorage.getItem("username");
             this.lendForm.location=obj.data.location;
             if(versionState=="可出借"){
                axios.post('lend/addLend',qs.stringify(this.lendForm))
                .then((response)=>{
                   this.$message.success("出借申请提交成功！");
                   this.dialogLend=false;    
                })
             }
             else{
                this.$message.error("该设备当前状态不可出借！");
                this.dialogLend=false;    
             }
       })
       .catch(()=>{
          this.$message.error("设备ID输入错误！");
       })
      }
   }

}
</script>

<style scoped>
@import '../../assets/icon/iconfont.css';
.el-card {
  margin:20px 20px;
}
.service {
  padding-top:20px
}
.personalBox {
   padding:0 30px;
   margin-top: 20px;
}
</style>
