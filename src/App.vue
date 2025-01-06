<template>
  <router-view/>
</template>
<script>
import HomePage from './components/Home/HomePage.vue';
import Login from './components/Login/login.vue';
import Signup from "@/components/Signup/signup.vue";
import Swiper from "./components/Swiper/Swiper.vue";
import Mypage from "@/components/Mypage/mypage.vue";
import CreateBoard from "@/components/Board/Createboard.vue";
import board from "@/components/Board/board.vue";
export default {
  name: 'App',
  components: {
    HomePage,
    Login,
    Signup,
    Swiper,
    Mypage,
    CreateBoard,
    board,
  },
};
</script>

<style>

</style>