<template>
  <div>
    <el-table :data="tableData" style="width: 100%"  @row-click="bugTicketDetails">
      <el-table-column prop="bugId" label="编号" width="300"></el-table-column>
      <el-table-column prop="title" label="题目" width="300"></el-table-column>
      <el-table-column prop="submitName" label="创建人" width="120"></el-table-column>
      <el-table-column prop="designateName" label="指派人" width="120"></el-table-column>
      <el-table-column prop="statusName" label="状态" width="120"></el-table-column>
      <el-table-column prop="bugLevel" label="级别" width="120"></el-table-column>
    </el-table>
    <el-row>
      <el-button type="primary"><router-link to="/bugList/createBugTicket">添加</router-link></el-button>
    </el-row>

  </div>
</template>

<script>
import axios from 'axios'

  export default {
    name: "BugList.vue",
    data() {
      return {
        myInstance: null,
        tableData: []
      }
    },

    created() {
      this.myInstance = axios.create({
        baseURL: 'http://localhost:8989/bugTicket/',
        timeout: 1000
      })
      this.getData()
    },

    methods: {
      getData() {
        this.myInstance.post('findList', {
          params: {
            query: '',    // 查询参数
          }
        }).then(res => {
          this.tableData = res.data.data    // 表格数据
          console.log(res.data)
        })
      },
      bugTicketDetails(row, event, column){
        console.log(row);
        //console.log(event);
        localStorage.setItem("bugTicket",JSON.stringify(row));
        this.$router.push("bugList/manageBugTicket");

      }
    }
  }
</script>
