import { callExternalApi } from "./api.service";
import axios from "axios"
import Compressor from "compressorjs"

const apiServerUrl = (import.meta.env.VITE_ENV == "production") ? import.meta.env.VITE_API_SERVER_URL_PROD : import.meta.env.VITE_API_SERVER_URL_DEV;

export const getPublicResource = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

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