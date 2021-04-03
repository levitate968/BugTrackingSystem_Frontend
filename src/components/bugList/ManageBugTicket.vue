<template>
  <div>
<!--    <el-row>-->
<!--      <el-col :span="6"><div class="grid-content bg-purple">id: #{{this.bugTicket.bugId}}</div></el-col>-->
<!--      <el-col :span="12"><div class="grid-content bg-purple-light" style="font-size:30px" cell-style="font-weight: 700;" align="center">{{this.bugTicket.title}}</div></el-col>-->
<!--      <el-col :span="2"><div class="grid-content bg-purple">{{this.bugTicket.statusName}}</div></el-col>-->
<!--      <el-col :span="2"><div class="grid-content bg-purple-light">{{this.bugTicket.bugLevel}}</div></el-col>-->

<!--      <el-col :span="2"><div class="grid-content bg-purple-light">-->
<!--        <el-link type="primary" v-on:click="goBack">返回</el-link>-->
<!--      </div></el-col>-->
<!--    </el-row>-->
    <el-row :gutter="12">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{this.bugTicket.title}}</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
        <el-form ref="CheckForm" :model="form" :rules="rules" label-width="80px" class="login-box">
          <el-row>
            <el-col :span="8">
              <el-form-item label="指派人" prop="designateName">
                <el-input type="text" placeholder="请输入指派人" v-model="form.designateName"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" v-on:click="checkBugTicket('CheckForm')">审核通过</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>



      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-button v-on:click="goBack" style="float: right; padding: 3px 0" type="text">返回</el-button>
          </div>
          <div  class="text item">
            <el-row><el-tag type="danger" class="bug-level">等级：{{this.bugTicket.bugLevel}}</el-tag></el-row>
            <el-row><el-tag class="bug-level">状态：{{this.bugTicket.statusName}}</el-tag></el-row>
          </div>
          <el-timeline class="time-line">
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
export default {
  name: "ManageBugTicket",
  data(){
    bugTicket:{}
    return {
      activities: [{
        content: '活动按期开始',
        timestamp: '2021-03-15'
      }, {
        content: '通过审核',
        timestamp: '2021-03-13'
      }, {
        content: '创建成功',
        timestamp: '2021-03-11'
      }],

      form:{
        designateName:''
      },

      rules: {
        designateName: [
          {required: true, message: '指派人不能为空', trigger: 'blur'}
        ],
      },
    }
  },
  created() {
    var employeeString=localStorage.getItem("employee");
    if(employeeString){
      var bugTicketString=localStorage.getItem("bugTicket");
      this.bugTicket=JSON.parse(bugTicketString);
    }else{
      alert("您尚未登录，点击确定跳转至登录页面")
      this.$router.push("/login");
    }
  },
  methods:{
    goBack(){
      this.$router.push("/bugList");
      location.reload();
    },
    checkBugTicket(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("http://localhost:8989/bugTicket/checkBugTicket", this.form).then(res => {
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
    }
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
