import React from 'react'
import {
  View,
  FlatList,
} from 'react-native'
import { CircleSnail } from 'react-native-progress'

import RepositoriesCard from '../components/RepositoriesCard'
import PopularDao from '../dao/PopularDao'

export default class PopularTab extends React.Component {
  constructor(props) {
    const API_URL = 'https://api.github.com/search/repositories?q='
    const SORT = '&sort=stars&page=1&per_page=15'
    super(props)
    this.state = {
      isloaded: false,
      data: [],
      language: props.language,
      url: API_URL + this.props.language + SORT,
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = () => {
    return new Promise((resolve, reject) => {
      const url = this.state.url
      this.setState({
        isloaded: false,
      })
      PopularDao.fetchData(url)
        .then(data => {
          const _this = this
          setTimeout(function (){
            _this.setState({
              isloaded: true,
              data: data,
            })
            resolve(data)
          }, 500)
          
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  render() {
    const { data } = this.state
    return (
      <View style={{
        backgroundColor: 'white'
      }}>
        {!this.state.isloaded && <View style={{
          position: 'absolute',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'black',
          zIndex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.4
        }}>
          <CircleSnail style={{opacity: 1}}></CircleSnail>
        </View>}
        
        <FlatList
          data={data}
          renderItem={({item}) =>
            <RepositoriesCard
              fork = {item.forks_count}
              watchers = {item.watchers_count}
              language = {item.language}
              description = {item.description}
              name = {item.full_name}
              navigation = {this.props.navigation}
              contributors = {JSON.stringify([item.owner.avatar_url])}
            />}
        />
      </View>
    )
  }
}
