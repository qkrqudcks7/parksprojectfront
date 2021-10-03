<template>
<body>
<section>
  <div class="room">
    <h1>{{room.title}}</h1>
    <hr />
    <div v-for="(i, idx) in msg" :key="idx">
      <div v-bind:class="i.style">
        <h5 style="margin:3px">
          {{i.name}}
        </h5>
        {{i.content}}
      </div>
    </div>
    <hr />
    <input type="text" v-model="content" placeholder="보낼 메세지" size="100" />
    <button @click="sendMessage()"> SEND</button>
  </div>
</section>
</body>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

export default {
  name: 'chatRoom',
  data () {
    return {
      room: {},
      content: '',
      msg: [],
      stompClient: null
    }
  },
  computed: {
    roomId () {
      return this.$route.params.id
    },
    name () {
      return this.$store.getters.user.name
    },
    userId () {
      return this.$store.getters.user.id
    }
  },
  methods: {
    sendMessage () {
      if (this.content.trim() !== '' && this.stompClient != null) {
        let chatMessage = {
          'content': this.content,
          'name': this.name,
          'userId': this.userId,
          'roomId': this.roomId
        }
        this.stompClient.send('/pub/message', JSON.stringify(chatMessage), {})
        this.content = ''
      }
    }
  },
  mounted () {
    this.axios.get(`/chatroom/${this.roomId}`).then(response => {
      if (response.status === 200) {
        this.room = response.data
      }
    })
    this.axios.get(`/chatroom/message/${this.roomId}`).then(response => {
      if (response.status === 200) {
        this.msg = response.data
        console.log(this.msg)
      }
    })
    let socket = new SockJS('http://localhost:8080/ws')
    this.stompClient = Stomp.over(socket)
    this.stompClient.connect({}, frame => {
      console.log('success', frame)
      this.stompClient.subscribe(`/sub/${this.roomId}`, response => {
        let jsonBody = JSON.parse(response.body)
        let m = {
          'content': jsonBody.content,
          'name': jsonBody.name,
          'style': jsonBody.userId === this.userId ? 'myMsg' : 'otherMsg'
        }
        this.msg.push(m)
      })
    }, error => {
      console.log('fail', error)
    })
  }
}
</script>

<style scoped>
.myMsg{
  text-align: right;
  color : gray;
}
.otherMsg{
  text-align: left;
}
</style>
