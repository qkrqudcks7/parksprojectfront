<template>
  <div></div>
</template>

<script>
export default {
  name: 'oauth2Redirect',
  created () {
    const token = this.$route.query.token
    console.log('토큰값:', token)
    if (token) {
      this.$store.commit('setToken', token)
      this.$emit('getUserDetails')
      this.$router.push('/')
    } else {
      console.log('error')
    }
  }
}
</script>

<style scoped>

</style>
