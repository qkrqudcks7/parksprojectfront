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
      </div>
    </div>
  </section>
  </body>
</template>

<script>
export default {
  name: 'profile'
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
  @media (max-width: 768px) {
    section {
      width: 100%;
    }
  }
</style>
