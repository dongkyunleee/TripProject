<template>
  <router-view/>
</template>
<script>
import HomePage from './components/HomePage.vue';
import Login from './components/Login/login.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    Login
  },
};
</script>

<style>

</style>