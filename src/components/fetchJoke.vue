

<template>
  <div>
    <h1>Random Joke</h1>
<!-- Kaart voor de grap -->
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
    <!-- Meldingen in de grappen -->
      <div v-if="error">❌ Error: {{ error }}</div>
      <p v-else-if="joke">{{ joke }}</p>
      <p v-else>⏳ Loading...</p>
    </div>

    <!-- Knoppen -->
    <button class="fetchJoke" @click="fetchJoke">Fetch new joke</button>

    <button class="button" @click="liked">
      <img alt="Like" src="@/assets/like.png" class="leuk" />
    </button>
    <button class="button" @click="disliked">
      <img alt="dislike" src="@/assets/delete.png" class="nietleuk" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      joke: null,
      error: null,
      startX: 0,
      currentX: 0,
      swipeDirection: null
    };
  },
   // Grap ophalen
  mounted() {
    this.fetchJoke();
  },
  methods: {
    dragStart(event) {
      this.startX = event.clientX;
    },

    // animatie voor de swipe
    dragEnd(event) {
      
      this.currentX = event.clientX;

      if (this.currentX > this.startX) {
        this.swipeDirection = 'right';
        setTimeout(() => {
          this.like();
          this.swipeDirection = null;
        }, 300);
      } else if (this.currentX < this.startX) {
        this.swipeDirection = 'left';
        setTimeout(() => {
          this.dislike();
          this.swipeDirection = null;
        }, 300);
      }
    },
    // Grap opslaan in localStorage
    // en nieuwe grap ophalen
    like() {
      this.saveToLocalStorage(this.joke);
      this.fetchJoke();
    },
    dislike() {
      this.fetchJoke();
    },
    saveToLocalStorage(joke) {
      const storedJokes = JSON.parse(localStorage.getItem("jokes")) || [];
      storedJokes.push(joke);
      localStorage.setItem("jokes", JSON.stringify(storedJokes));
    },
    async fetchJoke() {
      try {
        this.error = null;
        this.joke = null;

        const response = await fetch("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" }
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

    // animatie voor de knoppen
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


h1 {
  padding: 1rem;
  text-align: center;
}

p {
  font-size: 18px;
  padding: 1rem;
  text-align: center;
  color: black;
}

/* Kaart opmaak */
.jokestijl {
  background-color: #bdb6ac;
  width: 700px;
  height: 400px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  transition: background-color 0.3s ease;
}

/* Animatie opmaak */
.swipe-left {
  animation: swipeLeft 1s ease-in-out forwards;
}
.swipe-right {
  animation: swipeRight 1s ease-in-out forwards;

}
.bg-left {
  background-color: #e74c3c !important;
}
.bg-right {
  background-color: #2ecc71 !important;
}

@keyframes swipeLeft {
  to {
    transform: translateX(-450%) rotate(-45deg);
    opacity: 0;
  }
}
@keyframes swipeRight {
  to {
    transform: translateX(450%) rotate(45deg);
    opacity: 0;
  }
}

/* knoppen */
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

.button {
  background: transparent;
  border: none;
  width: auto;
  height: auto;
}

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
</style>
