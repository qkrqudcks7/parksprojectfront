<template>
<body>
<section>
  ##
</section>
</body>
</template>

<script>
export default {
  name: 'chatRoom',
  data () {
    return {
      room: {}
    }
  },
  computed: {
    roomId () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.axios.get(`/chatroom/${this.roomId}`).then(response => {
      if (response.status === 200) {
        this.room = response.data
        console.log(this.room)
      }
    })
  }
}
</script>

<style scoped>

</style>
