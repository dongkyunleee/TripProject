<template>
  <div class="login-container">
    <label for="username" class="form-label">
      <span>아이디</span>
      <input type="text" id="username" v-model="state.form.username" class="form-input" />
    </label>
    <label for="password" class="form-label">
      <span>비밀번호</span>
      <input type="password" id="password" v-model="state.form.password" class="form-input" />
    </label>
    <div class="button-group">
      <button @click="submit" class="btn btn-primary">로그인</button>
      <button @click="signuppage" class="btn btn-secondary">회원가입</button>
      <button @click="kakaoLogin" class="btn btn-third">카카오로그인</button>
    </div>
  </div>
</template>

<script>
import axios, {all} from "axios";
import { reactive } from "vue";
import router from "@/router/index.js";

export default {
  name: "Login",
  setup() {
    const state = reactive({
      form: {
        username: "",
        password: "",
      },
    });

    // 카카오 로그인 처리 함수
    const kakaoLogin = () => {
      if (!window.Kakao.isInitialized()) {
        alert("카카오 SDK가 초기화되지 않았습니다.");
        return;
      }

      window.Kakao.Auth.login({
        success: function (authObj) {
          console.log("카카오 로그인 성공:", authObj);
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: function (response) {
              console.log("사용자 정보:", response);
              alert(`로그인 성공! 환영합니다, ${response.kakao_account.profile.nickname}`);
              router.push("/home");
              // 카카오 로그인 후 토큰을 localStorage에 저장하거나 다른 처리를 할 수 있습니다.
            },
            fail: function (error) {
              console.error("사용자 정보 요청 실패:", error);
            },
          });
        },
        fail: function (err) {
          console.error("카카오 로그인 실패:", err);
          alert("카카오 로그인에 실패했습니다.");
        },
      });
    };

    // 일반 로그인 처리 함수
    const submit = () => {
      const loginObj = {
        username: state.form.username,
        password: state.form.password,
      };
      console.log("loginObj", loginObj);
      axios
          .post("http://localhost:3000/api/login", loginObj) // 로그인 요청
          .then((res) => {
            console.log("로그인 응답:", res);
            alert("로그인 성공");
            router.push("/home"); // 홈 화면으로 이동

            const token = res.data.token; // 서버에서 받은 JWT 토큰
            console.log("tokentoken", token);

            localStorage.setItem("token", token); // JWT 토큰을 localStorage에 저장
            console.log("localStoragelocalStorage", localStorage.getItem("token"));

            // 로그인 후 사용자 정보 요청
            const config = {
              headers: {
                Authorization: `Bearer ${token}`, // Authorization 헤더에 JWT 토큰 포함
              },
            };

            console.log("configconfigconfigconfig", config);

            // 이 부분에서 .get을 사용해야 함 (POST가 아님)
            axios
                .get("http://localhost:3000/api/user", config) // 사용자 정보 요청 API
                .then((res) => {
                  console.log("User Info:", res.data);
                  // 사용자 정보를 로컬 스토리지에 저장하거나 Vuex 상태로 관리
                  let userInfo = {
                    username: res.data.username,
                  };
                  // 사용자 정보 저장 (예: localStorage나 Vuex 등)
                  localStorage.setItem("userInfo", JSON.stringify(userInfo));
                })
                .catch((error) => {
                  console.error("Error fetching user info:", error);
                });
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              alert("로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.");
            } else {
              alert("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
            console.error("Login Error:", error);
          });
    };
    const signuppage = () => {
      router.push("/signup")
    }

    return { state, submit, kakaoLogin , signuppage};
  },
};
</script>

<style>
/* 컨테이너 스타일 */

html, body {
  margin: 0;
  height: 100%;
}
body {
  font-family: 'Nunito', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('@/assets/image/travel-background.jpg') no-repeat center center fixed;
  background-size: cover;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 0.8s ease-in-out;
}

.login-container h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-label {
  text-align: left;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  outline: none;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  width: 100%;
}

.btn {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
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
  background-color:#ff0000 !important;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #ed2713 !important;
  transform: scale(1.05);
}

.btn-third {
  background-color: #FEE500;
  color: #fff;
}

.btn-third:hover {
  background-color: #FDD700;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>