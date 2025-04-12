<template>
  <h1>Random Joke</h1>
      <div
      class="jokestijl"
      :class="{
        'swipe-left': swipeDirection === 'left',
        'swipe-right': swipeDirection === 'right',
        'bg-left': swipeDirection === 'left',
        'bg-right': swipeDirection === 'right'
      }"
      draggable="true"
      v-on:dragstart="dragStart"
      v-on:dragend="dragEnd"
    >
    
    <div v-if="error">❌ Error: {{ error }}</div>
    <p v-else-if="joke">{{ joke }}</p>
    <p v-else>⏳ Loading></p>
  </div>
      <button class="fetchJoke" @click="fetchJoke">Fetch new joke</button>

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
      swipeDirection: null
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
      this.swipeDirection = 'right';
        setTimeout(() => {
          this.like();
          this.swipeDirection = null;
        }, 300);
    } 
    if (this.currentX < this.startX) {
      this.dislike();
      this.swipeDirection = 'left';
        setTimeout(() => {
          this.dislike();
          this.swipeDirection = null;
        }, 300);
    }
    else{
      this.swipeDirection = null;
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
    this.swipeDirection = 'right';
      setTimeout(() => {
        this.like();
        this.swipeDirection = null;
      }, 300);
  },
  disliked() {
    this.swipeDirection = 'left';
      setTimeout(() => {
        this.dislike();
        this.swipeDirection = null;
      }, 300);
  }
}
};
</script>

<style scoped>
.fetchJoke {
  margin-bottom: 0;
  padding: 8px 12px;
  background-color: #f5b318;
  color: black;
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
  background-color: #ed9805;
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
  color: black;
}

.jokestijl {
  background-color: #bdb6ac;
  width: 700px; 
  height: 400px; 
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  transition: background-color 0.3s ease;
}

.swipe-left {
  animation: swipeLeft 0.3s ease forwards;
}
.swipe-right {
  animation: swipeRight 0.3s ease forwards;
}
.bg-left {
  background-color: #e74c3c !important;
}
.bg-right {
  background-color: #2ecc71 !important;
}

@keyframes swipeLeft {
  to {
    transform: translateX(-150%) rotate(-10deg);
    opacity: 0;
  }
}
@keyframes swipeRight {
  to {
    transform: translateX(150%) rotate(10deg);
    opacity: 0;
  }
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
