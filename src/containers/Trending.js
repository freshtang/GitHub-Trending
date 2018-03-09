import React from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Button,
  Image,
  TouchableHighlight
} from 'react-native'
import { CircleSnail, Circle, Pie } from 'react-native-progress'

import RepositoriesCard from '../components/RepositoriesCard'

import { commonNavigationOptions } from '../common'
import { fetchNetData } from '../dao/common'
import TrendingDao from '../dao/TrendingDao'

export default class Trending extends React.Component{
  state = {
    isloaded: false,
    data: [],
    cycle: 'today',
    url: 'https://github.com/trending'
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    return {
      ...commonNavigationOptions,
      title: 'Trending',
      headerRight: (
        <TouchableHighlight
          onPress={() => { params.reflesh()}}
          style={ {marginRight: 15}}>
          <View>
            <Image source={require('../static/img/reflesh.png')}
              style={{width: 24, height: 24}}
            />
          </View>
        
        </TouchableHighlight>
      )
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ reflesh: this.reflesh })
    TrendingDao.fetchData(this.state.url)
      .then(data => {
        const _this = this
        setTimeout(function (){
          _this.setState({
            isloaded: true,
            data: data,
          })
        }, 500)
        
      })
      .catch(err => {
        alert(err)
      })
  }

  reflesh = () => {
    if(this.state.isloaded){
      this.setState({
        isloaded: false,
      })
      fetchNetData(this.state.url, 'Trending')
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
  }

  render() {
    const { data, cycle } = this.state
    const flatListHeader = (
      <View>
        <View style={styles.titleCard}>
          <Text style={{fontSize: 32, color: '#24292e', fontWeight: 'bold'}}>Trending</Text>
          <Text style={{fontSize: 16, color: '#586069', textAlign: 'center'}}>See what the GitHub community is most excited about {cycle}.</Text>
        </View>
        {!this.state.isloaded && <View style={{
          width: '100%',
          alignItems: 'center',
          borderColor: '#e1e4e8',
          paddingBottom: 10,
          paddingTop: 10
        }}>
          <CircleSnail></CircleSnail>
        </View>}
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
