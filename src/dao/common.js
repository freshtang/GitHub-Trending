import {
  AsyncStorage,
} from 'react-native'
import GitHubTrending from 'GitHubTrending'

export function saveRepository(url, data, callback) {
  if (!data || !url)return
  let wrapData = {data: data, date: new Date().getTime()}
  AsyncStorage.setItem(url, JSON.stringify(wrapData), callback)
}

export function checkDateDate(Time) {
  const currentDate = new Date()
  const targetDate = new Date(Time)
  if (currentDate.getMonth() !== targetDate.getMonth())return false
  if (currentDate.getDate() !== targetDate.getDate())return false
  if (currentDate.getHours() - targetDate.getHours() > 4)return false
  return true
}

export function fetchLocalData(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (err, data) => {
      if(err) {
        reject(err)
      }
      if(data) {
        const result = JSON.parse(data)
        if(!checkDateDate(result.date)) {
          reject('expired')
        }
        resolve(result.data)
      } else {
        reject('no data')
      }
    })
  })
}

export function fetchNetData(url, type) {
  
  return new Promise((resolve, reject) => {
    if(type === 'Trending'){
      new GitHubTrending().fetchTrending(url)
        .then((data)=> {
          resolve(data)
          saveRepository(url, data)
        }).catch((error)=> {
          reject(error)
        })
    } else {
      fetch(url)
        .then((response)=>response.json())
        .catch((error)=> {
          reject(error)
        }).then((responseData)=> {
          if (!responseData || !responseData.items) {
            reject('responseData is null')
          } else {
            resolve(responseData.items)
            saveRepository(url, responseData.items)
          }
        })
    }
  })
  
}
