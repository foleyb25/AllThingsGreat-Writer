// state management guide: https://blog.logrocket.com/complex-vue-3-state-management-pinia/
import { defineStore } from 'pinia'
import { auth0 } from '../auth0'
import { getAuthenticatedWriter, saveDraftState, deleteDraft, updateWriter, getImageUrls } from '../services/apiRequest.service'
import { useGlobalNotificationStore } from './globalNotification.store';

export const useWriterStore = defineStore('writerStore', {
    state: () => ({
      writer: null,
      draft : null,
      profileImageUrls: null,
    }),
    getters: {
      getWriter: (state) => {
        return state.writer
      },

      getDraft: (state) => {
        return state.draft
      },

      getProfileImageUrls: (state) => {
        return state.profileImageUrls
      }
    },

    actions: {
      async retrieveWriter() {
        const {setNotification} = useGlobalNotificationStore()
        const response = await getAuthenticatedWriter()
        if (response.status === 'success') {
          this.writer = response.data
          // setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
        return response
      },

      async saveDraft(body) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await saveDraftState(this.writer._id, body)
        if (response.status === 'success') {
          this.writer.drafts.push(response.data)
          setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },

      async deleteDraft(draftId) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await deleteDraft(this.writer._id, draftId)
        if (response.status === 'success') {
          this.writer.drafts = this.writer.drafts.filter(draft => draft._id !== draftId);
          setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },

      async retrieveProfileImageUrls(writerId) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await getImageUrls(writerId, 'profile')
        if (response.status === 'success') {
          this.profileImageUrls = response.data
          // setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },

      async checkWriter() {
        if (auth0.isAuthenticated.value) {
          //See if writer object already exists above
          if(!this.writer) {
            //writer does not exist and we are authenticate with auth0. Call DB to get single user
              const response = await this.retrieveWriter()
              if (response.status === 'success') {
                return true
              } else {
                return false
              }
          } else {
            return true
          }
        }
        return false
      }, 

      async updateWriterInfo(writer) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await updateWriter(writer.value)
        if (response.status === 'success') {
          this.writer = response.data
          setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      }
    }
  })
