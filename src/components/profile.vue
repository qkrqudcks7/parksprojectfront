<template>
  <body>
    <div>
      <div v-if="this.$store.getters.user">
        <img v-bind:src="this.$store.getters.user.imageUrl" v-bind:alt="this.$store.getters.user.name" />
      </div>
      <div class="profile-name" v-if="this.$store.getters.user">
        <h2>{{this.$store.getters.user.name}}</h2>
        <p class="profile-email">{{this.$store.getters.user.email}}</p>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: 'profile'
}
</script>

<style scoped>

</style>
