<template>
  <div>
    <el-form ref="InformationForm" :rules="rules" :model="form" label-width="80px" class="login-box">
      <h3 class="login-title">修改个人信息</h3>

      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="职位" prop="post">
        <el-select v-model="form.post" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" v-on:click="changeInformation('InformationForm')">修改</el-button>
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
        username: '',
        post: '',
      },
      employee:{},
      list:{
        userId:''
      },
      query:{},

      options: [{
        value: '小组组长',
      }, {
        value: '前端开发',
      }, {
        value: '后端开发',
      }, {
        value: '测试',
      }],

      rules: {
        username: [
          {required: true, message: '用户名不可为空', trigger: 'blur'}
        ],
        post: [
          {required: true, message: '职位不可为空', trigger: 'blur'}
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
    changeInformation() {
      for(var i in this.form){
        this.query[i]=this.form[i];
      }
      this.$http.post("http://localhost:8989/employee/changeInformation", this.query).then(res => {
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
