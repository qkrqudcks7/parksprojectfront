<template>
  <body>
  <section>
    <div class="admin">{{message}}</div>
    <h1>{{study.title}}</h1>
    <b-nav tabs>
      <b-nav-item active>소개</b-nav-item>
      <b-nav-item>멤버</b-nav-item>
      <b-nav-item>Another Link</b-nav-item>
      <b-nav-item disabled>Disabled</b-nav-item>
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
          <label>짧은 소개</label>
          <input type="text" v-model="study.shortDescription" disabled>
        </div>
      </div>
    </div>
    <div class="row">
      <label>긴 소개</label>
      <ckeditor type="inline" v-model="study.longDescription" readOnly = true></ckeditor>
    </div>
  </section>
  </body>
</template>

<script>
export default {
  name: 'study',
  data () {
    return {
      study: {managers: [], managersId: []},
      message: ''
    }
  },
  computed: {
    studyId () {
      return this.$route.params.id
    }
  },
  created () {
    this.axios.get(`/onestudy/${this.studyId}`).then(response => {
      if (response.status === 200) {
        this.study = response.data
        console.log(this.study)
        if (this.study.managersId[0] === this.$store.state.initialState.user.id) {
          this.message = '관리자가 입장하셨습니다.'
        }
      }
    })
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
.third input {
  flex: 3;
}
.columns img {
  width: 100%;
}

@media (max-width: 768px) {
  section {
    width: 100%;
  }
}
</style>
