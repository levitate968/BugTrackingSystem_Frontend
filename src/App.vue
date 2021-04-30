<template>
  <div id="app">
    <el-container>
      <el-header v-show="$route.meta.isShow">
        <el-menu  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#34314c"
                  text-color="#fff"
                  active-text-color="#ffc952">
<!--                  background-color="#64B0FF"-->
<!--                  text-color="#6E6B93"-->
<!--                  active-text-color="#FFFFFF"-->

          <el-menu-item index="/index">个人中心</el-menu-item>
          <el-menu-item index="/bugList">缺陷清单</el-menu-item>
          <el-menu-item index="/team">我的小组</el-menu-item>

          <el-submenu>
            <template slot="title">数据跟踪</template>
            <el-menu-item index="/chart/statusChart">完成情况</el-menu-item>
            <el-menu-item index="/chart/employeeChart">解决数量</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: this.$route.path,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push(key);
    },
  },
}
</script>

<style>

</style>
