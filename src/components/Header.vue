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
    <div class="search-bar">
      <input type="text" placeholder="검색" />
    </div>
  </header>
</template>
<script>

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
  //font-family: 'Montserrat', sans-serif;
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



