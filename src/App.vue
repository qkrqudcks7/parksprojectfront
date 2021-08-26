<template>
  <div id="app">
    <app-header />
    <br>
    <b-container class="text-center">
      <b-row align-h="start">
        <b-col cols="4" class="bg-primary">ㅌㅇ</b-col>
        <b-col cols="2" class="bg-danger">gd</b-col>
        <b-col cols="6" class="bg-dark">gd</b-col>
      </b-row>
      <b-row>
        <b-col sm="2" class="bg-primary">gd</b-col>
        <b-col sm="8" class="bg-danger">gd</b-col>
        <b-col sm="2" class="bg-dark">gd</b-col>
      </b-row>
      <b-row>
        <b-col class="bg-primary">gd</b-col>
        <b-col cols="12" md="auto" class="bg-danger">gd</b-col>
        <b-col col lg="4" class="bg-dark">gd</b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="8" class="bg-primary">gd</b-col>
        <b-col cols="6" md="4" class="bg-danger">gd</b-col>
      </b-row>
      <b-row>
        <b-col md="4" class="bg-primary">gd</b-col>
        <b-col md="4" offset-md="4" class="bg-danger">gd</b-col>
        <b-col md="6" offset-md="3" class="bg-dark">md="6" offset-md="3"</b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col md="3" class="bg-primary ml-md-auto p-3">dd</b-col>
        <b-col md="4" class="bg-danger ml-md-auto">gd</b-col>
        <b-col class="bg-dark">gd</b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col md="3" class="ml-md-auto p-3 bg-info">dd</b-col>
        <b-col md="3" class="ml-md-auto p-3 bg-danger">gd</b-col>
      </b-row>
      <b-row cols="2">
        <b-col>dd</b-col>
        <b-col>dd</b-col>
        <b-col>dd</b-col>
        <b-col>dd</b-col>
      </b-row>
    </b-container>
    <router-view/>
  </div>
</template>

<script>
import appHeader from './components/header'
export default {
  name: 'App',
  components: {
    appHeader
  }
}
</script>

<style>
</style>
