<template>
  <header class="header">
    <div class="logo">
      <h1>TravelProject</h1>
    </div>
    <nav class="menu">
      <router-link to="/home">Home</router-link>
      <a href="#">Destinations</a>
      <a href="#">About</a>
    </nav>
    <!-- 로그인 후 사용자 정보 표시 -->
    <div v-if="user.isLoggedIn" class="user-info">
      <span>Welcome, {{ user.nickname }}!</span>
      <button @click="logout">Logout</button>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="검색" />
    </div>
  </header>
</template>

<script>
import {reactive, onMounted} from 'vue';
import axios from 'axios';
import router from "@/router/index.js";

export default {
  name: 'Header',
  setup() {
    // 로그인 상태와 사용자 정보 관리
    const user = reactive({
      isLoggedIn: false,
      nickname: '',
    });

    // 로그인 상태 및 사용자 정보 확인
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        // 토큰이 존재하면 사용자 정보 요청
        axios
            .get('http://localhost:3000/api/user', {
              headers: {Authorization: `Bearer ${token}`},
            })
            .then((response) => {
              // 사용자 정보를 받아오면 로그인 상태를 true로 설정
              user.isLoggedIn = true;
              user.nickname = response.data.username; // 백엔드에서 응답한 nickname
            })
            .catch((error) => {
              console.error('Error fetching user info:', error);
            });
      }
    };

    // 로그아웃 처리
    const logout = () => {
      localStorage.removeItem('token'); // 토큰 삭제
      user.isLoggedIn = false; // 로그인 상태 초기화
      user.nickname = ''; // 사용자 정보 초기화
      alert("로그아웃 됐습니다. 재접속 부탁드리겠습니다.")
      router.push("/login")
    };

    // 컴포넌트가 마운트될 때 로그인 상태를 확인
    onMounted(() => {
      checkLoginStatus();
    });

    return {
      user,
      logout,
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px;
  background: linear-gradient(to right, #3498db, #2ecc71);
  color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 70px;
}

.logo h1 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin-right: 60px;
}

.menu {
  display: flex;
  gap: 20px;
}

.menu a {
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 15px;
  transition: background-color 0.3s;
}

.menu a:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* 검색창 스타일 */
.search-bar input {
  padding: 8px 12px;
  border-radius: 15px;
  border: none;
  font-size: 1rem;
  width: 250px;
  outline: none;
}
</style>