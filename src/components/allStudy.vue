<template>
  <body>
  <section>
    <div class="name">
      여러가지 <span>스터디</span>를 찾아보세요!
    </div>
    <div class="search-box">
      <input type="text" placeholder="Search">
      <button>검색</button>
    </div>
    <div class="category-box">
      <div class="child" v-for="(i,index) in parent" :key="index">{{i.name}}</div>
    </div>
    <div class="items">
      <div class="item" v-for="(i,index) in study" :key='index' @click="goStudy(i.id)">
        <div class="tag">{{i.categorys[1]}} - {{i.categorys[0]}}</div>
        <img :src="i.image" alt="">
        <div class="desc">
          <h6>{{i.title}}</h6>
          <div class="like">
          <span>
            <i class="fa fa-heart"></i> {{i.shortDescription}}
          </span>
            <span>
            <i class="fa fa-share-alt"></i> {{i.managers[0]}}
          </span>
          </div>
        </div>
      </div>
    </div>
  </section>
  </body>
</template>

<script>
export default {
  name: 'allStudy',
  data () {
    return {
      study: [],
      parent: []
    }
  },
  methods: {
    async findAll () {
      const response = await this.axios.get('/allstudy')
      if (response.status === 200) {
        this.study = response.data
      }
    },
    goStudy (id) {
      this.$router.replace({name: 'Study', params: {id: id}})
    }
  },
  mounted () {
    this.findAll()
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
.name {
  margin: 60px;
  text-align: center;
  font-size: 32px;
}
.name span {
  color: crimson;
}
.search-box {
  display: flex;
  justify-content: space-between;
}
.search-box input {
  flex: 3;
  border: none;
  border-bottom: 1px solid #dddddd;
  font-size: 18px;
  padding: 5px;
  background: url(../assets/search.png) no-repeat center right;
  background-size: 22px;
  margin-right: 40px;
}
.search-box button {
  flex: 1;
  border: none;
  background-color: #0388fc;
  color: white;
  padding: 15px 30px;
  border-radius: 6px;
  font-size: 20px;
  box-shadow: 5px 5px 20px black;
}
.category-box {
  display: flex;
  justify-content: center;
}
.category-box .child {
  flex: 1;
  text-align: center;
  margin-top: 30px;
  margin-right: 10px;
  border-radius: 6px;
  border: 1px solid black;
}
.category-box .child:last-child {
  margin-right: 0;
}
.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 60px;
}
.item {
  margin-bottom: 30px;
  width: 310px;
  height: 300px;
  overflow: hidden;
  position: relative;
}
.item .tag {
  border: 1px solid black;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  font-weight: bold;
  font-size: 28px;
}
.item:hover{
  opacity: 0.5;
}
.item img {
  width: 100%;
}
.desc {
  position: absolute;
  background-color: rgba(0,0,0,0.3);
  width: 100%;
  height: 60px;
  left: 0;
  bottom: 0;
  color: #eeeeee;
  padding: 10px;
  box-sizing: border-box;
  transition: 0.3s;
}
.desc h6 {
  font-size: 15px;
  margin-bottom: 5px;
}
.like {
  display: flex;
  justify-content: space-between;
}
.like span {
  font-size: 13px;
}
@media (max-width: 768px) {
  section {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  .search-box {
    flex-direction: column;
  }
  .search-box input {
    width: 100%;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .item {
    width: 100%;
  }
}
</style>
