// state management guide: https://blog.logrocket.com/complex-vue-3-state-management-pinia/
import { defineStore } from 'pinia'
import { auth0 } from '../auth0'
import { getAuthenticatedWriter, saveDraftState } from '../services/apiRequest.service'

const apiServerUrl = (import.meta.env.VITE_ENV == "production") ? import.meta.env.VITE_API_SERVER_URL_PROD : import.meta.env.VITE_API_SERVER_URL_DEV;

export const useWriterStore = defineStore('writerStore', {
    state: () => ({
      writer: null,
      drafts: null,
      draft : null,
      loading: false,
      error: null,
    }),
    getters: {
      getNumberOfDrafts: (state) => {
          return state.writer.drafts.length
      },

      getDrafts: (state) => {
          return state.writer.drafts
      },

      getDraftById: (state) => {
        return (draftId) => state.writer.drafts.find((draft) => draft._id === draftId)
      }
    },

    actions: {
      async retrieveWriter() {
        this.loading = true
        try {
          const response = await getAuthenticatedWriter()
          this.writer = response.data
          this.loading = false
        } catch (err) {
          this.error = err
          this.loading = false
        }
      },

      async saveDraft(body) {
        this.loading = true
        saveDraftState(this.writer._id, body).then( (data) => {
          this.writer.drafts.push(data.data.draft)
          this.loading = false
        }).catch( (err) => {
          this.loading = false 
          this.error = err
        })
      },

      async checkWriter() {
        if (auth0.isAuthenticated.value) {
          //See if writer object already exists above
          if(!this.writer) {
            //writer does not exist and we are authenticate with auth0. Call DB to get single user
            await this.retrieveWriter()
          } 
        } 
      },
    }
  })
