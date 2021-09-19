<template>
  <body>
  <section>
    <div class="admin">{{adminMessage}}</div>
    <h1>{{study.title}}</h1>
    <b-nav tabs>
      <b-nav-item @click="goStudy(study.id)">소개</b-nav-item>
      <b-nav-item active>멤버</b-nav-item>
      <b-nav-item v-if="isAdMin">설정하기</b-nav-item>
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
  </section>
  </body>
</template>

<script>
export default {
  name: 'studyMembers',
  data () {
    return {
      study: {categorys: [], managers: [], managersId: [], members: []},
      applyPeople: [],
      adminMessage: '',
      isAdMin: false
    }
  },
  computed: {
    studyId () {
      return this.$route.params.id
    }
  },
  methods: {
    applyState (id) {
      this.$router.push({name: 'ApplyState', params: {id: id}})
    },
    goStudy (id) {
      this.$router.push({name: 'Study', params: {id: id}})
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
    }
  },
  async created () {
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
@media (max-width: 768px) {
  section {
    width: 100%;
  }
}
</style>
