<template>
  <div>
    <el-form ref="PasswordForm" :rules="rules" :model="form" label-width="80px" class="login-box">
      <h3 class="login-title">修改个人密码</h3>

      <el-form-item label="旧密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input type="text" v-model="form.newPassword"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" v-on:click="changePassword('PasswordForm')">修改</el-button>
        <el-button type="primary" v-on:click="goBack">返回</el-button>
      </el-form-item>


    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateBugTicket",
  data() {
    return {
      form: {
        password: '',
        newPassword: '',
      },
      employee:{},
      list:{
        empId:''
      },
      query:{},


      rules: {
        password: [
          {required: true, message: '原有密码不可为空', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '修改密码不可为空', trigger: 'blur'}
        ],
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  created() {
    var employeeString=localStorage.getItem("employee");
    if(employeeString){
      this.employee=JSON.parse(employeeString);
      this.list.empId=this.employee.empId;
      for(var j in this.list){
        this.query[j]=this.list[j];
      }
    }else{
      alert("您尚未登录，点击确定跳转至登录页面")
      this.$router.push("/login");
    }

  },

  methods: {
    changePassword(){
      console.log(this.form);
      for(var i in this.form){
        this.query[i]=this.form[i];
      }
      this.$http.post("http://localhost:8989/employee/changePassword", this.query).then(res => {
        console.log(res.data);
        if(res.data.code=="000"){
          alert(res.data.data);
          this.$router.push("/index");
        }else{
          alert(res.data.data);
        }
      });
    },
    goBack() {
      this.$router.push("/index");
    }

  }
}
</script>

<style scoped>

</style>
