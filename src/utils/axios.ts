import Axios from 'axios'
import { api_url} from '../utils/constants'

export const axios = Axios.create({
  baseURL: api_url,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:8000',
    'Content-type': 'Application/json',
    'Content-Encoding': 'gzip, deflate',
  },
  withCredentials: true,
})

// axios with token
export const axios_auth = (key : string) => {
    return Axios.create({
      baseURL: api_url,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-type': 'Application/json',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:8000',
        Authorization: 'Bearer ' + key,
        'Content-Encoding': 'gzip, deflate',
      },
      withCredentials: true,
    })
}
