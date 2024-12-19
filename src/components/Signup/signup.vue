<template>
  <div class="signup-container">
    <h2>회원가입</h2>
    <form @submit.prevent="submit">
      <label class="form-label">
        <span>아이디</span>
        <input type="text" v-model="form.username" class="form-input" required />
      </label>
      <label class="form-label">
        <span>전화번호</span>
        <input type="phone" v-model="form.phone" class="form-input" required />
      </label>
      <label class="form-label">
        <span>이메일</span>
        <input type="email" v-model="form.email" class="form-input" required />
      </label>
      <label class="form-label">
        <span>비밀번호</span>
        <input type="password" v-model="form.password" class="form-input" required />
      </label>
      <label class="form-label">
        <span>비밀번호 확인</span>
        <input
            type="password"
            v-model="form.confirmPassword"
            class="form-input"
            required
        />
      </label>
      <div class="button-group">
        <button type="submit" class="btn btn-primary">회원가입</button>
        <button type="reset" class="btn btn-secondary">초기화</button>
        <button type="button" class="btn btn-third" @click="goToLogin">로그인으로 돌아가기</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import router from "@/router/index.js";
import { useRouter } from "vue-router";

export default {
  name: "Signup",
  setup() {
    const form = reactive({
      username: "",
      phone :"",
      email: "",
      password: "",
      confirmPassword: "",
    });
    console.log("formformformform",form)
    const router = useRouter();

    const submit = () => {
      if (form.password !== form.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        if (form.phone.length > 11) {
          alert("휴대폰 번호는 11글자 이내로 입력해주세요.");
          form.phone = form.phone.slice(0, 11); // 11글자 이상이면 잘라내기
        }
        return;
      }

      axios
          .post("http://localhost:3000/api/signup", form)
          .then((res) => {
            console.log(res);
            alert("회원가입 성공!");
          })
          router.push('/login')
          .catch((err) => {
            console.error(err);
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
          });
    };

    const goToLogin = () => {
      router.push("/login"); // 로그인 페이지로 이동
    };

    return {
      form,
      submit,
      goToLogin,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #55efc4, #74b9ff);
}

.signup-container {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.signup-container h2 {
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
  border-color: #28a745;
  box-shadow: 0 0 4px rgba(40, 167, 69, 0.5);
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
  background-color: #28a745;
  color: #fff;
}

.btn-primary:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.btn-secondary {
  background-color: #ff0000;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #ed2713;
  transform: scale(1.05);
}

.signup-container {
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