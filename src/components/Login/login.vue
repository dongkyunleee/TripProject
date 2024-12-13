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
import axios from "axios";
import { reactive } from "vue";
export default {
  name: "App",
  components: {},
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

      // 카카오 로그인 팝업
      window.Kakao.Auth.login({
        success: function (authObj) {
          console.log("카카오 로그인 성공:", authObj);

          // 로그인 후, 사용자 정보 요청
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: function (response) {
              console.log("사용자 정보:", response);
              alert(`로그인 성공! 환영합니다, ${response.kakao_account.profile.nickname}`);
              // 여기서 받은 사용자 정보를 서버에 전달하거나, localStorage에 저장할 수 있습니다.
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
          .post("http://localhost:3000/api/login", loginObj)
          .then((res) => {
            console.log(res);
            alert("로그인 성공");
            let token = res.data.token;
            localStorage.setItem("token", token);
            let config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            axios
                .get("/api/user/admin", config)
                .then((response) => {
                  console.log(response);
                  let userInfo = {
                    nickname: response.data.nickname,
                    username: response.data.username,
                  };
                  console.log(userInfo);
                })
                .catch((error) => {
                  console.log(error);
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

    return { state, submit, kakaoLogin };
  },
};
</script>

<style>
/* 컨테이너 스타일 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #74b9ff, #a29bfe);
}

.login-container {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
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
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.btn {
  padding: 10px 15px;
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

/* 추가 애니메이션 효과 */
.login-container {
  animation: fadeIn 0.8s ease-in-out;
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