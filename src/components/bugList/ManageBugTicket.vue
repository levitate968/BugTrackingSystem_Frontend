<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{this.bugTicket.title}}</span>
          </div>

          <div class="text item">
            创建人：{{this.bugTicket.submitName}}
            <br></br>
            {{this.bugTicket.description}}
          </div>
        </el-card>


        <el-form v-show="showCheckForm" ref="CheckForm" :model="form" :rules="rules" label-width="80px" class="login-box">
          <el-row>
            <el-col :span="8">
              <el-form-item label="指派人" prop="designateName">
                <el-input type="text" placeholder="请输入指派人" v-model="form.designateName"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="描述：" prop="checkNote">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="form.checkNote">
            </el-input>
          </el-form-item>
          <el-row>
            <el-col :span="16">

              <el-form-item>
                <el-button type="primary" v-on:click="checkBugTicket('CheckForm')">审核通过</el-button>
                <el-button type="primary" v-on:click="rejectBugTicket()">驳回</el-button>
              </el-form-item>

            </el-col>
          </el-row>
        </el-form>


        <el-card v-show="showCheckCard" class="box-card">
          <div class="text item">
            审核人：{{this.bugTicket.checkName}}
            <br></br>
            {{this.checkBugTicketLine}}
          </div>
        </el-card>


        <el-card v-show="showDealForm" class="box-card">
          <el-form ref="DealForm" :model="form" :rules="rules" label-width="80px" class="login-box">
            <el-form-item label="描述：" prop="dealNote">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="form.dealNote">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="dealBugTicket('DealForm')">确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>


        <el-card v-show="showDealCard" class="box-card">
          <div class="text item">
            解决人：{{this.bugTicket.dealName}}
            <br></br>
            {{this.dealBugTicketLine}}
          </div>
        </el-card>

      </el-col>



      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-button v-on:click="goBack" style="float: right; padding: 3px 0" type="text">返回</el-button>
          </div>
          <div  class="text item">
            <el-row><el-tag class="bug-level">等级：{{this.bugTicket.bugLevel}}</el-tag></el-row>
            <el-row><el-tag class="bug-level">状态：{{this.bugTicket.statusName}}</el-tag></el-row>
            <el-row><el-tag class="bug-level">处理人：{{this.bugTicket.designateName}}</el-tag></el-row>
          </div>

          <el-timeline v-show="showTimeline" class="time-line">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

     </el-row>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "ManageBugTicket",
  data(){
    bugTicket:{}
    return {
      showCheckForm: true,
      showCheckCard: true,
      showDealForm: true,
      showDealCard: true,
      showTimeline: true,

      checkBugTicketLine:'',
      dealBugTicketLine:'',


      query:{},
      bugId:'',
      bugTicketLines:[],

      activities: [{
        content: '提交缺陷',
        timestamp: ''
      }, {
        content: '通过审核',
        timestamp: ''
      }, {
        content: '修改完毕',
        timestamp: ''
      }],

      form:{
        designateName:'',
        checkNote:'',
        dealNote:''
      },

      rules: {
        // designateName: [
        //   {required: true, message: '指派人不能为空', trigger: 'blur'}
        // ],
        checkNote: [
          {required: true, message: '输入内容不能为空', trigger: 'blur'}
        ],
        dealNote: [
          {required: true, message: '输入内容不能为空', trigger: 'blur'}
        ],
      },
    }
  },
  created() {
    var employeeString=localStorage.getItem("employee");
    if(employeeString){
      var bugTicketString=localStorage.getItem("bugTicket");
      this.bugTicket=JSON.parse(bugTicketString);
      var statusName=this.bugTicket.statusName;
      this.bugId=this.bugTicket.bugId;

      this.query.bugId=this.bugTicket.bugId;
      this.query.teamId=this.bugTicket.teamId;

      this.activities[0]['timestamp']=this.bugTicket.submitTime;
      this.activities[1]['timestamp']=this.bugTicket.checkTime;
      this.activities[2]['timestamp']=this.bugTicket.dealTime;

      if(statusName=="已提交"){
        this.showCheckForm=true;
        this.showCheckCard=false;
        this.showDealForm=false;
        this.showDealCard=false;
      }else if(statusName=="已审核"){
        this.showCheckForm=false;
        this.showCheckCard=true;
        this.showDealForm=true;
        this.showDealCard=false;
      }else if(statusName=="已解决"){
        this.showCheckForm=false;
        this.showCheckCard=true;
        this.showDealForm=false;
        this.showDealCard=true;
      }
      else if(statusName=="已驳回"){
        this.showCheckForm=false;
        this.showCheckCard=true;
        this.showDealForm=false;
        this.showDealCard=false;
        this.showTimeline=false;
      }
    }else{
      alert("您尚未登录，点击确定跳转至登录页面")
      this.$router.push("/login");
    }

    this.getBugTicketLine();
  },
  methods:{
    goBack(){
      this.$router.push("/bugList");
    },
    checkBugTicket(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.query.designateName=this.form.designateName;
          this.query.note=this.form.checkNote;
          this.$http.post("http://localhost:8989/bugTicket/checkBugTicket", this.query).then(res => {
            console.log(res.data);
            if(res.data.code=="000"){
              this.$router.push("/bugList");
              location.reload();
            }else{
              alert(res.data.data);
            }
          });
        } else {
          this.$message.error("当前输入的数据不合法!!!");
          return false;
        }
      })
    },
    rejectBugTicket(){
      this.query.note=this.form.checkNote;
      this.$http.post("http://localhost:8989/bugTicket/rejectBugTicket", this.query).then(res => {
        console.log(res.data);
        if(res.data.code=="000"){
          this.$router.push("/bugList");
          location.reload();
        }else{
          alert(res.data.data);
        }
      });
    },
    dealBugTicket(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.query.note=this.form.dealNote;
          this.$http.post("http://localhost:8989/bugTicket/dealBugTicket",this.query).then(res => {
            if(res.data.code=="000"){
              this.$router.push("/bugList");
              location.reload();
            }else{
              alert(res.data.data);
            }
          });
        } else {
          this.$message.error("当前输入的数据不合法!!!");
          return false;
        }
      })
    },
    getBugTicketLine(){
      this.$http.post("http://localhost:8989/bugTicketLine/getBugTicketLine",this.query).then(res => {
        if(res.data.code=="000"){
          this.bugTicketLines=res.data.data;
          if(this.bugTicketLines.length==0){
            console.log(this.bugTicketLines);
          }else if(this.bugTicketLines.length==1){
            console.log(this.bugTicketLines);
            this.checkBugTicketLine=this.bugTicketLines[0].note;
          }else if(this.bugTicketLines.length==2){
            console.log(this.bugTicketLines);
            this.checkBugTicketLine=this.bugTicketLines[0].note;
            this.dealBugTicketLine=this.bugTicketLines[1].note;
          }
        }else{
          alert(res.data.data);
        }
      });
    },
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.bug-level {
  margin-bottom: 12px;
  margin-left: 10px;
}
.time-line {
  margin-left: -20px;
}
.login-box{
  margin-top: 20px;
}
</style>
