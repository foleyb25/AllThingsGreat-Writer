// state management guide: https://blog.logrocket.com/complex-vue-3-state-management-pinia/
import { defineStore } from 'pinia'
import axios from 'axios'
import {auth0} from '../auth0'

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
      async getWriter() {
        this.loading = true
  
        // get data from json file using json server
        const res = await axios.get('http://localhost:3000/tasks')
        const data = await res.json()
  
        this.tasks = data
        this.loading = false
      },

      async saveDraft(body) {
        this.loading = true
        const mongoId = auth0.user.value.mongoId
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

      async checkWriter(isAuthenticated) {
        console.log(this.writer)
        if( isAuthenticated ) {
          if (!writer) {
            //is authenticated but writer doesn't exist. set the authenticated writer 
          }
        } else {
          this.writer = {}
          this.error = false
          this.loading = false 
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