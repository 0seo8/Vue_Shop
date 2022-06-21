import axios from 'axios'
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env

const API_ENDPOINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api'
const headers = {
  'content-type': 'application/json',
  apikey: VITE_API_KEY,
  username: VITE_USERNAME
}

export default {
  install: (app) => {
    app.config.globalProperties.$fetch = async (url, opts) => {
      const mergeHeader = {
        ...headers,
        ...opts.headers
      }
      const { data } = await axios(API_ENDPOINT + url, {
        ...opts,
        headers: mergeHeader
      })
      return data
    }
  }
}
