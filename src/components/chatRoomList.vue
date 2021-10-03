<template>
<body>
  <section>
    <div v-for="(i,index) in room" :key="index">
      <label>{{i.title}}</label>
      <button @click="goRoom(i.id)">바로가기</button>
    </div>
  </section>
</body>
</template>

<script>
export default {
  name: 'ChatRoomList',
  data () {
    return {
      room: []
    }
  },
  methods: {
    goRoom (id) {
      this.$router.push({name: 'Chatroom', params: {id: id}})
    }
  },
  mounted () {
    this.axios.get('/chatroom').then(response => {
      if (response.status === 200) {
        this.room = response.data
      }
    })
  }
}
</script>

<style scoped>

</style>
