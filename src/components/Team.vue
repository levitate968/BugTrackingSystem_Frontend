<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="empId" label="编号" width="300"></el-table-column>
    <el-table-column prop="realName" label="用户名" width="120"></el-table-column>
    <el-table-column prop="teamName" label="小组" width="200"></el-table-column>
    <el-table-column prop="post" sortable label="职位" width="180"></el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'

export default {
  name: "team",
  data() {
    return {
      myInstance: null,
      tableData: [],
      employee:{}
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
    this.myInstance = axios.create({
      baseURL: 'http://localhost:8989/employee/',
      timeout: 1000
    })
    this.getData();

  },
  methods: {
    getData() {
      this.myInstance.post('findList', {
        teamName:this.employee.teamName   // 查询参数
      }).then(res => {
        this.tableData = res.data.data;    // 表格数据
        localStorage.setItem("teamMembers",JSON.stringify(this.tableData));
      })
    }
  }
}
</script>

<style scoped>

</style>
