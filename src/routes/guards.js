import router from './index.js'
import axios from 'axios'

const { VITE_API_KEY, VITE_USERNAME } = import.meta.env

async function me(accessToken) {
  if(!accessToken) return 
  const {data: user} = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      apikey: VITE_API_KEY,
      username: VITE_USERNAME,
      Authorization: `Bearer ${accessToken}`
    },
  })
  return !!user.email 
}

router.beforeEach(async (to) => {
  if(to.meta.auth) {
    const accessToken = localStorage.getItem('token')
    return await me(accessToken)
      ? true
      : '/login'
  }
  return true
})

