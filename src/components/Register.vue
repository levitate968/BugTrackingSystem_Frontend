<template>
  <div>
    <el-form ref="registerForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">新用户注册</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" placeholder="请输入用户名" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input type="text" placeholder="请输入真实姓名" v-model="form.realName"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item label="组名" prop="teamName">
        <el-input type="text" placeholder="请输入组名" v-model="form.teamName"/>
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
        <el-button type="primary" v-on:click="onRegister('registerForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: '',
        realName: '',
        password: '',
        teamName: '',
        post: ''
      },

      options: [{
        value: '小组组长',
      }, {
        value: '前端开发',
      }, {
        value: '后端开发',
      }, {
        value: '测试',
      }],

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        realName: [
          {required: true, message: '真实姓名不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ],
        teamName: [
          {required: true, message: '组名不可为空', trigger: 'blur'}
        ],
        post: [
          {required: true, message: '职位不可为空', trigger: 'blur'}
        ]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    onRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("http://localhost:8989/employee/createEmployee", this.form).then(res => {
            console.log(res.data);
            if(res.data.code=="000"){
              this.$router.push("/login");
              alert(res.data.data)
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

  }
}
</script>

<style lang="css" scoped>
.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
