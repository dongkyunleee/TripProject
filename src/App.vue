<template>
  <router-view/>
</template>
<script>
import HomePage from './components/HomePage.vue';
import Login from './components/Login/login.vue';
import Signup from "@/components/Signup/signup.vue";
export default {
  name: 'App',
  components: {
    HomePage,
    Login,
    Signup
  },
};
</script>

<style>

</style>