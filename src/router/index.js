import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/index"
import Login from "../components/Login";
import Register from "../components/Register";
import BugList from "../components/bugList/BugList";
import team from "../components/Team";
import CreateBugTicket from "../components/bugList/CreateBugTicket";
import ManageBugTicket from "../components/bugList/ManageBugTicket";
import ChangeInformation from "../components/index/ChangeInformation";
import ChangePassword from "../components/index/ChangePassword";
import example from "../components/echarts/example";
import StatusChart from "../components/echarts/StatusChart";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/chart/statusChart',
      component:StatusChart,
      meta:{
        isShow:true
      }
    },
    {
      path:'/index',
      component:Index,
      meta:{
        isShow:true
      }
    },
    {
      path:'/index/changeInformation',
      component:ChangeInformation,
      meta:{
        isShow:true
      }
    },
    {
      path:'/index/changePassword',
      component:ChangePassword,
      meta:{
        isShow:true
      }
    },
    {
      path:'/bugList',
      component:BugList,
      meta:{
        isShow:true
      }
    },
    {
      path:'/bugList/createBugTicket',
      component:CreateBugTicket,
      meta:{
        isShow:true
      }
    },
    {
      path:'/bugList/manageBugTicket',
      component:ManageBugTicket,
      meta:{
        isShow:true
      }
    },
    {
      path:'/team',
      component:team,
      meta:{
        isShow:true
      }
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    }
  ]
})
