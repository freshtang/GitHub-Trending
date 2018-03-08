import React from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Text
} from 'react-native'

import RepositoriesCard from '../components/RepositoriesCard'

import { commonNavigationOptions } from '../common'
import TrendingDao from '../dao/TrendingDao'

export default class Trending extends React.Component{
  state = {
    isloaded: false,
    data: [],
    cycle: 'today'
  }

  static navigationOptions = {...commonNavigationOptions, title: 'Trending'}

  componentDidMount() {
    TrendingDao.fetchData('https://github.com/trending')
      .then(data => {
        this.setState({
          isloaded: true,
          data: data,
        })
      })
      .catch(err => {
        alert(err)
      })
  }

  render() {
    const { data, cycle } = this.state
    const flatListHeader = (
      <View style={styles.titleCard}>
        <Text style={{fontSize: 32, color: '#24292e', fontWeight: 'bold'}}>Trending</Text>
        <Text style={{fontSize: 16, color: '#586069', textAlign: 'center'}}>See what the GitHub community is most excited about {cycle}.</Text>
      </View>
    )
    return (
      <View style={styles.container}>
        
        <View style={{width: '100%'}}>
          
          <FlatList
            ListHeaderComponent = {flatListHeader}
            data={data}
            renderItem={({item}) =>
              <RepositoriesCard
                fork = {item.forkCount}
                watchers = {item.starCount}
                language = {item.language}
                description = {item.description}
                name = {item.fullName}
                meta = {item.meta}
                contributors = {JSON.stringify(item.contributors)}
              />}
          />
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleCard: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafbfc',
    paddingBottom: 40,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderColor: '#e1e4e8'
  }
})
