<template>
  <div></div>
</template>

<script>
export default {
  name: 'oauth2Redirect',
  created () {
    const token = this.$route.query.token
    console.log(token)
    if (token) {
      this.$store.commit('setToken', token)
      this.$emit('getUserDetails')
      this.$router.replace('/profile')
    } else {
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>

</style>
