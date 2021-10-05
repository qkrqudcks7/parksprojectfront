<template>
  <body>
    <div class="login-form">
      <h2>로그인</h2>
      <div class="field">
        <label>Email</label><input type="email" v-model="user.email">
      </div>
      <div class="field">
        <label>Password</label><input type="password" v-model="user.password">
      </div>
      <div class="sns-login">
        <button class="btn google"><a v-bind:href="getOauthUrl('google')">Login in with Google</a></button>
        <button class="btn naver"><a v-bind:href="getOauthUrl('naver')">Login in with Naver</a></button>
        <button class="btn facebook"><a v-bind:href="getOauthUrl('kakao')">Login in with Kakao</a></button>
      </div>
      <div class="login">
        <button class="btn-login" @click="login()">로그인</button>
      </div>
      <span><a id="signup" href="/signup">계정이 없으신가요? 회원가입 하세요!</a></span>
    </div>
  </body>
</template>

<script>
import notification from '../custom/notification'
export default {
  name: 'login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    getOauthUrl (platform) {
      return `${process.env.VUE_APP_API}/oauth2/authorize/${platform}?redirect_uri=http://localhost:8081/oauth2/redirect`
    },
    async login () {
      try {
        const response = await this.axios.post('/auth/login', this.user)
        notification.success(response, '로그인 성공', () => {
          this.$store.commit('setToken', response.data.accessToken)
          this.$emit('getUserDetails')
          this.$router.push('/')
        })
      } catch (err) {
        this.$notify({
          group: 'noti',
          type: 'error',
          duration: 6000,
          title: '로그인 실패',
          text: '아이디와 비밀번호를 확인해주세요!.'
        })
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  line-height: 1.5em;
  margin: 0;
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 93.5vh;
  padding: 20px;
}
a{
  text-decoration: none;
  color: white;
}
#signup {
  color: black;
}
#signup:hover{
  color: skyblue;
  font-weight: bold;
}
h1,h2,h3,h4,h5,h6 {
  margin: 0;
}
button {
  cursor: pointer;
  outline: none;
}
.login-form {
  width: 600px;
  background-color: white;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0 20px #eee;
}
.login-form h2 {
  font-size: 32px;
  /* 단어의 첫번째 글자를 대문자로 */
  text-transform: capitalize;
}
.sns-login {
  padding: 20px 0;
  display: flex;
}
.btn {
  flex: 1;
  margin: 3px;
  padding: 10px;
  border: none;
  color: white;
  font-size: 11px;
  border-radius: 3px;
}
.btn.facebook {
  background-color: #3b5999;
}
.btn.naver {
  background-color: #03fc28;
}
.btn.google {
  background-color: #dd4b39;
}
.field {
  display: flex;
  margin: 20px 0;
}
.field label {
  flex: 1;
  text-transform: capitalize;
}
.field input {
  flex: 4;
  border: 1px solid #dddddd;
  padding: 5px;
  border-radius: 3px;
}
.login {
  display: flex;
  justify-content: flex-end;

}
.btn-login {
  padding: 5px 40px;
  border: none;
  font-family: 'Monstserrat';
  font-size: 13px;
  border-radius: 3px;
  color: white;
  background-color: royalblue;
}

@media (max-width: 768px) {
  .login-form {
    width: 100%;
  }
  .sns-login {
    flex-direction: column;
  }
  .btn {
    margin: 5px 0;
  }
  .field {
    flex-direction: column;
  }
  .btn-login {
    width: 100%;
  }
}
</style>
