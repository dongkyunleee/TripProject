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
      <button @click="test" class="btn btn-secondary">테스트</button>
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
    const submit = () => {
      const loginObj = {
        username: state.form.username,
        password: state.form.password,
      };
      console.log("loginObjloginObj",loginObj)
      axios.post("http://localhost:3000/api/login", loginObj).then((res) => {
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
      });
    };
    return { state, submit };
  },
};
</script>

<style>
/* 컨테이너 스타일 */
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* 폼 라벨 */
.form-label {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 14px;
  color: #333;
}

/* 입력 필드 스타일 */
.form-input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  outline: none;
}

/* 버튼 그룹 */
.button-group {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

/* 버튼 스타일 */
.btn {
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

/* 기본 버튼 스타일 */
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