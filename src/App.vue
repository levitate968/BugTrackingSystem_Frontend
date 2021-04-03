<template>
  <div id="app">
    <el-container>
      <el-header v-show="$route.meta.isShow">
        <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/index">个人中心</el-menu-item>
          <el-menu-item index="/bugList">缺陷清单</el-menu-item>
          <el-menu-item index="/team">我的小组</el-menu-item>
<!--          <el-menu-item index="/logout">退出登录</el-menu-item>-->
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
