<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户信息</span>
    </div>
    <div class="text item">用户名:{{employee.username}}</div>
    <div class="text item">真实姓名:{{employee.realName}}</div>
    <div class="text item">组名:{{employee.teamName}}</div>
    <div class="text item">职位:{{employee.post}}</div>
    <div style="padding: 14px;">
      <div class="bottom clearfix">
        <el-button type="text" v-on:click="" class="button">修改信息</el-button>
        <el-button type="text" v-on:click="logout" class="button">退出登录</el-button>
      </div>
    </div>
  </el-card>

</template>

<script>
  export default {
    name:"Index",
    data:{
      employee:{
        //存放用户登录信息
      }
    },
    methods: {
      logout(){
        localStorage.removeItem("employee");
        this.$router.push("/login");
      }
    },
    created() {
      var employeeString=localStorage.getItem("employee");
      if(employeeString){
        this.employee=JSON.parse(employeeString);
      }else{
        alert("您尚未登录，点击确定跳转至登录页面")
        this.$router.push("/login");
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

.box-card {
  width: 480px;
}
</style>
