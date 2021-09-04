<template>
  <header>
    <nav>
      <div class="logo">
        <a href="#"><img src="logo.png"></a>
      </div>
      <ul class="gnb">
        <li><a href="#">Home</a></li>
        <li><a href="#">Awards</a></li>
        <li><a href="#">LocaRegistrationtion</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div class="sns" v-if="this.$store.getters.authenticated">
        <a href="/profile">프로필</a>
        <a @click="logout">로그아웃</a>
      </div>
      <div class="sns" v-else>
        <a href="#">로그인</a>
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
      ready: false
    }
  },
  methods: {
    logout () {
      this.$emit('logout')
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
.logo {

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
  margin: 10px;
  color: white;
}
.gnb li a:hover{
  color: black;
}
.sns {
  text-align: center;
}
.sns a {
  color: white;
  margin: 5px;
}
.sns a:hover {
  color: black;
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
