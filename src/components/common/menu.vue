<template>
<el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" router>
    <span style="float:left;padding:5px 0 0 35px"><img src="../../../static/logo.png" height="50" width="50" >
      </span>
      <span style="float:left;vertical-align:middle;padding:20px 750px 0 15px">海 囤 设 备 管 理 平 台</span>
    <el-menu-item index="search">首页</el-menu-item>
    <el-menu-item index="version">设备信息</el-menu-item>
    <el-menu-item index="repair">设备维修</el-menu-item>
    <el-menu-item index="personal">个人中心</el-menu-item>
  <el-menu-item index="/">退出</el-menu-item>
</el-menu>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>