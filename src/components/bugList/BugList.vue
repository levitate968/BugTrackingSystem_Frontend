<template>
  <div>
    <el-table stripe style="width: 100%"  @row-click="bugTicketDetails"
              :data="tableData.filter(data => !search || data.designateName.toLowerCase().includes(search.toLowerCase()))">
      <el-table-column prop="bugId" label="编号" width="300"></el-table-column>
      <el-table-column prop="title" label="题目" width="300"></el-table-column>
      <el-table-column prop="submitName" label="创建人" width="120"></el-table-column>
      <el-table-column prop="designateName" label="处理人" width="120"></el-table-column>
      <el-table-column prop="statusName" sortable label="状态" width="120"></el-table-column>
      <el-table-column prop="bugLevel" sortable label="级别" width="120"></el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="处理人搜索"/>
        </template>
      </el-table-column>

    </el-table>
    <el-row>
      <el-button type="primary" v-on:click="goCreate">添加</el-button>
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
        tableData: [],
        search: '',
        employee:{},
        query:{},
      }

    },

    created() {
      this.getData()
    },

    methods: {
      getData() {
        var employeeString=localStorage.getItem("employee");
        this.employee=JSON.parse(employeeString);
        this.query.userId=this.employee.empId;

        this.$http.post("http://localhost:8989/bugTicket/findListByOrder", this.query).then(res => {
          console.log(res.data);
          if(res.data.code=="000"){
            console.log(res.data.data);
            this.tableData = res.data.data;
          }else{
            alert(res.data.data);
          }
        });
      },
      bugTicketDetails(row, event, column){
        console.log(row);
        localStorage.setItem("bugTicket",JSON.stringify(row));
        this.$router.push("bugList/manageBugTicket");
      },
      goCreate(){
        this.$router.push("bugList/createBugTicket");
      }
    }
  }
</script>
