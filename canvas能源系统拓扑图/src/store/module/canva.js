import { httpGet } from '@/api/canva'

export default {
  state:{

  },
  mutations:{

  },
  getters:{

  },
  actions:{
    getAll ({ state, commit },params) {
      return new Promise((resolve, reject) => {
        httpGet({url:'getAll', params}).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
