import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import SignUp from '../components/SignUp'
import Oauth2Redirect from '../components/oauth2Redirect'
import Profile from '../components/profile'
import authentication from '../custom/authentication'
import AddStudy from '../components/addStudy'
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
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/oauth2/redirect',
      name: 'Oauth2Redirect',
      component: Oauth2Redirect,
      beforeEnter: authentication.isAuthenticated
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: authentication.isAuthenticated
    },
    {
      path: '/addstudy',
      name: 'AddStudy',
      component: AddStudy,
      beforeEnter: authentication.isAuthenticated
    }
  ]
})
