import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import SignUp from '../components/SignUp'
import Oauth2Redirect from '../components/oauth2Redirect'
import Profile from '../components/profile'
import AddStudy from '../components/addStudy'
import Login from '../components/login'
import store from '../store'

Vue.use(Router)

const requireAuth = () => (to, from, next) => {
  if (store.state.initialState.user) {
    return next()
  }
  next('/login')
}

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
      component: Oauth2Redirect
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: requireAuth()
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/addstudy',
      name: 'AddStudy',
      component: AddStudy,
      beforeEnter: requireAuth()
    }
  ]
})
