<template>
  <h1>Random Joke</h1>
  <div class="jokestijl" draggable="true" v-on:dragstart="dragStart" v-on:dragend="dragEnd">
    
    <!-- Toon een foutmelding als er iets misgaat -->
    <div v-if="error">❌ Fout: {{ error }}</div>

    <!-- Toon de joke als alles goed gaat -->
    <p v-else-if="joke">{{ joke }}</p>

    <!-- Laadindicator als er nog geen data is -->
    <p v-else>⏳ Laden...</p>
  </div>
      <!-- Knop om een nieuwe grap op te halen -->
      <button  @click="fetchJoke">Nieuwe grap ophalen</button>
</template>

<script>

import { useStore } from 'vuex';

export default {
  data() {
    return {
      joke: null,
      error: null,
      startX: 0,
      currentX: 0,
      lastSwipeChoice: "",
      store: null
    };
  },
  mounted() {
    this.fetchJoke();
    this.store = useStore();
  },
  methods: {
    dragStart(event) {
      this.startX = event.clientX; // Beginpositie opslaan
    },
    dragEnd(event) {

      // Eindpositie opslaan
      this.currentX = event.clientX;
      
      // Swipe naar rechts
      if (this.currentX > this.startX) {
        this.fetchJoke();
      } 
      
      // Swipe naar links
      if (this.currentX < this.startX) {
        this.store.dispatch('addItem', this.joke);
        this.fetchJoke();
      }
    },
    async fetchJoke() {
      try {
        this.error = null; // Reset de foutmelding
        this.joke = null; // Reset de joke terwijl er wordt geladen

        const response = await fetch("https://icanhazdadjoke.com/", {
          headers: {
            "Accept": "application/json" 
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP-fout! Status: ${response.status}`);
        }

        const data = await response.json();
        this.joke = data.joke;
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>

<style scoped>
button {
  margin-bottom: 0;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  position: fixed;
  bottom: 50px; 
  left: 50%; 
  transform: translateX(-50%); 
  font-size: 15px;
}
button:hover {
  background-color: #0056b3;
}

h1 {
  top: 100px;
  top: 100px; 
  left: 0; 
  width: 100%; 
  padding: 1rem;
}

p {
  font-size: 18px;
  padding: 1rem;
  width: auto; 
  text-align: center; 
  color: white;
}

.jokestijl {
  background-color: green;
  width: 700px; 
  height: 400px; 
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,1); 
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
