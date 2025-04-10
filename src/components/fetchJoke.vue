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
      <button class="fetchJoke" @click="fetchJoke">Nieuwe grap ophalen</button>

      <button class="button" @click="liked">
  <img alt="Like" src="@/assets/like.png" class="leuk" />
</button>
<button class="button" @click="dislike">
  <img alt="dislike" src="@/assets/delete.png" class="nietleuk" />
</button>
</template>

<script>

export default {
  data() {
    return {
      joke: null,
      error: null,
      startX: 0,
      currentX: 0,
      lastSwipeChoice: "",
    };
  },
  mounted() {
    this.fetchJoke();
  },
    methods: {
  dragStart(event) {
    this.startX = event.clientX;
  },
  dragEnd(event) {
    this.currentX = event.clientX;

    if (this.currentX > this.startX) {
      this.like();
    } 
    if (this.currentX < this.startX) {
      this.dislike();
    }
  },
  like() {
    this.saveToLocalStorage(this.joke);
    this.fetchJoke();
  },
  dislike() {
    this.fetchJoke();
  },
  saveToLocalStorage(joke) {
    const storedJokes = JSON.parse(localStorage.getItem('jokes')) || [];
    storedJokes.push(joke);
    localStorage.setItem('jokes', JSON.stringify(storedJokes));
  },
  async fetchJoke() {
    try {
      this.error = null;
      this.joke = null;

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
  },
  liked() {
    this.like(); // like = swipe naar rechts
  },
  disliked() {
    this.dislike(); // dislike = swipe naar links
  }
}
};
</script>

<style scoped>
.fetchJoke {
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
.fetchJoke:hover {
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

.leuk {
  width: 100px;
  height: 100px;
  cursor: pointer; 
  position: absolute;
  bottom: 20%; 
  right: 15%; 
}

.nietleuk {
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: absolute;
  bottom: 20%; 
  left: 15%; 
}

.button{
  background: transparent; 
  border: none; 
  color: transparent; 
  width: auto; 
  height: auto; 
  cursor: default; 
}
</style>
