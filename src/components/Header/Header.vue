<template>
  <header class="header">
    <div class="logo">
      <button @click="home" class="minimal-heading">야가자</button>
    </div>
    <nav class="menu">
      <router-link to="/home">Home</router-link>
      <a href="#">Destinations</a>
      <a href="#">About</a>
      <a href="board">게시판</a>
    </nav>
    <!-- 로그인 후 사용자 정보 표시 -->
    <div v-if="user.isLoggedIn" class="user-info">
      <span class="welcome-message">환영해요 {{ user.nickname }}님</span>
      <button @click="mypage" class="mypage-btn">마이페이지</button>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="검색" />
    </div>
  </header>
</template>

<script>
import { reactive, onMounted } from 'vue';
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
              headers: { Authorization: `Bearer ${token}` },
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
      alert("로그아웃 됐습니다. 재접속 부탁드리겠습니다.");
      router.push("/login");
    };

    const mypage = () => {
      router.push("/mypage");
    };

    const home = () => {
      // 홈 버튼 클릭 시 페이지를 리프레시합니다.
      window.location.reload(); // 페이지 리프레시
    };

    const board = () => {
      router.push("/board");
    }

    // 컴포넌트가 마운트될 때 로그인 상태를 확인
    onMounted(() => {
      checkLoginStatus();
    });

    return {
      user,
      logout,
      mypage,
      home,
      board
    };
  },
};
</script>

<style scoped>
/* 헤더 스타일 */
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

.logo h2 {
  font-size: 2rem; /* 헤더에 맞는 적당한 크기 */
  font-weight: bold;
  color: #ffffff;
  text-align: left;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 3px;
  padding: 0;
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

/* 로그인 후 사용자 정보 영역 스타일 */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 환영 메시지 */
.welcome-message {
  font-size: 1rem;
  font-weight: bold;
}

/* 로그아웃 버튼 스타일 */
.logout-btn {
  background-color: #e74c3c; /* 붉은색 */
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.logout-btn:focus {
  outline: none;
}

/* 모바일에서 유저 정보가 아래로 쌓이지 않도록 */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: auto;
  }

  .menu {
    flex-direction: column;
    gap: 10px;
  }

  .search-bar input {
    width: 100%;
  }

  .user-info {
    margin-top: 10px;
  }
}

/* '야가자' 스타일 */
.minimal-heading {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 2rem; /* 헤더에 맞는 크기 조정 */
  font-weight: normal;
  color: #ecf0f1; /* 밝은 색상 */
  text-align: left;
  letter-spacing: 2px;
  margin: 0;
  padding: 10px 20px; /* 버튼처럼 보이게 padding 추가 */
  background-color: #3498db; /* 버튼 색상 */
  border: none; /* 테두리 없애기 */
  border-radius: 25px; /* 둥근 버튼 모양 */
  cursor: pointer; /* 클릭할 수 있는 형태로 바꾸기 */
  transition: all 0.3s ease; /* 애니메이션 효과 */
}

.minimal-heading:hover {
  background-color: #2ecc71; /* 호버 시 색상 변경 */
  transform: scale(1.05); /* 호버 시 살짝 커지게 */
}

.minimal-heading:focus {
  outline: none; /* 포커스 상태에서 테두리 없애기 */
}

.mypage-btn {
  background-color: #2ecc71; /* 초록색 배경 */
  color: #fff;
  padding: 8px 15px; /* 로그아웃 버튼과 동일한 패딩 */
  font-size: 1rem; /* 로그아웃 버튼과 동일한 폰트 크기 */
  border-radius: 25px; /* 둥근 버튼 모양 */
  border: none; /* 테두리 제거 */
  cursor: pointer;
  transition: all 0.3s ease;
}

.mypage-btn:hover {
  background-color: #27ae60; /* 호버 시 색상 변화 */
  transform: scale(1.05); /* 호버 시 살짝 커지게 */
}

.mypage-btn:active {
  transform: scale(1); /* 클릭 시 크기 변경 없앰 */
}

.mypage-btn:focus {
  outline: none; /* 포커스 테두리 제거 */
  box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.4); /* 포커스 상태에서 초록색 테두리 */
}
</style>