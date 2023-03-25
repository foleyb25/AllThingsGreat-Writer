// state management guide: https://blog.logrocket.com/complex-vue-3-state-management-pinia/
import { defineStore } from 'pinia'
import { createNewArticle, updateArticle } from '../services/apiRequest.service'

const apiServerUrl = (import.meta.env.VITE_ENV == "production") ? import.meta.env.VITE_API_SERVER_URL_PROD : import.meta.env.VITE_API_SERVER_URL_DEV;

export const useArticleStore = defineStore('articleStore', {
    state: () => ({
      articles: null,
      article: null,
      loading: false,
      error: null,
      articleCreateSuccess: null,
      articleUpdateSuccess: null,
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

      },

      async submitArticle(formData) {
        try {
          await createNewArticle(formData)
          this.articleCreateSuccess = true;
          if (this.articleCreateSuccess) {
            setTimeout(() => {
              this.articleCreateSuccess = null
            }, 5000)
          }
        } catch (err) {
          this.error = err
        }
      },

      async updateArticle(articleId, formData) {
        try {
          console.log(articleId)
          await updateArticle(articleId, formData)
          this.articleUpdateSuccess = true;
          if (this.articleUpdateSuccess) {
            setTimeout(() => {
              this.articleUpdateSuccess = null
            }, 5000)
          }
        } catch (err) {
          this.error = err
        }
      }
    }
  })