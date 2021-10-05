<template>
  <header>
    <nav>
      <div class="logo">
        <a href="/">My Study</a>
      </div>
      <ul class="gnb">
        <li><a href="/allstudy">스터디 찾아보기</a></li>
        <li><a href="/addStudy">스터디 만들기</a></li>
        <li><a href="/mystudy">내가 만든 스터디</a></li>
        <li><a href="/alarm"><b-icon v-if="this.alarmCheck" icon="bell-fill"/> <b-icon v-else icon="bell-fill" variant="warning"/> 알림</a></li>
      </ul>
      <div class="sns" v-if="this.$store.getters.authenticated">
        <a href="/profile">프로필</a>
        <a @click="logout">로그아웃</a>
      </div>
      <div class="sns" v-else>
        <a href="/login">로그인</a>
        <a href="/signup">회원가입</a>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'hheader',
  data () {
    return {
      ready: false,
      alarmCheck: false
    }
  },
  methods: {
    logout () {
      this.$emit('logout')
    }
  },
  mounted () {
    if (this.$store.getters.user) {
      this.axios.get(`/notification`).then(response => {
        for (let i in response.data) {
          if (response.data[i].checked === false) {
            this.alarmCheck = false
            break
          } else {
            this.alarmCheck = true
          }
        }
      })
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #222;
}
h1,h2,h3,h4,h5,h6 {
  margin: 0;
}
button {
  cursor: pointer;
  outline: none;
}
header {
  background-color: #0388fc;
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
}
nav {
  width: 1280px;
  display: flex;
  justify-content: space-between;

}
.logo a{
  color: white;
  position: relative;
  padding-bottom: 8px;
}
.logo a:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #eeeeee;
  transform: translateX(-50%);
  left: 50%;
  bottom: 0;
  transition: 0.3s;
}
.logo a:hover:after {
  width: 100%;
}
.logo img {
  filter: invert();

}
.gnb {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}
.gnb li {
}
.gnb li a{
  margin: 10px 50px;
  color: white;
  position: relative;
  padding-bottom: 8px;
}
.gnb li a:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #eeeeee;
  transform: translateX(-50%);
  left: 50%;
  bottom: 0;
  transition: 0.3s;
}
.gnb li a:hover:after{
  width: 100%;
}
.sns {
  text-align: center;
}
.sns a {
  color: white;
  margin: 5px 20px;
  position: relative;
  padding-bottom: 8px;
}
.sns a:after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #eeeeee;
  transform: translateX(-50%);
  left: 50%;
  bottom: 0;
  transition: 0.3s;
}
.sns a:hover:after {
  width: 100%;
}

@media (max-width: 768px) {
  header {
    height: auto;
  }
  nav {
    width: 100%;
    flex-direction: column;
    position: relative;
  }
  .logo {
    padding: 10px;
  }
  .gnb {
    flex-direction: column;
    text-align: center;
    border-top: 1px solid rgba(0,0,0,0.1);
  }
  .gnb li a{
    display: block;
    padding: 8px;
    margin: 0px;
  }
  .sns {
    background-color: #74b9ff;
    padding: 7px;
  }
  .sns a {
    color: black;
  }
  .gnb.sns {
    display: none;
  }
}
</style>
