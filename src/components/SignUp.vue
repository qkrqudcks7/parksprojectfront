<template>
  <body>
    <div class="login-form">
      <h2>회원가입</h2>
      <div class="field">
        <label>Username</label><input type="text">
      </div>
      <div class="field">
        <label>Email</label><input type="email">
      </div>
      <div class="field">
        <label>Password</label><input type="password">
      </div>
      <div class="sns-login">
        <button class="btn google"><a v-bind:href="getOauthUrl('google')">Login in with Google</a></button>
        <button class="btn naver"><a v-bind:href="getOauthUrl('naver')">Login in with Naver</a></button>
        <button class="btn facebook"><a id="kakao" v-bind:href="getOauthUrl('kakao')">Login in with Kakao</a></button>
      </div>
      <div class="login">
        <button class="btn-login" @click="signup()">회원가입</button>
      </div>
    </div>
  </body>
</template>

<script>
import notification from '../custom/notification'

export default {
  name: 'SignUp',
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    getOauthUrl (platform) {
      return `${process.env.VUE_APP_API}/oauth2/authorize/${platform}?redirect_uri=http://localhost:8081/oauth2/redirect`
    },
    async signup () {
      try {
        const response = await this.axios.post('/auth/signup')
        notification.success(response, '회원가입 성공', () => {
          this.$router.push('/login')
        })
      } catch (err) {
        this.$notify({
          group: 'noti',
          type: 'error',
          duration: 6000,
          title: '회원가입 오류',
          text: '올바른 정보를 입력해주세요'
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
  background-color: #ffff00;
  color: black;
}
#kakao {
  color: black;
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
