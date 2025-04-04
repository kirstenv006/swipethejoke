<template>
  <div class="Likes">
    <h1>Bekijk je likes</h1>
    <div v-for="like in likes" :key="like.id">
      <p>{{ like }}</p>
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
    // this.likes = this.store.getters.allItems;

    const grapjes = JSON.parse(localStorage.getItem("jokes")) || [];
    this.likes = grapjes;

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

 h1{
    width: 100%; 
    margin-bottom: 2rem;
 }
</style>
