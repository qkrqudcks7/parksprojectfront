<template>
  <b-container fluid class="text-center">
    <b-row class="border-bottom">
      <b-col cols="1" class="p-3">홈페이지</b-col>
      <b-col cols="1" class="p-3">게시판</b-col>
      <b-col cols="1" class="p-3">게시판</b-col>
      <b-col cols="1" offset="7" class="p-3">로그인</b-col>
      <b-col cols="1" class="p-3">홈페이지</b-col>
    </b-row>
    <b-nav tabs justified>
      <b-nav-item active>Active</b-nav-item>
      <b-nav-item>Link</b-nav-item>
      <b-nav-item>Link with a long name </b-nav-item>
      <b-nav-item disabled>Disabled</b-nav-item>
    </b-nav>
  </b-container>
</template>
<script>
export default {
  name: 'hheader'
}
</script>

<style scoped>

</style>
