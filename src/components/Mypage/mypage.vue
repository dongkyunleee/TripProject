<template>
  <div class="user-form-container">
    <h2>회원 정보 수정</h2>
    <form @submit.prevent="submitForm" class="user-form">
      <label for="username" class="form-label">아이디</label>
      <input
          type="text"
          id="username"
          v-model="userData.username"
          class="form-input"
          placeholder="아이디를 입력하세요"
          required
          readonly
      />

<!--      <label for="nickname" class="form-label">닉네임</label>
      <input
          type="text"
          id="nickname"
          v-model="userData.nickname"
          class="form-input"
          placeholder="닉네임을 입력하세요"
          required
      />-->

      <label for="email" class="form-label">이메일</label>
      <input
          type="email"
          id="email"
          v-model="userData.email"
          class="form-input"
          placeholder="이메일을 입력하세요"
          required
      />

      <label for="phone" class="form-label">전화번호</label>
      <input
          type="tel"
          id="phone"
          v-model="userData.phone"
          class="form-input"
          placeholder="전화번호를 입력하세요"
          required
      />

      <div class="button-group">
        <button type="submit" class="btn btn-primary">정보 수정</button>
        <button type="button" @click="cancelForm" class="btn btn-secondary">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import router from "@/router/index.js";

export default {
  name: 'UserPage',
  setup() {
    // 사용자 데이터 상태 관리
    const userData = reactive({
      username: '',
      nickname: '',
      email: '',
      phone: ''
    });

    // 로그인한 사용자 정보 가져오기
    const getUserData = () => {
      // 토큰을 로컬 스토리지에서 가져오기
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인 정보가 없습니다.');
        return;
      }

      axios.get('http://localhost:3000/api/user', {
        headers: {Authorization: `Bearer ${token}`}
      })
          .then(response => {
            const data = response.data;
            userData.id = data.id
            userData.username = data.username;
            userData.nickname = data.nickname;
            userData.email = data.email;
            userData.phone = data.phone;
          })
          .catch(error => {
            console.error(error);
            alert('사용자 정보를 불러오는 데 실패했습니다.');
          });
    };

    // 폼 제출 처리
    const submitForm = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인 정보가 없습니다.');
        return;
      }

      axios.post('http://localhost:3000/api/update', userData, {
        headers: {Authorization: `Bearer ${token}`}
      })
          .then(response => {
            alert('정보가 수정되었습니다!');
          })
          .catch(error => {
            console.error(error);
            alert('정보 수정에 실패했습니다.');
          });
    };

    // 취소 (메인홈으로 이동)
    const cancelForm = () => {
      router.push("/home")
    };

    // 컴포넌트가 마운트되었을 때 사용자 정보 가져오기
    onMounted(() => {
      getUserData();
    });

    return {userData, submitForm, cancelForm};
  }
};
</script>

<style scoped>
.user-form-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-label {
  text-align: left;
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: scale(1.05);
}
</style>