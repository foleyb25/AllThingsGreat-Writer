import axios from "axios"
import Compressor from "compressorjs"
import { auth0 } from '../auth0'

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL

export const uploadImage = async (blob, imageName, writerId, type) => {
  //Check file size and if we need compression ( > 110 kb)
  return new Promise((resolve, reject) => {
    let apiurl;
    switch (type) {
      case 'article':
        apiurl = `${apiServerUrl}/api/v2/articles/uploadImage/writer/${writerId}`
        break;
      case 'profile':
        apiurl = `${apiServerUrl}/api/v2/articles/uploadProfileImage/writer/${writerId}`
        break;
      default:
        reject(new Error("Unknown uploadImage type"));
        break;
    }
    try {
      new Compressor(blob, {
        quality: 0.6,
        async success(result){
          if(result.size > 110000) {
            reject( {
              status: 'error',
              message: "File Size Too Large, must be less than 110 KB",
            } )
          }
          const formData = new FormData()
          formData.append('file', result, imageName);
        
          try {
            const token = await auth0.getAccessTokenSilently()
            const response = await axios.post(`${apiurl}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            })
            resolve ( {
              status: 'success',
              message: 'successfully uploaded article image',
              data: response.data
            } )
          } catch (err) {
            reject( {
              status: 'error',
              message: err.message,
            } )
          }
          
        },
      })
    } catch (err) {
      return {
        status: 'error',
        message: err.message,
      }
    }
  })
};

export const getImageUrls = async (writerId, type) => { 
  try {
    let apiurl;
    switch (type) {
      case 'article':
        apiurl = `${apiServerUrl}/api/v2/articles/getImageUrls/writer/${writerId}`
        break;
      case 'profile':
        apiurl = `${apiServerUrl}/api/v2/writers/getProfileImageUrls/${writerId}`
        break;
      default:
        reject(new Error("Unknown uploadImage type"));
        break;
    }
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.get(`${apiurl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully retrieved article image urls',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }    
}

export const getProfileImageUrls = async (writerId) => { 
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.get(`${apiServerUrl}/api/v2/articles/getProfileImageUrls/writer/${writerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully retrieved article image urls',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }    
}

export const createNewArticle = async (formData, innerText) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.post(`${apiServerUrl}/api/v2/articles/create`, {article: formData, innerText: innerText}, {
      "Content-Type": "multipart/form-data",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully created new article',
      data: response.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

export const updateArticle = async (id, formData, innerText) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.patch(`${apiServerUrl}/api/v2/articles/update/`+id, {article: formData, innerText: innerText}, {
      "Content-Type": "multipart/form-data",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully updated article',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

export const updateWriter = async (writer) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.patch(`${apiServerUrl}/api/v2/writers`, writer, {
      "Content-Type": "multipart/form-data",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully updated writer',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

export const getArticlesByWriterId = async (userId) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.get(`${apiServerUrl}/api/v2/articles/writer/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully retrieved articles by writer id',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }     
}

export const getAllArticles = async () => {
  try {
    const token = auth0.getAccessTokenSilently()
    const response = await axios.get(`${apiServerUrl}/api/v2/articles/writer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully retrieved all articles',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }   
}

export const getSingleArticle = async (articleId) => {
  try {
    const response = await axios.get(`${apiServerUrl}/api/v2/articles/${articleId}`)
    return {
      status: 'success',
      message: 'successfully retrieved articles by writer id',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

export const getAuthenticatedWriter = async () => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.get(`${apiServerUrl}/api/v2/writers/authID/${auth0.user.value.sub}`, {
      headers: {
        Authorization: `Bearer ${token}`,
    }})
    return {
      status: 'success',
      message: 'successfully retrieved authenticated writer',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

export const saveDraftState = async (mongoId, body) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.patch(`${apiServerUrl}/api/v2/writers/${mongoId}/draft`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully saved draft',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
    
}

export const deleteDraft = async (writerId, draftId) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.delete(`${apiServerUrl}/api/v2/writers/${writerId}/draft/${draftId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully deleted draft',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

export const approveArticle = async (mongoId) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.patch(`${apiServerUrl}/api/v2/articles/${mongoId}/approve`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully approved article',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

export const unApproveArticle = async (mongoId) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.patch(`${apiServerUrl}/api/v2/articles/${mongoId}/unapprove`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully un-approved article',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

export const archiveArticle = async (mongoId) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.patch(`${apiServerUrl}/api/v2/articles/${mongoId}/archive`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully archived article',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

export const unArchiveArticle = async (mongoId) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.patch(`${apiServerUrl}/api/v2/articles/${mongoId}/unarchive`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully un-archived article',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

export const evaluate = async (articleText) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.post(`${apiServerUrl}/api/v2/articles/evaluate`, {articleText: articleText}, {
      "Content-Type": "multipart/form-data",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully retrieved evaluation',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

export const analyze = async (teamA, teamB) => {
  try {
    const token = await auth0.getAccessTokenSilently()
    const response = await axios.post(`${apiServerUrl}/api/v2/articles/game/analyze`, {teamA: teamA, teamB: teamB}, {
      "Content-Type": "multipart/form-data",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return {
      status: 'success',
      message: 'successfully retrieved evaluation',
      data: response.data.data
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message,
    }
  }
}

