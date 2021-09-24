<template>
  <body>
    <section>
      <h1>내가 만든 <span>스터디</span>를 찾아보세요!</h1>
      <div class="study">
        <div class="row">
          <div class="one">
            <h3><span class="green">활성화</span> 스터디</h3>
          </div>
          <div class="two">
            <div class="item">
              <div class="tag"></div>
              <img src="../assets/end.png" alt="">
              <div class="desc">
                <h6>dd</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="one">
            <h3><span class="red">비활성화</span> 스터디</h3>
          </div>
          <div class="two">
            <div class="item">
              <div class="tag"></div>
              <img src="../assets/end.png" alt="">
              <div class="desc">
                <h6>dd</h6>
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
  name: 'myStudy'
}
</script>

<style scoped>
body {
  color: black;
  margin: 0px;
}
h1,h2,h3,h4,h5,h6 {
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
h1 {
  text-align: center;
  margin: 50px 0px;
  font-size: 32px;
}
h1 span {
  color: crimson;
}
h3 .green {
  color: #00ff40;
  font-weight: bold;
}
h3 .red {
  color: crimson;
  font-weight: bold;
}
.study {
  display: flex;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
}
.row {
  flex: 1;
  margin: 20px;
  display: flex;
  flex-direction: column;
}
.one {
  border: 1px solid black;
  border-radius: 8px;
  text-align: center;
  padding: 20px;
}
.two {
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 60px;
}
.item {
  margin-bottom: 30px;
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: relative;
}
.item:hover{
  opacity: 0.5;
}
.item img {
  width: 100%;
  height: 100%;
}
.desc {
  position: absolute;
  background-color: rgba(0,0,0,0.3);
  width: 100%;
  height: 30px;
  left: 0;
  bottom: 0;
  color: #eeeeee;
  padding: 5px;
  box-sizing: border-box;
  transition: 0.3s;
}
.desc h6 {
  font-size: 15px;
  text-align: center;
}
</style>
