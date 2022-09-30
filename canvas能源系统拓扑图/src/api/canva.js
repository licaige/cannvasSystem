import axios from '@/libs/api.request'
import apis from './apis'

export const httpGet = ({url,params}) => {
  return axios.request({
    url:apis[url],
    params,
    method: 'get'
  })
}
