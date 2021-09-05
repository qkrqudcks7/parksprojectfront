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
  <div class="items">
    <div class="item">
      <img src="http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ6R5CH9H9gw_SRX3VHNKFCsOOV94-CURGSkahLuod6_SfOC7ZCwZ5dZTacQ5Se" alt="">
      <div class="desc">
        <h6>Image Title</h6>
        <div class="like">
          <span>
            <i class="fa fa-heart"></i> 300 Likes
          </span>
          <span>
            <i class="fa fa-share-alt">박병찬</i>
          </span>
        </div>
      </div>
    </div>
    <div class="item">
      <img src="http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ6R5CH9H9gw_SRX3VHNKFCsOOV94-CURGSkahLuod6_SfOC7ZCwZ5dZTacQ5Se" alt="">
    </div>
    <div class="item">
      <img src="http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ6R5CH9H9gw_SRX3VHNKFCsOOV94-CURGSkahLuod6_SfOC7ZCwZ5dZTacQ5Se" alt="">
    </div>
    <div class="item">
      <img src="http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ6R5CH9H9gw_SRX3VHNKFCsOOV94-CURGSkahLuod6_SfOC7ZCwZ5dZTacQ5Se" alt="">
    </div>
    <div class="item">
      <img src="http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ6R5CH9H9gw_SRX3VHNKFCsOOV94-CURGSkahLuod6_SfOC7ZCwZ5dZTacQ5Se" alt="">
    </div>
    <div class="item">
      <img src="http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ6R5CH9H9gw_SRX3VHNKFCsOOV94-CURGSkahLuod6_SfOC7ZCwZ5dZTacQ5Se" alt="">
    </div>
  </div>
  </section>
  </body>
</template>

<script>
export default {
  name: 'Main'
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
    margin-right: 20px;
  }
  .search-box button {
    flex: 1;
    border: none;
    background-color: #0388fc;
    color: white;
    padding: 15px 60px;
    border-radius: 6px;
    font-size: 20px;
    box-shadow: 5px 5px 20px black;
  }
  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 60px;
  }
  .item {
    margin-bottom: 10px;
    width: 310px;
    height: 400px;
    overflow: hidden;
    position: relative;
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
    bottom: -60px;
    color: #eeeeee;
    padding: 10px;
    box-sizing: border-box;
    transition: 0.3s;
  }
  .item:hover .desc {
    bottom: 0;
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
