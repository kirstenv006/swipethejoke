<template>
  <div class="Likes">
    <h1>Bekijk je likes</h1>
    <div v-for="(like, index) in likes" :key="index">
      <p>{{ like }}</p>
      <button @click="verwijderLike(index)">Delete like</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: []
    }
  },
  mounted() {
    const grapjes = JSON.parse(localStorage.getItem("jokes")) || [];
    this.likes = grapjes;
  },
  methods: {
    verwijderLike(index) {
      this.likes.splice(index, 1); 
      localStorage.setItem("jokes", JSON.stringify(this.likes)); 
    }
  }
}
</script>

<style>
  .Likes {
    text-align: center;
  }
  
  p {
    font-size: 15px;
  }

  h1 {
    width: 100%; 
    margin-bottom: 2rem;
  }
</style>
