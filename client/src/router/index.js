import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      guest: true
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    meta: {
      guest: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Limit access for routes requiring authentication
router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next({ name: 'Signin' });
  } else {
    next();
  }
});

// Prevent authenticated users to access signin & signup routes
router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next({ name: 'Home' });
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
