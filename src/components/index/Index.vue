<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户信息</span>
    </div>
    <div class="text item">账户名称：{{this.user.username}}</div>
    <div class="text item">真实姓名：{{this.user.realName}}</div>
    <div class="text item">小组名程：{{this.user.teamName}}</div>
    <div class="text item">职位名称：{{this.user.post}}</div>
    <div class="text item">待处理缺陷个数：{{this.designateCount}}</div>
    <div style="padding: 14px;">
      <div class="bottom clearfix">
        <el-button type="text" v-on:click="changeInformation" class="button">修改信息</el-button>
        <el-button type="text" v-on:click="changePassword" class="button">修改密码</el-button>
        <el-button type="text" v-on:click="logout" class="button">退出登录</el-button>
      </div>
    </div>
  </el-card>

</template>

<script>
  export default {
    name:"Index",
    data(){
      return {
        employee:{
          //存放用户登录信息
        },
        user:{
          username:'',
          realName:'',
          teamName:'',
          post:''
        },
        designateCount:'',
        empId:'',
      }
    },
    created() {
      this.getInformation();
      this.getDesignateCount();
    },
    methods: {
      logout(){
        this.$confirm('确定退出登录吗', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          localStorage.removeItem("employee");
          this.$router.push("/login");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },
      changeInformation(){
        this.$router.push("/index/changeInformation");
      },
      changePassword(){
        this.$router.push("/index/changePassword");
      },
      getInformation(){
        var employeeString=localStorage.getItem("employee");
        if(employeeString){
          this.employee=JSON.parse(employeeString);
          this.empId=this.employee.empId;
        }else{
          alert("您尚未登录，点击确定跳转至登录页面")
          this.$router.push("/login");
        }
        this.$http.get("http://localhost:8989/employee/getInformation/"+this.empId).then(res => {
          //console.log(res.data);
          if(res.data.code=="000"){

            this.user=res.data.data;
            console.log(this.user);
          }else{
            alert(res.data.data);
          }
        });
      },
      getDesignateCount(){
        var employeeString=localStorage.getItem("employee");
        if(employeeString){
          this.employee=JSON.parse(employeeString);
          this.empId=this.employee.empId;
        }else{
          alert("您尚未登录，点击确定跳转至登录页面")
          this.$router.push("/login");
        }
        this.$http.get("http://localhost:8989/employee/getDesignateCount/"+this.empId).then(res => {
          //console.log(res.data);
          if(res.data.code=="000"){
            this.designateCount=res.data.data;
            console.log(this.designateCount);
          }else{
            alert(res.data.data);
          }
        });
      }
    }
  }
</script>

<style scoped>
.text {
  font-size: 15px;
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

.box-card {
  width: 480px;
}

</style>
