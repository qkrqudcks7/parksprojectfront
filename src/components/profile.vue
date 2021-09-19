<template>
  <body>
  <section>
    <h1>내 프로필</h1>
    <hr>
    <div class="row">
      <div class="columns" v-if="this.$store.getters.user">
        <img v-bind:src="this.$store.getters.user.imageUrl" v-bind:alt="this.$store.getters.user.name" />
      </div>
      <div class="columns" v-if="this.$store.getters.user">
        <div class="third">
          <label>이름</label>
          <input type="text" :value="this.$store.getters.user.name" disabled>
        </div>
        <div class="third">
          <label>아이디</label>
          <input type="text" :value="this.$store.getters.user.email" disabled>
        </div>
        <div class="third">
          <label>지역</label>
          <input type="text" v-model="InfoResponse.location">
        </div>
        <div class="third">
          <label>직업</label>
          <input type="text" v-model="InfoResponse.occupation">
        </div>
        <div class="third">
          <label>한 줄 소개</label>
          <input type="text" v-model="InfoResponse.bio">
        </div>
      </div>
    </div>
    <div class="button">
      <button class="btn" @click="info">내 정보 수정하기</button>
    </div>
    <div class="row">
      <h3>가입된 스터디</h3>
      <div class="study">
        <div class="item" v-for="(i,index) in study" :key='index' @click="goStudy(i.id)">
          <div class="third">
            <img :src="i.image" alt="">
            <label>{{i.title}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <h3>가입 신청 대기 스터디</h3>
      <div class="study">
        <div class="third">
          <label>스터디</label>
          <input type="text" disabled>
        </div>
      </div>
    </div>
  </section>
  </body>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      InfoResponse: {location: '', occupation: '', bio: ''},
      waitingStudy: [],
      acceptedStudy: [],
      study: []
    }
  },
  methods: {
    goStudy (id) {
      this.$router.replace({name: 'Study', params: {id: id}})
    },
    async info () {
      console.log(this.InfoResponse)
      const response = await this.axios.put('/user/info', this.InfoResponse)
      if (response.status === 200) {
        this.$router.go()
      }
    }
  },
  async mounted () {
    const response = await this.axios.get('/user/info')
    if (response.status === 200) {
      this.InfoResponse.location = response.data.location
      this.InfoResponse.occupation = response.data.occupation
      this.InfoResponse.bio = response.data.bio
    }

    const result = await this.axios.get(`/user/study`)
    if (result.status === 200) {
      this.study = result.data
      console.log(this.study)
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
    margin-top: 30px;
  }
  hr {
    height: 3px;
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
  .row {
    display: flex;
    margin-top: 30px;
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
  .row .columns h3 {
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
    border: 1px solid black;
    border-radius: 8px;
  }
  .row h3 {
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
    border: 1px solid black;
    border-radius: 8px;
  }
  .study {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .item {
    display: flex;
    width: 150px;
    height: 150px;
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
  .button {
    display: flex;
    justify-content: center;
  }
  .button button {
    border: 1px solid #555;
    background-color: white;
    padding: 7px 50px;
    display: block;
    margin: auto;
  }
  .button button:hover {
    border: 1px solid skyblue;
    box-shadow: 0 0 5px skyblue;
  }
  @media (max-width: 768px) {
    section {
      width: 100%;
    }
  }
</style>
