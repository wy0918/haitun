import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/common/login.vue'
import Home from '@/components/home.vue'
import Search from '@/components/userAdmin/search.vue'
import Version from '@/components/userAdmin/version.vue'
import VersionDetail from '@/components/userAdmin/versionDetail.vue'
import Repair from '@/components/userAdmin/repair.vue'
import Personal from '@/components/userAdmin/personal.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name:'home',
      component: Home,
      redirect: '/home/search',
      children: [
        { path: 'search', component: Search, name: 'search' },
        { path: 'repair', component: Repair, name: 'repair' },
        { 
          path: 'version', 
          component: Version, 
          name: 'version' 
        },
        { path: 'versionDetail', component: VersionDetail, name: 'versionDetail'},
        { path: 'personal', component: Personal, name: 'personal' },
      ]
    }
  ]
})
