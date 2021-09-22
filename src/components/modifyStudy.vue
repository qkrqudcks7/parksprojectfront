<template>
  <body>
  <section>
    <div class="admin">{{adminMessage}}</div>
    <h1><input class="input" type="text" v-model="study.title"></h1>
    <b-nav tabs>
      <b-nav-item @click="goStudy(study.id)">소개</b-nav-item>
      <b-nav-item @click="goMember(study.id)">멤버</b-nav-item>
      <b-nav-item v-if="isAdMin" active>설정하기</b-nav-item>
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
          <input type="text" v-model="study.location">
        </div>
        <div class="third">
          <label>인원수</label>
          <div>{{study.members.length}} / {{study.maxMember}} 명</div>
        </div>
        <div class="third">
          <label>스터디 상태</label>
          <div class="radio">
            <b-form-radio v-model="study.published" :aria-describedby="ariaDescribedby" name="some-radios" value="true">&nbsp;&nbsp;활성화</b-form-radio>
            <b-form-radio v-model="study.published" :aria-describedby="ariaDescribedby" name="some-radios" value="false">&nbsp;&nbsp;비활성화</b-form-radio>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <label>짧은 소개</label>
      <input type="text" v-model="study.shortDescription">
    </div>
    <div class="row">
      <label>스터디 소개</label>
      <div class="ckeditor">
        <ckeditor v-model="study.longDescription" ></ckeditor>
      </div>
    </div>
    <div class="row">
      <button @click="modify">수정하기</button>
    </div>
  </section>
  </body>
</template>

<script>
// import notification from '../custom/notification'

export default {
  name: 'modifyStudy',
  data () {
    return {
      study: {categorys: [], managers: [], managersId: [], members: []},
      adminMessage: '',
      isAdMin: false,
      applyStudyRequest: {message: ''},
      applyPeople: []
    }
  },
  computed: {
    studyId () {
      return this.$route.params.id
    }
  },
  methods: {
    goStudy (id) {
      this.$router.push({name: 'Study', params: {id: id}})
    },
    goMember (id) {
      this.$router.push({name: 'StudyMembers', params: {id: id}})
    },
    applyState () {
      this.$router.push({name: 'ApplyState', params: {id: this.studyId}})
    },
    modify () {

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
      }
    })
    if (this.$store.state.initialState.user !== null) {
      this.axios.get(`/apply/${this.studyId}`).then(response => {
        if (response.status === 200) {
          this.applyPeople = response.data
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
h1{
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
  padding: 0;
}
.radio {
  display: flex;
}
@media (max-width: 768px) {
  section {
    width: 100%;
  }
  .row label {
    text-align: center;
  }
}
</style>
