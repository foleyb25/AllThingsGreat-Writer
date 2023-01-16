// state management guide: https://blog.logrocket.com/complex-vue-3-state-management-pinia/
import { defineStore } from 'pinia'
import axios from 'axios'
import { auth0 } from '../auth0'
import {unref} from 'vue'

const apiServerUrl = (import.meta.env.VITE_ENV == "production") ? import.meta.env.VITE_API_SERVER_URL_PROD : import.meta.env.VITE_API_SERVER_URL_DEV;

export const useWriterStore = defineStore('writerStore', {
    state: () => ({
      writer: null,
      loading: false,
      error: null
    }),
    getters: {
      getNumberOfDrafts() {
        return this.writer.drafts.length
      },
    },
    actions: {
      async getWriter(authId) {
        this.loading = true
        
        auth0.getAccessTokenSilently()
        .then( (token) => {
          axios.get(`${apiServerUrl}/api/v2/writers/authID/${authId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((data) => {
            this.writer = data.data
            this.loading = false
          }).catch((err) => {
            this.error = err
            this.loading = false
            console.log(err)
          })
      }).catch( (err) => {
        this.error = err
        this.loading = false
        console.log(err)
      })
      },

      async saveDraft(body) {
        this.loading = true
        const mongoId = auth0.user.value.mongoId
        console.log(auth0.user)
        auth0.getAccessTokenSilently()
        .then( (token) => {
          axios.patch(`${apiServerUrl}/api/v2/writers/${mongoId}/draft`, body, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((data) => {
            // What to do with the data here?
            this.loading = false
            return data
          }).catch((err) => {
            this.error = err
            this.loading = false
            console.log(err)
          })
      }).catch( (err) => {
        this.error = err
        this.loading = false
        console.log(err)
      })

      },

      async checkWriter() {
        if (auth0.isAuthenticated.value) {
          //See if writer object already exists above
          if(!this.writer) {
            //writer does not exist and we are authenticate with auth0. Call DB to get single user
            await this.getWriter(auth0.user.value.sub)
          } 
        } 
      },
      // async addTask(task) {
      //   this.tasks.push(task)
  
      //   const res = await fetch('http://localhost:3000/tasks', {
      //     method: 'POST',
      //     body: JSON.stringify(task),
      //     headers: {'Content-Type': 'application/json'}
      //   })
  
      //   if (res.error) {
      //     console.log(res.error)
      //   }
      // },
      // async deleteTask(id) {
      //   this.tasks = this.tasks.filter(t => {
      //     return t.id !== id
      //   })
  
      //   const res = await fetch('http://localhost:3000/tasks/' + id, {
      //     method: 'DELETE',
      //   })
  
      //   if (res.error) {
      //     console.log(res.error)
      //   }
      // },
      // async toggleFav(id) {
      //   const task = this.tasks.find(t => t.id === id)
      //   task.isFav = !task.isFav
  
      //   const res = await fetch('http://localhost:3000/tasks/' + id, {
      //     method: 'PATCH',
      //     body: JSON.stringify({ isFav: task.isFav }),
      //     headers: {'Content-Type': 'application/json'}
      //   })
  
      //   if (res.error) {
      //     console.log(res.error)
      //   }
      // }
    }
  })


  // export const saveDraft = async (getAccessTokenSilently, writerId, body) => {
  //   return new Promise((resolve, reject) => {
      
  // })
  // }