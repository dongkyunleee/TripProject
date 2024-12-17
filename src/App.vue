<template>
  <router-view/>
</template>
<script>
import HomePage from './components/Home/HomePage.vue';
import Login from './components/Login/login.vue';
import Signup from "@/components/Signup/signup.vue";
import Swiper from "./components/Swiper.vue";
import Mypage from "@/components/Mypage/mypage.vue";
export default {
  name: 'App',
  components: {
    HomePage,
    Login,
    Signup,
    Swiper,
    Mypage,
  },
};
</script>

<style>

</style>