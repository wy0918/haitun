<template>
<el-container>
  <el-header style="padding:0">
<navBar></navBar>
  </el-header>
  <el-main id="content">
    <router-view></router-view>
  </el-main>
</el-container>
</template>

<script>
import navBar from './common/menu.vue'
export default {
  data() {
      return {
        activeIndex: 'search',
        activeIndex2: 'search'
      };
    },
    components:{
      navBar
    },
    methods: {
      handleSelect(key, keyPath) {
                console.log(key, keyPath);
              }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
  text-decoration-line: none
}
#content {
  height: 732px;
  padding: 0;
}
</style>
