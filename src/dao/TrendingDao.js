import { fetchLocalData, fetchNetData } from './common'

class TrendingDao{
  fetchData(url) {
    return new Promise((resolve, reject) => {
      fetchLocalData(url)
        .then(data => {resolve(data)})
        .catch(err => {
          fetchNetData(url, 'Trending')
            .then(data => {resolve(data)})
            .catch(err => {reject(err)})
        })
    })
  }
}

export default new TrendingDao()
