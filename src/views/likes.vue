<template>
  <div class="Likes">
    <h1>Watch your Likes</h1>
    <p>Here you can see your liked jokes.</p>
    <div class="cards-container">
      <div class="jokestijlklein" v-for="(like, index) in likes" :key="index">
        <p>{{ like }}</p>
        <button class="button" @click="verwijderLike(index)">
          <img alt="prullenbak" src="@/assets/bin.png" class="bin" />
        </button>
        <button class="button" @click="copyToClipboard(like)">
          <img alt="copy" src="@/assets/copy.png" class="copy" />
        </button>
      </div>
    </div>

    <div v-if="isActionTaken" class="copy-message">
      {{ actionMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: [], 
      isActionTaken: false, 
      actionMessage: '' 
    };
  },
  mounted() {
    const grapjes = JSON.parse(localStorage.getItem("jokes")) || [];
    this.likes = grapjes;
  },
  methods: {
    verwijderLike(index) {
      const removedLike = this.likes[index]; 
      this.likes.splice(index, 1); 
      localStorage.setItem("jokes", JSON.stringify(this.likes)); 
      this.showActionMessage(`Grap verwijderd: "${removedLike}"`); 
    },
    
    async copyToClipboard(like) {
      try {
        await navigator.clipboard.writeText(like); 
        this.showActionMessage('Tekst gekopieerd!'); 
      } catch (error) {
        console.error('error by coping', error); 
      }
    },


    showActionMessage(message) {
      this.actionMessage = message; 
      this.isActionTaken = true; 

      setTimeout(() => {
        this.isActionTaken = false;
      }, 2000);
    }
  }
};
</script>

<style>
.button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
}

.bin {
  height: 30px;
}

.copy {
  height: 30px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.jokestijlklein {
  background-color: #83c476;
  width: 100%;
  height: 200px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: left;
  padding: 1rem;
}

.Likes {
  text-align: center;
}

p {
  font-size: 15px;
  color: black;
}

h1 {
  width: 100%;
  margin-bottom: 2rem;
}


.copy-message {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px; 
  border-radius: 5px;
  font-size: 12px; 
  opacity: 0;
  animation: fadeInOut 4s forwards; 
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
