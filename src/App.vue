<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Swipe</RouterLink>
        <RouterLink to="/likes">Likes</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  margin-bottom: 2rem;
}

nav {
  width: 100%;
  font-size: 18px;
  text-align: center;
  margin-top: 2rem;
  font-family: Arial, Helvetica, sans-serif;
}

nav a.router-link-exact-active {
  color: #bdb6ac;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 2px solid #bdb6ac;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    color: #FF10F0;
  }


  header .wrapper {
    flex-wrap: wrap;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
  }

  nav {
  top: 0; 
  left: 0; 
  width: 100%; 
  padding: 1rem;
  justify-content: center; 
  align-items: center; 
}
}
</style>
