import axios from "axios"
import Compressor from "compressorjs"

const apiServerUrl = (import.meta.env.VITE_ENV == "production") ? import.meta.env.VITE_API_SERVER_URL_PROD : import.meta.env.VITE_API_SERVER_URL_DEV;

export const imageUploader = async (getAccessTokenSilently, blob, imageName) => {
  return new Promise((resolve, reject) => {
    //we could use some compression
    new Compressor(blob, {
      quality: 0.6,

      async success(result){
        if(result.size > 110000) {
          reject({message: "File Size Too Large, must be less than 110 KB"})
        }
        const formData = new FormData()
        formData.append('file', result, imageName);
      
        const token = await getAccessTokenSilently()
        axios.post(`${apiServerUrl}/api/v2/articles/uploadImage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }).then((data) => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      },
      error(err) {
        reject(err)
      }
    })
  })
};

export const getImageUrls = async (getAccessTokenSilently) => {
  return new Promise((resolve, reject) => {
      
        getAccessTokenSilently()
          .then( (token) => {
            axios.get(`${apiServerUrl}/api/v2/articles/getImageUrls/12345`, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }).then((data) => {
              resolve(data)
            }).catch((err) => {
              reject(err)
            })
        }).catch( (err) => {
          console.log(err)
        })
        
    })
}

export const createNewArticle = async (getAccessTokenSilently, formData) => {
  return new Promise((resolve, reject) => {
        getAccessTokenSilently()
          .then( (token) => {
            axios.post(`${apiServerUrl}/api/v2/articles/create`, formData, {
              "Content-Type": "multipart/form-data",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((data) => {
              resolve(data)
            }).catch((err) => {
              reject(err)
            })
        }).catch( (err) => {
          console.log(err)
        })
    })
}

export const getArticlesByUserId = async (getAccessTokenSilently, userId) => {
  return new Promise((resolve, reject) => {
        getAccessTokenSilently()
          .then( (token) => {
            axios.get(`${apiServerUrl}/api/v2/articles/user/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((data) => {
              resolve(data)
            }).catch((err) => {
              reject(err)
            })
        }).catch( (err) => {
          console.log(err)
        })
    })
}

export const getSingleArticle = async (articleId) => {
  return new Promise((resolve, reject) => {
      axios.get(`${apiServerUrl}/api/v2/articles/${articleId}`, {
      }).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
}

