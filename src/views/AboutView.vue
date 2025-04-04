<template>
  <div class="about">
    <h1>Bekijk je likes</h1>
    <div v-for="like in likes" :key="like.id">
      <p>{{ like }}</p>
  </div>
  </div>
</template>

<script>

import { useStore } from 'vuex';

export default {
  data() {
    return {
      store: null,
      likes: []
    }
  },
  mounted() {
    this.store = useStore();
    this.likes = this.store.getters.allItems;
  }
}


</script>

<style>
  .about {
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
