<template>
  <div id="app">
    <notifications group = "noti" possition = "bottom center" />
    <app-header @logout = 'logout' />
    <router-view @getUserDetails = 'getUserDetails' />
  </div>
</template>

<script>
import appHeader from './components/header'
import notification from './custom/notification'
export default {
  name: 'App',
  components: {
    appHeader
  },
  created () {
    this.getUserDetails()
  },
  methods: {
    async getUserDetails () {
      try {
        const token = this.$store.getters.token
        if (token == null || token === 'null' || token === '') {
          return
        }
        console.log('토큰:' + token)
        const response = await this.axios.get('/user/me')
        if (response.status === 200) {
          this.$store.commit('setUserDetail', response.data)
        }
      } catch (err) {
        notification.error(err, '사용자 정보를 불러올 수 없습니다.', () => {
          this.logout()
        })
      }
    },
    logout () {
      this.$store.commit('setToken', null)
      this.$store.commit('setUserDetail', null)
      this.$router.replace('/')
    }
  }
}
</script>

<style>
</style>
