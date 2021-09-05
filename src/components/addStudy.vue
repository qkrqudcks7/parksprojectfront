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
        <label>제목<em>*</em></label>
        <input type="text" placeholder="스터디의 제목을 입력해주세요." required>
      </div>
      <div class="field">
        <label>방장</label>
        <input type="text" readonly>
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label>URL<em>*</em></label>
        <input type="text" placeholder="공백없이 문자, 숫자, 대시(-)와 언더바(_)만으로 입력하세요." required>
      </div>
      <div class="field">
        <label>배경 이미지<em>*</em></label>
        <input type="file" id="file">
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label>간단소개<em>*</em></label>
        <textarea rows="2" placeholder="스터디 배너에 걸릴 간단한 소개를 입력해주세요."></textarea>
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label>긴 소개<em>*</em></label>
        <textarea rows="10" placeholder="스터디에 관한 상세내용을 입력해주세요."></textarea>
      </div>
    </div>
    <button class="btn">만들기</button>
  </div>
</section>
</body>
</template>

<script>
export default {
  name: 'addStudy'
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
    border: 1px solid #555;
    background-color: white;
    padding: 7px 50px;
    display: block;
    margin: auto;
  }
  #file {
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
      width: 100%;
    }
  }
</style>
