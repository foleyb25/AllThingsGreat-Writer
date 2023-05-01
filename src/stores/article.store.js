// state management guide: https://blog.logrocket.com/complex-vue-3-state-management-pinia/
import { defineStore, storeToRefs } from 'pinia'
import { createNewArticle, updateArticle, getArticlesByWriterId, getAllArticles, getSingleArticle, approveArticle, unApproveArticle, archiveArticle, unArchiveArticle, uploadImage, getImageUrls, evaluate } from '../services/apiRequest.service'
import { useWriterStore } from "./writer.store";
import { useGlobalNotificationStore } from './globalNotification.store';

const apiServerUrl = (import.meta.env.VITE_ENV == "production") ? import.meta.env.VITE_API_SERVER_URL_PROD : import.meta.env.VITE_API_SERVER_URL_DEV;

export const useArticleStore = defineStore('articleStore', {
    state: () => ({
      allArticles: null,
      writerArticles: null,
      article: null,
      articleImageUrls: null,
      articleEvaluation: null,
    }),

    getters: {
      getWriterArticles: (state) => {
        return state.writerArticles
      },

      getAllArticles: (state) => {
        return state.allArticles
      },

      getArticle: (state) => {
        return state.article
      },

      getImageUrls: (state) => {
        return state.articleImageUrls
      },
    },

    actions: {
      async retrieveArticlesByWriterId() {
        const {setNotification} = useGlobalNotificationStore()
        const {  writer } = storeToRefs(useWriterStore());
        const response = await getArticlesByWriterId(writer.value._id)
        if (response.status === 'success') {
          this.writerArticles = response.data
          // setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },

      async retrieveAllArticles() {
        const {setNotification} = useGlobalNotificationStore()
        const response = await getAllArticles()
        if (response.status === 'success') {
          this.allArticles = response.data
          // setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },

      async retrieveSingleArticle(id) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await getSingleArticle(id)
        if (response.status === 'success') {
          this.article = response.data
          // setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },

      async retrieveArticleImageUrls(writerId) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await getImageUrls(writerId, 'article')
        if (response.status === 'success') {
          this.articleImageUrls = response.data
          // setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },

      async submitArticle(formData) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await createNewArticle(formData)
        if (response.status === 'success') {
          setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },

      async updateArticle(articleId, formData) {
          const {setNotification} = useGlobalNotificationStore()
          const response = await updateArticle(articleId, formData)
          if (response.status === 'success') {
            setNotification(response.message, 'success', 'bg-green-300')
          } else {
            setNotification(response.message, 'error', 'bg-red-300')
          }
      },

      async archiveArticle(articleId) {
        const {setNotification} = useGlobalNotificationStore()
          const response = await archiveArticle(articleId)
          if (response.status === 'success') {
            this.article.isArchived = this.article.isArchived = true
            setNotification(response.message, 'success', 'bg-green-300')
          } else {
            setNotification(response.message, 'error', 'bg-red-300')
          }
      },

      async unArchiveArticle(articleId) {
        const {setNotification} = useGlobalNotificationStore()
          const response = await unArchiveArticle(articleId)
          if (response.status === 'success') {
            this.article.isArchived = this.article.isArchived = false
            setNotification(response.message, 'success', 'bg-green-300')
          } else {
            setNotification(response.message, 'error', 'bg-red-300')
          }
      },

      async approveArticle(articleId) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await approveArticle(articleId)
        if (response.status === 'success') {
          this.article.isReviewed = this.article.isReviewed = true
          setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
        
      },

      async unApproveArticle(articleId) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await unApproveArticle(articleId)
        if (response.status === 'success') {
          this.article.isReviewed = this.article.isReviewed = false
          setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },

      async evaluateArticle(bodyHTML) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await evaluate(bodyHTML)
        this.articleEvaluation = response.data
        if (response.status === 'success') {
          setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },

      async pinia_uploadArticleImage(blob, imageName, writerId) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await uploadImage(blob, imageName, writerId, 'article')
        if (response.status === 'success') {
          setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },

      async pinia_uploadProfileImage(blob, imageName, writerId) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await uploadImage(blob, imageName, writerId, 'profile')
        if (response.status === 'success') {
          setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },
    }
  })