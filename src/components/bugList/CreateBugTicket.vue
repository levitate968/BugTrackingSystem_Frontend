<template>
  <div>
    <el-form ref="CreateForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">创建缺陷追踪表</h3>

      <el-form-item label="标题" prop="title">
        <el-input type="text" placeholder="请输入标题" v-model="form.title"/>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="form.description">
        </el-input>
      </el-form-item>

      <el-form-item label="级别" prop="bugLevel">
        <el-select v-model="form.bugLevel" placeholder="请选择">
          <el-option
            v-for="item in bugLevelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

<!--      <el-form-item label="指派人" prop="designateName">-->
<!--        <el-input type="text" placeholder="请输入指派人" v-model="form.designateName"/>-->
<!--      </el-form-item>-->


      <el-form-item>
        <el-button type="primary" v-on:click="createBugList('CreateForm')">创建</el-button>
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
        title: '',
        description: '',
        bugLevel: '',
      },
      employee:{},
      list:{
        userId:''
      },
      query:{},

      bugLevelOptions: [{
        value: '阻碍',
      }, {
        value: '紧急',
      }, {
        value: '一般',
      }],


      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        title: [
          {required: true, message: '标题不能为空', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '描述不能为空', trigger: 'blur'}
        ],
        bugLevel: [
          {required: true, message: '级别不能为空', trigger: 'blur'}
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
      this.list.userId=this.employee.empId;
      console.log(this.list);
      for(var j in this.list){
        this.query[j]=this.list[j];
      }
    }else{
      alert("您尚未登录，点击确定跳转至登录页面")
      this.$router.push("/login");
    }

  },

  methods: {
    createBugList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //合并表单数据和userId
          for(var i in this.form){
            this.query[i]=this.form[i];
          }
          console.log(this.query);
          this.$http.post("http://localhost:8989/bugTicket/createBugTicket", this.query).then(res => {
            console.log(res.data);
            if(res.data.code=="000"){
              this.$router.push("/bugList");
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
    goBack() {
      this.$router.push("/bugList");
    }

  }
}
</script>

<style scoped>

</style>
