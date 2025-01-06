<template>
  <div class="board-list">
    <h2>자유게시판</h2>

    <!-- 게시글이 없을 때 메시지 -->
    <div v-if="posts.length === 0" class="no-posts">
      <p>게시글이 없습니다. 게시글을 작성해주세요!</p>
    </div>

    <!-- 게시글 목록 -->
    <ul>
      <li v-for="post in posts" :key="post.id" class="post-item">
        <router-link :to="'/post/' + post.id" class="post-link">
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-author">작성자: {{ post.author }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'BoardList',
  setup() {
    // 게시글 목록 데이터 (예시 데이터)
    const posts = ref([
      { id: 1, title: 'Vue.js 배우기', author: '홍길동', content: 'Vue.js는 아주 좋은 프레임워크입니다.' },
      { id: 2, title: '자유게시판 만들기', author: '김철수', content: '이건 자유게시판 만드는 법에 대한 글입니다.' },
      { id: 3, title: '컴포넌트 스타일링', author: '이영희', content: 'Vue 컴포넌트에 CSS를 적용하는 방법에 대해 이야기합니다.' }
    ]);

    // router를 사용하여 게시글 상세 페이지로 이동
    const router = useRouter();

    return {
      posts
    };
  },
};
</script>
<style scoped>
.board-list {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.no-posts {
  text-align: center;
  font-size: 1.2rem;
  color: #999;
}

ul {
  list-style-type: none;
  padding: 0;
}

.post-item {
  background-color: #f9f9f9;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-item:hover {
  background-color: #ecf0f1;
}

.post-link {
  text-decoration: none;
  color: #34495e;
  transition: all 0.3s ease;
}

.post-link:hover {
  color: #2ecc71;
}

.post-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.post-author {
  font-size: 1rem;
  color: #7f8c8d;
}
</style>
