<template>
  <body>
    <section>
      <h2>알림</h2>
      <small>스터디를 생성, 수정, 삭제를 하면 알림을 받을 수 있습니다.</small>
      <div class="alarm">
        <div class="one">
          <div class="name"><p>알림 기록</p><b-icon icon="bell-fill" variant="warning"></b-icon>
            <small>알림을 <span style="color: crimson">클릭</span>하여 해제</small></div>
          <div class="record">
            <div class="temp" v-for="(i,index) in alarm" :key="index" @click="checkAlarm(i.id)">
              <div class="state"><span v-if="i.checked === false"><b-icon icon="bell-fill" variant="warning"/></span><span v-else><b-icon icon="bell-fill" /></span> {{studyCheck(i.notificationType)}}</div>
              <div class="title">{{i.title}}</div>
            </div>
          </div>
        </div>
        <div class="two">
          <div class="name"><span><b-icon icon="bell-fill" variant="warning"></b-icon> 전체 알림 조회</span></div>
          <div class="record">
            <div class="temp" v-for="(i,index) in alarm" :key="index">
              <div class="tempOne">
                <div class="state"><span v-if="i.checked === false"><b-icon icon="bell-fill" variant="warning"/></span><span v-else><b-icon icon="bell-fill" /></span> {{studyCheck(i.notificationType)}}</div>
                <div class="title">제목: {{i.title}}</div>
                <div class="messagwe">소개: {{i.message}}</div>
              </div>
              <div class="tempTwo">
                <div class="time">{{i.localDateTime}}</div>
                <div>&nbsp;</div>
                <div class="check">{{checked(i.checked)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
export default {
  name: 'alarm',
  data () {
    return {
      alarm: []
    }
  },
  methods: {
    studyCheck (type) {
      if (type === 'STUDY_CREATED') {
        return '스터디 생성'
      } else if (type === 'STUDY_UPDATED') {
        return '스터디 업데이트'
      } else if (type === 'STUDY_DELETE') {
        return '스터디 삭제'
      }
    },
    checked (check) {
      if (check === false) {
        return '알림 미확인'
      } else {
        return '알림 확인'
      }
    },
    checkAlarm (id) {
      this.axios.put(`/notification/${id}`).then(() => {
        this.$router.go()
      })
    }
  },
  mounted () {
    this.axios.get(`/notification`).then(response => {
      this.alarm = response.data
    })
  }
}
</script>

<style scoped>
body {
  color: black;
  margin: 0;
}
h1,h2,h3,h4,h5,h6,p {
  margin: 0;
  font-weight: normal;
}
a {
  text-decoration: none;
  color: #eeeeee;
}
button {
  cursor: pointer;
  outline: none;
}
input, textarea, select {
  outline: none;
}
section {
  width: 950px;
  margin: auto;
}
.alarm {
  display: flex;
}
h2 {
  margin: 30px 15px 10px;
}
small {
  margin: 15px 15px 30px;
}
.one {
  flex: 1;
  margin: 15px;
  display: flex;
  border: 1px solid black;
  padding: 10px;
  flex-direction: column;
}
.two {
  flex: 3;
  display: flex;
  flex-direction: column;
  margin: 15px;
}
.name {
  border: 1px solid black;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}
.name p {
  font-size: 24px;
}
.two .name span {
  font-size: 24px;
}
.record {
  display: flex;
  flex-direction: column;
}
.temp {
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
  margin-bottom: 5px;
}
.two .temp {
  display: flex;
  justify-content: space-between;
}
.one .temp:hover {
  border: 1px solid crimson;
  box-shadow: 0 0 5px crimson;
  cursor: pointer;
}
.temp .state {
  font-size: 20px;
  margin-bottom: 5px;
}
.temp .title {
  font-size: 15px;
}

@media (max-width: 768px) {
  h3 {
    font-size: 20px;
  }
  section {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  .one , .two {
    width: 100%;
  }
 /* todo */
}
</style>
