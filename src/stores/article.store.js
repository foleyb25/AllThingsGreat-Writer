// state management guide: https://blog.logrocket.com/complex-vue-3-state-management-pinia/
import { defineStore, storeToRefs } from 'pinia'
import { createNewArticle, updateArticle, getArticlesByWriterId, getAllArticles, getSingleArticle, approveArticle, unApproveArticle, archiveArticle, unArchiveArticle } from '../services/apiRequest.service'
import { useWriterStore } from "./writer.store";

const apiServerUrl = (import.meta.env.VITE_ENV == "production") ? import.meta.env.VITE_API_SERVER_URL_PROD : import.meta.env.VITE_API_SERVER_URL_DEV;

export const useArticleStore = defineStore('articleStore', {
    state: () => ({
      allArticles: {},
      writerArticles: {},
      article: {},
      loading: false,
      error: null,
      articleCreateSuccess: null,
      articleUpdateSuccess: null,
    }),

    getters: {
      getWriterArticles: (state) => () => {
        return state.writerArticles
      },

      getAllArticles: (state) => () => {
        return state.allArticles
      },

      getArticle: (state) => () => {
        return state.article
      },

      getWriterArticle(id) {
        return this.writerArticles.find(article => article._id === id)
      }

    },
    actions: {
      async retrieveArticlesByWriterId() {
          try {
            const {  writer } = storeToRefs(useWriterStore());
            getArticlesByWriterId(writer.value._id).then((response) => {
              this.writerArticles = response.data
            }).catch((err) => {
              this.error = err
            })
          } catch (err) {
            this.error = err
          }
        
      },

      async retrieveAllArticles() {
          await getAllArticles().then((response) => {
            this.allArticles = response.data
          }).catch((err) => {
            this.error = err
          })
      },

      async retrieveSingleArticle(id) {
          await getSingleArticle(id).then((response) => {
            this.article = response.data
          }).catch((err) => {
            this.error = err
          });
          
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
      },

      async archiveArticle(articleId) {
        try {
          await archiveArticle(articleId)
          this.article.isArchived = !this.article.isArchived
        } catch (err) {
          console.log(err)
        }
        

      },

      async unArchiveArticle(articleId) {
        try {
          await unArchiveArticle(articleId)
          this.article.isArchived = !this.article.isArchived
        } catch (err) {
          console.log(err)
        }
        
      },

      async approveArticle(articleId) {
        try {
          await approveArticle(articleId)
          this.article.isReviewed = !this.article.isReviewed
        } catch (err) {
          console.log(err)
        }
        
      },

      async unApproveArticle(articleId) {
        try {
          await unApproveArticle(articleId)
          this.article.isReviewed = !this.article.isReviewed
        } catch (err) {
          console.log(err)
        }
       
      }
    }
  })