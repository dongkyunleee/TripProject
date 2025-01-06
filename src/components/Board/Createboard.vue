<template>
  <div class="board-form">
    <h2>자유게시판 글 작성</h2>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="post.title" required placeholder="글 제목을 입력하세요" />
      </div>

      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model="post.content" required placeholder="글 내용을 입력하세요" rows="5"></textarea>
      </div>

      <div class="form-group">
        <label for="author">작성자</label>
        <input type="text" id="author" v-model="post.author" required placeholder="작성자를 입력하세요" />
      </div>

      <button type="submit" :disabled="isSubmitDisabled">작성 완료</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'BoardForm',
  setup() {
    // 게시글 폼 데이터를 바인딩할 객체
    const post = ref({
      title: '',
      content: '',
      author: '',
    });

    // 제출 버튼 활성화/비활성화 상태
    const isSubmitDisabled = ref(true);

    // 제출 버튼 상태를 관리하는 computed 속성
    const checkFormValidity = () => {
      return post.value.title && post.value.content && post.value.author;
    };

/*    // 폼 데이터 변경을 감지하여 제출 버튼 활성화 상태 업데이트
    watch(post, () => {
      isSubmitDisabled.value = !checkFormValidity();
    });*/

    // 게시글 제출 처리
    const submitPost = () => {
      // 실제 API 요청 부분
      console.log('게시글 제출됨:', post.value);

      // 폼 제출 후 초기화
      post.value.title = '';
      post.value.content = '';
      post.value.author = '';
      alert('게시글이 등록되었습니다!');
    };

    return {
      post,
      submitPost,
      isSubmitDisabled,
    };
  },
};
</script>

<style scoped>
.board-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus,
textarea:focus {
  border-color: #3498db;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:disabled {
  background-color: #ccc;
}

button:hover {
  background-color: #2980b9;
}
</style>