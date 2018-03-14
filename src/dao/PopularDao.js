import { fetchLocalData, fetchNetData } from './common'

class PopularDao{
  fetchData(url) {
    return new Promise((resolve, reject) => {
      fetchLocalData(url)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          fetchNetData(url, 'Popular')
            .then(data => {resolve(data)})
            .catch(err => {reject(err)})
        })
    })
  }
}

export default new PopularDao()
