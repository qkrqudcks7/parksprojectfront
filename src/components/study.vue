<template>
  <body>
  <section>
    <div class="admin">{{adminMessage}}</div>
    <div class="admin">{{alreadyMessage}}</div>
    <h1>{{study.title}}</h1>
    <b-nav tabs>
      <b-nav-item active>소개</b-nav-item>
      <b-nav-item @click="goMember">멤버</b-nav-item>
      <b-nav-item v-if="isAdMin" @click="modify">설정하기</b-nav-item>
      <b-nav-item v-if="isAdMin" @click="applyState">가입 현황</b-nav-item>
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
<!--          <input type="text" v-model="study.maxMember" disabled>-->
        </div>
      </div>
    </div>
    <div class="row">
      <label>짧은 소개</label>
      <input type="text" v-model="study.shortDescription" disabled>
    </div>
    <div class="row">
      <label>스터디 소개</label>
      <div class="ckeditor">
        <ckeditor type="inline" v-model="study.longDescription" readOnly></ckeditor>
      </div>
    </div>
    <div v-if="isNotFull">
      <div class="row" v-if="!this.isAdMin">
        <button @click="openModal" ref='apply'>지원하기</button>
      </div>
      <div class="row" v-if="this.already">
        <button>이미 지원 했습니다</button>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <button>인원이 마감되었습니다</button>
      </div>
    </div>
    <!--  모달  -->
    <div class="popup-wrap" v-if="modal">
      <div class="popup">
        <div class="popup-head">
          <h1 class="head-title">가입 신청서</h1>
        </div>
        <div class="popup-body">
          <div class="body-content">
            <div class="body-titlebox">
              <h5>간단한 신청 메세지를 작성해주세요!</h5>
            </div>
            <div class="body-contentbox">
              <textarea v-model="applyStudyRequest.message" cols="48" rows="5"></textarea>
            </div>
          </div>
        </div>
        <div class="popup-foot">
          <span class="pop-btn confirm" id="confirm" @click="apply">지원하기</span>
          <span class="pop-btn close" @click="modalClose">창 닫기</span>
        </div>
      </div>
    </div>
  </section>
  </body>
</template>

<script>
import notification from '../custom/notification'

export default {
  name: 'study',
  data () {
    return {
      study: {categorys: [], managers: [], managersId: [], members: []},
      adminMessage: '',
      isAdMin: false,
      modal: false,
      applyStudyRequest: {message: ''},
      already: false,
      applyPeople: [],
      alreadyMessage: '',
      isNotFull: true
    }
  },
  computed: {
    studyId () {
      return this.$route.params.id
    }
  },
  methods: {
    goMember () {
      this.$router.push({name: 'StudyMembers', params: {id: this.studyId}})
    },
    openModal () {
      if (this.$store.state.initialState.user === null) {
        this.$router.push('/login')
      }
      this.modal = true
    },
    modalClose () {
      this.modal = false
    },
    async apply () {
      try {
        const result = await this.axios.post(`/apply/${this.studyId}`, this.applyStudyRequest)
        notification.success(result, '신청 성공', () => {
          this.modal = false
          this.$router.push('/allstudy')
        })
      } catch (error) {
        this.$notify({
          group: 'noti',
          type: 'error',
          duration: 6000,
          title: '신청 실패',
          text: '신청상 오류가 생겼습니다.'
        })
      }
    },
    applyState () {
      this.$router.push({name: 'ApplyState', params: {id: this.studyId}})
    },
    modify () {
      this.$router.push({name: 'ModifyStudy', params: {id: this.studyId}})
    }
  },
  created () {
    this.axios.get(`/onestudy/${this.studyId}`).then(response => {
      if (response.status === 200) {
        this.study = response.data
        console.log(this.study)
        if (this.study.managersId[0] === this.$store.state.initialState.user.id) {
          this.adminMessage = '관리자가 입장하셨습니다.'
          this.isAdMin = true
        }
        this.isNotFull = this.study.members.length < this.study.maxMember
      }
    })
    if (this.$store.state.initialState.user !== null) {
      this.axios.get(`/apply/${this.studyId}`).then(response => {
        if (response.status === 200) {
          this.applyPeople = response.data
          console.log(this.applyPeople)
          console.log(this.$store.state.initialState.user.id)
          for (let i in response.data) {
            if (response.data[i].userId === this.$store.state.initialState.user.id) {
              console.log('통과')
              this.already = true
              this.$refs.apply.hidden = true
            }
            if (response.data[i].userId === this.$store.state.initialState.user.id && response.data[i].applyState === 'ACCEPTED') {
              this.alreadyMessage = '가입된 스터디입니다!'
            }
          }
        }
      })
    }
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
  margin-top: 30px;
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
.ckeditor {
  border: 1px solid black;
  border-radius: 5px;
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
  /* 단어가 잘리지 않음 */
  word-break: break-word;
  min-height: 100px;
  max-height: 200px;
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
@media (max-width: 768px) {
  section {
    width: 100%;
  }
}
</style>
