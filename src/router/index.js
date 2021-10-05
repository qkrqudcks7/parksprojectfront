import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import SignUp from '../components/SignUp'
import Oauth2Redirect from '../components/oauth2Redirect'
import Profile from '../components/profile'
import AddStudy from '../components/addStudy'
import Login from '../components/login'
import store from '../store'
import AllStudy from '../components/allStudy'
import Study from '../components/study'
import ApplyState from '../components/applyState'
import StudyMembers from '../components/studyMembers'
import ModifyStudy from '../components/modifyStudy'
import MyStudy from '../components/myStudy'
import Alarm from '../components/alarm'

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
      component: Profile
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
    },
    {
      path: '/allstudy',
      name: 'AllStudy',
      component: AllStudy
    },
    {
      path: '/study:id',
      name: 'Study',
      component: Study
    },
    {
      path: '/applyState:id',
      name: 'ApplyState',
      component: ApplyState,
      beforeEnter: requireAuth()
    },
    {
      path: '/studymembers:id',
      name: 'StudyMembers',
      component: StudyMembers,
      beforeEnter: requireAuth()
    },
    {
      path: '/modifyStudy:id',
      name: 'ModifyStudy',
      component: ModifyStudy,
      beforeEnter: requireAuth()
    },
    {
      path: '/mystudy',
      name: 'MyStudy',
      component: MyStudy,
      beforeEnter: requireAuth()
    },
    {
      path: '/alarm',
      name: 'Alarm',
      component: Alarm,
      beforeEnter: requireAuth()
    }
  ]
})
