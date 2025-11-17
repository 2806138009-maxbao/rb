import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import OcrSearch from '../views/OcrSearch.vue'
import QuestionDetail from '../views/QuestionDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/ocr-search',
    name: 'OcrSearch',
    component: OcrSearch
  },
  {
    path: '/question/:id',
    name: 'QuestionDetail',
    component: QuestionDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

