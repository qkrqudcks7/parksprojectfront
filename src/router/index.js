import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Login from '../components/Login'
import Oauth2Redirect from '../components/oauth2Redirect'
import Profile from '../components/profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/oauth2/redirect',
      name: 'Oauth2Redirect',
      component: Oauth2Redirect
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
