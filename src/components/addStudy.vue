<template>
<body>
<section>
  <div class="study-header">
    <h1>
      무슨 <span>스터디</span>를 만들까요?
    </h1>
    <hr>
  </div>
  <div class="study-form">
    <div class="row">
      <div class="field">
        <label>카테고리<em>*</em></label>
        <select v-model="studyRequest.parentCategoryName" @click="getChildList(studyRequest.parentCategoryName)">
          <option v-for="(i,index) in parent" :key="index" >{{ i.name }}</option>
        </select>
      </div>
      <div class="field">
        <label>세부 카테고리<em>*</em></label>
        <select v-model="studyRequest.categoryName">
          <option v-for="(i,index) in child" :key="index+'aa'">{{ i.name }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label>제목<em>*</em></label>
        <input type="text" v-model="studyRequest.title" placeholder="스터디의 제목을 입력해주세요." required>
      </div>
      <div class="field">
        <label>방장</label>
        <input type="text" v-model="this.$store.state.initialState.user.name" readonly>
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label>지역<em>*</em></label>
        <input type="text" v-model="studyRequest.location" placeholder="원하는 지역을 입력하세요" required>
      </div>
      <div class="field">
        <label>인원수<em>*</em></label>
        <input type="text" v-model="studyRequest.maxMember" placeholder="스터디 인원수를 입력하세요">
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label>URL<em>*</em></label>
        <input type="text" v-model="studyRequest.path" placeholder="공백없이 문자, 숫자, 대시(-)와 언더바(_)만으로 입력하세요." required>
      </div>
      <div class="field">
        <label for="img">배경 이미지</label>
        <input type="file" id="img" ref="bgimg" @change="selectFile" accept="image/*" />
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label>간단소개<em>*</em></label>
        <textarea rows="2" v-model="studyRequest.shortDescription" placeholder="스터디 배너에 걸릴 간단한 소개를 입력해주세요."></textarea>
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label>긴 소개<em>*</em></label>
        <ckeditor v-model="studyRequest.longDescription" :config="editorConfig"></ckeditor>
      </div>
    </div>
    <button class="btn" @click="submitStudy">만들기</button>
  </div>
</section>
</body>
</template>

<script>
import notification from '../custom/notification'

export default {
  name: 'addStudy',
  data () {
    return {
      editorConfig: {
      },
      img: '',
      studyRequest: {path: '', title: '', shortDescription: '', longDescription: '', location: '', maxMember: 0},
      child: [],
      parent: []
    }
  },
  methods: {
    async submitStudy () {
      try {
        const formData = new FormData()
        formData.append('path', this.studyRequest.path)
        formData.append('categoryName', this.studyRequest.categoryName)
        formData.append('parentCategoryName', this.studyRequest.parentCategoryName)
        formData.append('title', this.studyRequest.title)
        formData.append('shortDescription', this.studyRequest.shortDescription)
        formData.append('longDescription', this.studyRequest.longDescription)
        formData.append('location', this.studyRequest.location)
        formData.append('maxMember', this.studyRequest.maxMember)
        formData.append('multipartFile', this.img)
        const response = await this.axios.post('/study', formData)
        if (response.status === 200) {
          console.log('생성 되었습니다.')
          await this.$router.push('/')
        }
      } catch (err) {
        notification.error(err, '올바른 정보를 입력해주세요', () => {
          this.$router.push('/')
        })
      }
    },
    selectFile () {
      this.img = this.$refs.bgimg.files[0]
    },
    getChildList (name) {
      console.log(this.studyRequest.parentCategoryName)
      this.axios.get(`/category/child/${name}`).then(response => {
        if (response.status === 200) {
          this.child = response.data
          console.log(this.child)
        }
      })
    }
  },
  created () {
    this.axios.get(`/category/parent`).then(response => {
      if (response.status === 200) {
        this.parent = response.data
      }
    })
  }
}
</script>

<style scoped>
  body {
    margin: 0;
    font-size: 15px;
    font-weight: 300;
  }
  section {
    width: 950px;
    margin: auto;
  }
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    font-weight: normal;
  }
  button {
    cursor: pointer;
    outline: none;
  }
  input, textarea, select {
    outline: none;
  }
  .study-header {
    margin: 30px;
    text-align: center;
  }
  .study-header h1 {
    font-size: 32px;
  }
  .study-header h1 span {
    color: crimson;
  }
  .study-header hr {
    border: none;
    height: 3px;
    background-color: skyblue;
    margin: 25px auto;
  }
  .study-form {
    margin-top: 30px;
  }
  .study-form label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .study-form label em {
    color: red;
  }
  .row {
    display: flex;
    margin: 10px 0;
  }
  .row .field {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 30px;
  }
  .row .field input:hover,
  .row .field textarea:hover {
    border: 1px solid skyblue;
    box-shadow: 0 0 5px skyblue;
  }
  .row .field input:focus,
  .row .field textarea:focus {
    border: 1px solid skyblue;
    box-shadow: 0 0 5px skyblue;
  }
  .row .field input,
  .row .field textarea {
    padding: 7px;
    border-radius: 3px;
    transition: 0.3s;
  }
  .btn {
    width: 97.5%;
    border: 1px solid #555;
    background-color: white;
    padding: 7px 50px;
    display: block;
    margin: auto;
  }
  .btn:hover {
    border: 1px solid skyblue;
    box-shadow: 0 0 5px skyblue;
  }
  #img {
    border: 1px solid black;
  }
  @media (max-width: 768px) {
    section {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
    .study-header {
      font-size: 20px;
    }
    .row {
      flex-direction: column;
    }
    .row .field {
      margin: 10px 0;
    }
    .btn {
      width: 95%;
    }
  }
</style>
