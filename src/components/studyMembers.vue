<template>
  <body>
  <section>
    <div class="admin">{{adminMessage}}</div>
    <h1>{{study.title}}</h1>
    <b-nav tabs>
      <b-nav-item @click="goStudy(study.id)">소개</b-nav-item>
      <b-nav-item active>멤버</b-nav-item>
      <b-nav-item v-if="isAdMin" @click="modify">설정하기</b-nav-item>
      <b-nav-item v-if="isAdMin" @click="applyState(study.id)">가입 현황</b-nav-item>
    </b-nav>
    <div class="row">
      <div class="columns">
        <img v-bind:src="study.image" />
      </div>
      <div class="columns">
        <div class="third">
          <label>카테고리</label>
          <input type="text" v-model="study.categorys[0]" disabled>
        </div>
        <div class="third">
          <label>관리자</label>
          <input type="text" v-model="study.managers[0]" disabled>
        </div>
        <div class="third">
          <label>지역</label>
          <input type="text" v-model="study.location" disabled>
        </div>
        <div class="third">
          <label>인원수</label>
          <div>{{study.members.length}} / {{study.maxMember}} 명</div>
        </div>
      </div>
    </div>
    <div class="row" style="border: 1px solid black">
      <label>방장 - {{study.managers[0]}}</label>
      <label>스터디 멤버</label>
      <div v-for="(i, index) in applyPeople" :key="index" class="people">
        <div class="column">
          <div class="name">{{i.userName}}</div>
          <div class="state">{{i.applyState}}</div>
          <div>일반</div>
        </div>
      </div>
    </div>
    <div class="row" style="border: 1px solid black">
      <label>스터디 단톡방</label>
      <div v-for="(i,index) in room" :key="index">
        <label>{{i.title}}</label>
        <button @click="goRoom(i.id)">바로가기</button>
      </div>
    </div>
    <!--  모달  -->
    <div class="popup-wrap" v-if="modal">
      <div class="popup">
        <div class="popup-head">
          <h1 class="head-title">{{roomInfo.title}}</h1>
        </div>
        <div class="popup-body">
          <div class="body-content">
            <div class="body-titlebox">
              <h5>메세지를 나눠보세요</h5>
            </div>
            <div class="body-contentbox" ref="messages">
              <div v-for="(i, idx) in msg" :key="idx">
                <div v-bind:class="i.style">
                  <h5 style="margin:3px">
                    {{i.name}}
                  </h5>
                  {{i.content}}
                </div>
              </div>
            </div>
            <input type="text" v-model="content" placeholder="보낼 메세지" size="100" />
          </div>
        </div>
        <div class="popup-foot">
          <span class="pop-btn confirm" id="confirm" @click="sendMessage" @keyup.enter="sendMessage">SEND</span>
          <span class="pop-btn close" @click="modalClose">창 닫기</span>
        </div>
      </div>
    </div>
  </section>
  </body>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

export default {
  name: 'studyMembers',
  data () {
    return {
      study: {categorys: [], managers: [], managersId: [], members: []},
      applyPeople: [],
      adminMessage: '',
      isAdMin: false,
      room: [],
      roomCheck: false,
      modal: false,
      roomInfo: [],
      msg: [],
      content: '',
      stompClient: null
    }
  },
  computed: {
    studyId () {
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
    applyState (id) {
      this.$router.push({name: 'ApplyState', params: {id: id}})
    },
    goStudy (id) {
      this.$router.push({name: 'Study', params: {id: id}})
    },
    modify () {
      this.$router.push({name: 'ModifyStudy', params: {id: this.studyId}})
    },
    approval (id) {
      this.axios.post(`/addapply/${id}`).then(response => {
        if (response.status === 200) {
          console.log('승인')
          this.$router.go()
        }
      })
    },
    refuse (id) {
      this.axios.delete(`/apply/${id}`).then(response => {
        if (response.status === 200) {
          console.log('거절')
          this.$router.go()
        }
      })
    },
    reload () {
      this.axios.get(`/apply/${this.studyId}`).then(response => {
        if (response.status === 200) {
          let data = []
          for (let i in response.data) {
            if (response.data[i].applyState === 'ACCEPTED') {
              data.push(response.data[i])
            }
          }
          this.applyPeople = data
          console.log(this.applyPeople)
        }
      })
    },
    goRoom (id) {
      for (let i in this.applyPeople) {
        if (this.$store.getters.user.id === this.applyPeople[i].userId) {
          this.roomCheck = true
          break
        }
      }
      if (this.isAdMin) {
        this.roomCheck = true
      }
      if (this.roomCheck) {
        this.modal = true
        this.axios.get(`/chatroom/${id}`).then(response => {
          if (response.status === 200) {
            this.roomInfo = response.data
          }
        })
        this.axios.get(`/chatroom/message/${id}`).then(response => {
          if (response.status === 200) {
            this.msg = response.data
          }
        })
        let socket = new SockJS('http://localhost:8080/ws')
        this.stompClient = Stomp.over(socket)
        this.stompClient.connect({}, frame => {
          console.log('success', frame)
          this.stompClient.subscribe(`/sub/${id}`, response => {
            let jsonBody = JSON.parse(response.body)
            console.log(jsonBody)
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
      } else {
        alert('멤버가 아니면 입장할 수 없습니다.')
      }
    },
    sendMessage () {
      if (this.content.trim() !== '' && this.stompClient != null) {
        let chatMessage = {
          'content': this.content,
          'name': this.name,
          'userId': this.userId,
          'roomId': this.roomInfo.id
        }
        this.stompClient.send('/pub/message', JSON.stringify(chatMessage), {})
        this.content = ''
      }
    },
    modalClose () {
      this.modal = false
    }
  },
  async created () {
    this.axios.get(`/chatroomlist/${this.studyId}`).then(response => {
      if (response.status === 200) {
        this.room = response.data
      }
    })
    this.axios.get(`/onestudy/${this.studyId}`).then(response => {
      if (response.status === 200) {
        this.study = response.data
        console.log(this.study)
        if (this.study.managersId[0] === this.$store.state.initialState.user.id) {
          this.adminMessage = '관리자가 입장하셨습니다.'
          this.isAdMin = true
        }
      }
    })
    await this.reload()
  }
}
</script>

<style scoped>
body {
  margin: 0px;
  font-size: 15px;
  font-weight: 300;
}
h1,h2,h3,h4,h5,h6 {
  margin: 0;
  font-weight: normal;
}
h1 {
  text-align: center;
  margin: 30px;
}
button {
  cursor: pointer;
  outline: none;
}
input {
  outline: none;
}
section {
  width: 950px;
  margin: auto;
}
.admin {
  text-align: center;
  margin: 20px;
  font-weight: bold;
  color: #dd4b39;
}
.row {
  display: flex;
  margin: 30px 0px;
}
.row label {
  margin-bottom: 10px;
  padding: 10px;
  font-weight: bold;
}
.row .columns:nth-child(1) {
  flex: 1;
  padding: 20px;
}
.row .columns:nth-child(2) {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}
.row button {
  padding: 20px;
  border: none;
  border-radius: 8px;
  background-color: crimson;
  color: white;
}
.third {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}
.third label {
  flex: 1;
  text-align: center;
  font-weight: bold;
}
.third div {
  flex: 3;
  padding: 8px;
}
.third input {
  flex: 3;
}
.columns img {
  width: 100%;
}
.people {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.people .column {
  display: flex;
  padding: 10px;
  justify-content: space-around;
}
.people .name {
  flex: 1;
}
.people .state {
  flex: 1;
}
.popup-wrap {
  background-color: rgba(0,0,0,.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
}
.popup {
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  background-color: #0388fc;
  overflow: hidden;
  box-shadow: 5px 10px 10px 1px rgba(0,0,0,.3);
}
.popup-head {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.popup-body {
  width: 100%;
  background-color:#ffffff;
}
.body-content {
  width: 100%;
  padding: 10px 20px;
}
.body-titlebox {
  text-align: center;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
}
.body-contentbox {
  height: 500px;
  overflow: auto;
}
.popup-foot {
  width: 100%;
  height: 50px;
}
.pop-btn {
  display: inline-flex;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  float: left;
  cursor: pointer;
  color: white;
}
.pop-btn.confirm {
  border-right: 1px solid white;
}
.myMsg{
  text-align: right;
}
.otherMsg{
  text-align: left;
}
@media (max-width: 768px) {
  section {
    width: 100%;
  }
}
</style>
