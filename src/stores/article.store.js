// state management guide: https://blog.logrocket.com/complex-vue-3-state-management-pinia/
import { defineStore } from 'pinia'

const apiServerUrl = (import.meta.env.VITE_ENV == "production") ? import.meta.env.VITE_API_SERVER_URL_PROD : import.meta.env.VITE_API_SERVER_URL_DEV;

export const useWriterStore = defineStore('writerStore', {
    state: () => ({
      articles: null,
      article: null,
      loading: false,
      error: null
    }),

    getters: {
      getArticles() {
        return this.articles
      },

      getArticle() {
        return this.article
      }
    },
    actions: {
      async retrieveArticles() {

      },

      async retrieveArticle(id) {

      }
    }
  })