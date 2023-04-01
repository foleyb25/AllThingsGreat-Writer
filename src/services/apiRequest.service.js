import axios from "axios"
import Compressor from "compressorjs"
import { auth0 } from '../auth0'

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
      
        const token = await auth0.getAccessTokenSilently()
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

export const getImageUrls = async () => {
  return new Promise((resolve, reject) => {
      
        auth0.getAccessTokenSilently()
          .then( (token) => {
            axios.get(`${apiServerUrl}/api/v2/articles/getImageUrls`, {
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

export const createNewArticle = async (formData) => {
  return new Promise((resolve, reject) => {
        auth0.getAccessTokenSilently()
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

export const updateArticle = async (id, formData) => {
  return new Promise((resolve, reject) => {
        auth0.getAccessTokenSilently()
          .then( (token) => {
            axios.patch(`${apiServerUrl}/api/v2/articles/update/`+id, formData, {
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

export const updateWriter = async (writer) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const respone = await axios.patch(`${apiServerUrl}/api/v2/writers`, writer, {
    "Content-Type": "multipart/form-data",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    return response
  } catch (err) {
    return err
  }
  
}



export const getArticlesByWriterId = async (userId) => {
  return new Promise((resolve, reject) => {
        auth0.getAccessTokenSilently()
          .then( (token) => {
            axios.get(`${apiServerUrl}/api/v2/articles/writer/${userId}`, {
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

export const getAllArticles = async () => {
  try {
    const token = auth0.getAccessTokenSilently()
    return await axios.get(`${apiServerUrl}/api/v2/articles/writer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err) {
    return err
  }   
}

export const getSingleArticle = async (articleId) => {
  try {
    return axios.get(`${apiServerUrl}/api/v2/articles/${articleId}`)
  } catch (err) {
    return err
  }
}

export const getAuthenticatedWriter = async () => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const data = await axios.get(`${apiServerUrl}/api/v2/writers/authID/${auth0.user.value.sub}`, {
      headers: {
        Authorization: `Bearer ${token}`,
    }})
    return data
  } catch (err) {
    return err
  }
}

export const saveDraftState = async (mongoId, body) => {
    const token = auth0.getAccessTokenSilently()
          axios.patch(`${apiServerUrl}/api/v2/writers/${mongoId}/draft`, body, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((data) => {
            // What to do with the data here?
            resolve(data)
          }).catch((err) => {
            reject(err)
          })
}

export const deleteDraft = async (writerId, draftId) => {
  try {
    const token = await auth0.getAccessTokenSilently()
          await axios.delete(`${apiServerUrl}/api/v2/writers/${writerId}/draft/${draftId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    
  } catch (err) {
    return err
  }
}

export const approveArticle = async (mongoId) => {
  auth0.getAccessTokenSilently().then( (token) => {
    return axios.patch(`${apiServerUrl}/api/v2/articles/${mongoId}/approve`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }).catch( (err) => {
    return err
  })

}

export const unApproveArticle = async (mongoId) => {
  auth0.getAccessTokenSilently().then( (token) => {
    return axios.patch(`${apiServerUrl}/api/v2/articles/${mongoId}/unapprove`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }).catch( (err) => {
    return err
  })
}

export const archiveArticle = async (mongoId) => {
  auth0.getAccessTokenSilently().then( (token) => {
    return axios.patch(`${apiServerUrl}/api/v2/articles/${mongoId}/archive`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }).catch( (err) => {
    return err
  })
}

export const unArchiveArticle = async (mongoId) => {
  auth0.getAccessTokenSilently().then( (token) => {
    return axios.patch(`${apiServerUrl}/api/v2/articles/${mongoId}/unarchive`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }).catch( (err) => {
    return err
  })
}


