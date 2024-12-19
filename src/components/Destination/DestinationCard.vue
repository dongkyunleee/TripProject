<template>
  <div class="destination-card" @click="handleClick">
    <img :src="image" alt="Destination" />
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    title: String,
    description: String,
    id: Number,
  },
  setup(props, { emit }) {
    const handleClick = () => {
      emit('click', props.id);
    };

    return {
      handleClick,
    };
  },
};
</script>

<style scoped>
.destination-card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.destination-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.destination-card img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 15px;
  cursor:pointer;
}

.destination-card h3 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 10px;
}

.destination-card p {
  font-size: 1rem;
  color: #555;
}
</style>