import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index"
import Login from "../components/Login";
import Register from "../components/Register";
import BugList from "../components/bugList/BugList";
import team from "../components/Team";
import CreateBugTicket from "../components/bugList/CreateBugTicket";
import ManageBugTicket from "../components/bugList/ManageBugTicket";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/index',
      component:Index,
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