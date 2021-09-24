<template>
  <body>
    <section>
      <h2>알림</h2>
      <small>스터디를 생성, 수정, 삭제를 하면 알림을 받을 수 있습니다.</small>
      <div class="alarm">
        <div class="one">
          <div class="name">
            알림 기록
          </div>
          <div class="record">
            <div class="temp">dd</div>
            <div class="temp">dd</div>
            <div class="temp">dd</div>
            <div class="temp">dd</div>
            <div class="temp">dd</div>
            <div class="temp">dd</div>
            <div class="temp">dd</div>
          </div>
        </div>
        <div class="two">
          dd
        </div>
      </div>
    </section>
  </body>
</template>

<script>
export default {
  name: 'alarm'
}
</script>

<style scoped>
body {
  color: black;
  margin: 0;
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
  flex-direction: column;
}
.two {
  flex: 3;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin: 15px;
}
.name {
  border: 1px solid black;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
}
.record {
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
</style>
