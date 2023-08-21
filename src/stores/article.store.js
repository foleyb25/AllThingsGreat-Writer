// state management guide: https://blog.logrocket.com/complex-vue-3-state-management-pinia/
import { defineStore, storeToRefs } from 'pinia'
import { createNewArticle, updateArticle, getArticlesByWriterId, getAllArticles, getSingleArticle, approveArticle, unApproveArticle, archiveArticle, unArchiveArticle, uploadImage, getImageUrls, evaluate, analyze, getJobStatus} from '../services/apiRequest.service'
import { useWriterStore } from "./writer.store";
import { useGlobalNotificationStore } from './globalNotification.store';

export const useArticleStore = defineStore('articleStore', {
    state: () => ({
      allArticles: null,
      writerArticles: [],
      article: null,
      articleImageUrls: null,
      articleEvaluation: null,
      matchupAnalysis: null,
      isEvaluating: false,
      isCreating: false,
      isUpdating: false,
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

      submitArticle(formData, innerText) {
        return new Promise(async (resolve, reject) => {
          const { setNotification } = useGlobalNotificationStore();
          this.isCreating = true;
          const response = await createNewArticle(formData, innerText);
          if (response.status === 'success') {
            setNotification("Creating article, this may take about a minute..", 'Creating article, please wait...', 'bg-green-300');
            resolve(response.data);
            this.isCreating = false;
            // const jobId = response.data.job;
            // Check job status every 5 seconds
            // this.intervalId = setInterval(async () => {
            //   console.log("Checking status....")
            //   const jobStatus = await getJobStatus(jobId, 'create');
            //   if (jobStatus.statusCode === 200) {
            //     console.log("Status complete....")
            //     setNotification("Article successfully created", 'Job Complete', 'bg-green-300');
            //     // Job has been completed, get the evaluation data and stop the interval
            //     this.articleEvaluation = jobStatus.data.data;
            //     this.isCreating = false;
            //     clearInterval(this.intervalId);
            //     resolve(); // Resolve the promise when the job is complete
            //   } else if (jobStatus.statusCode === 202) {
            //     // setNotification("Job Processing In Progress", 'Job processing in Progress', 'bg-green-300');
            //   } else {
            //     // Handle any kind of failure status codes by rejecting the promise
            //     this.isCreating = false;
            //     clearInterval(this.intervalId);
            //     if (jobStatus.statusCode === 404) {
            //       setNotification(`${jobStatus.message}: Job Not Found`, 'error', 'bg-red-300');
            //     } else if (jobStatus.statusCode === 500) {
            //       setNotification(`${jobStatus.message}: Job Failed`, 'error', 'bg-red-300');
            //     }
            //     reject(new Error(jobStatus.message));
            //   }
            // }, 5000);
          } else {
            this.isCreating = false;
            setNotification(response.message, 'error', 'bg-red-300');
            reject(new Error(response.message)); // If creating a new article failed, reject the promise
          }
        });
      },
      

      async updateArticle(articleId, formData, innerText) {
          return new Promise(async (resolve, reject) => {
            const { setNotification } = useGlobalNotificationStore();
            this.isUpdating = true;
            const response = await updateArticle(articleId, formData, innerText)
            if (response.status === 'success') {
              setNotification("Creating article, this may take about a minute..", 'Creating article, please wait...', 'bg-green-300');
              this.isUpdating = false;
              resolve(response.data);
              // const jobId = response.data.job;
              // // Check job status every 5 seconds
              // this.intervalId = setInterval(async () => {
              //   console.log("Checking status....")
              //   const jobStatus = await getJobStatus(jobId, 'update');
              //   if (jobStatus.statusCode === 200) {
              //     console.log("Status complete....")
              //     setNotification("Article successfully updated Article", 'Job Complete', 'bg-green-300');
              //     // Job has been completed, get the evaluation data and stop the interval
              //     this.articleEvaluation = jobStatus.data.data;
              //     this.isUpdating = false;
              //     clearInterval(this.intervalId);
              //     resolve(); // Resolve the promise when the job is complete
              //   } else if (jobStatus.statusCode === 202) {
              //     // setNotification("Job Processing In Progress", 'Job processing in Progress', 'bg-green-300');
              //   } else {
              //     // Handle any kind of failure status codes by rejecting the promise
              //     this.isUpdating = false;
              //     clearInterval(this.intervalId);
              //     if (jobStatus.statusCode === 404) {
              //       setNotification(`${jobStatus.message}: Article Update Failed`, 'error', 'bg-red-300');
              //     } else if (jobStatus.statusCode === 500) {
              //       setNotification(`${jobStatus.message}: Article Update Failed`, 'error', 'bg-red-300');
              //     }
              //     reject(new Error(jobStatus.message));
              //   }
              // }, 5000);
            } else {
              this.isUpdating = false;
              setNotification(response.message, 'error', 'bg-red-300');
              reject(new Error(response.message)); // If creating a new article failed, reject the promise
            }
          });
      },

      async evaluateArticle(articleText) {
        const { setNotification } = useGlobalNotificationStore();
        this.isEvaluating = true;
        const response = await evaluate(articleText);
        console.log("Evaluate response: ", response)
        
        if (response.status === 'success') {
          setNotification(response.message, 'Evaluating article, please wait...', 'bg-green-300');
          
          // const jobId = response.data.job;
          // // Check job status every 5 seconds
          // this.intervalId = setInterval(async () => {
          //   console.log("Cecking status....")
          //   const jobStatus = await getJobStatus(jobId, 'eval');
          //   if (jobStatus.statusCode === 200) {
          //     console.log("Status complete....")
          //     setNotification(jobStatus.message, 'Job Complete', 'bg-green-300');
          //     // Job has been completed, get the evaluation data and stop the interval
          //     this.articleEvaluation = jobStatus.data.data;
          //     this.isEvaluating = false;
          //     clearInterval(this.intervalId);
          //   } else if (jobStatus.statusCode === 202) {
          //     setNotification("Job Processing In Progress", 'Job processing in Progress', 'bg-green-300');
          //   } else if (jobStatus.statusCode === 404) {
          //     this.isEvaluating = false;
          //     setNotification(`${jobStatus.message}: Job Not Found`, 'error', 'bg-red-300');
          //     clearInterval(this.intervalId);
          //   } else if (jobStatus.statusCode === 500) {
          //     this.isEvaluating = false;
          //     setNotification(`${jobStatus.message}: Job Failed`, 'error', 'bg-red-300');
          //     clearInterval(this.intervalId);
          //   }
          // }, 5000);
        } else {
          this.isEvaluating = false;
          setNotification(response.message, 'error', 'bg-red-300');
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
      

      async analyzeMatchup(teamA, teamB) {
        const {setNotification} = useGlobalNotificationStore()
        const response = await analyze(teamA, teamB)
        this.matchupAnalysis = response.data
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
          this.writerArticles.push(response.data.data.data.Location)
          setNotification(response.message, 'success', 'bg-green-300')
        } else {
          setNotification(response.message, 'error', 'bg-red-300')
        }
      },
    }
  })