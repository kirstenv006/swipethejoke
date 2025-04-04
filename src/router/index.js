import { createRouter, createWebHistory } from 'vue-router'
import joke from '../views/Joke.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/joke',
      name: 'joke',
      component: joke,
    },
    {
      path: '/likes',
      name: 'likes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/likes.vue'),
    },
  ],
})

export default router
