import React from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  FlatList
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { CircleSnail } from 'react-native-progress'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { commonNavigationOptions } from '../common'
import PopularDao from '../dao/PopularDao'
import RepositoriesCard from '../components/RepositoriesCard'


class Search extends React.Component {
  constructor(props) {
    
    super(props)
    this.state = {
      data: [],
      isloaded: true,
      isShowInput: false,
      text: ''
    }
    this.props.navigation.setParams({
      showSearch: this.showSearch
    })
  }
  static navigationOptions = ({ navigation }) => {
    let params = navigation.state.params || {}
    return {
      ...commonNavigationOptions,
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#24292e',
      },
      headerTitle: 'Search',
      headerRight: (
        <TouchableHighlight
          onPress={() => { params.showSearch()}}
          style={ {marginRight: 15}}>
          <View>
            <Ionicons name="ios-search" size={30} color="white" />
          </View>
        </TouchableHighlight>
      )
    }
  }
  componentDidMount() {
  }
  fetchData = () => {
    const API_URL = 'https://api.github.com/search/repositories?q='
    const SORT = '&sort=match&page=1&per_page=10'
    return new Promise((resolve, reject) => {
      const url = API_URL + this.state.text + SORT
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
  showSearch = () => {
    this.setState({
      isShowInput: !this.state.isShowInput
    })
  }
  search = () => {
    this.setState({
      data: []
    })
    this.fetchData()
      .then(
        this.setState({
          isShowInput: false
        })
      )
  }
  
  render() {
    const { data } = this.state
    return (
      <View style={styles.container}>
        {this.state.isShowInput && <TextInput
          style={{height: 40, borderColor: '#0366d6', borderWidth: 1, borderRadius: 10, margin: 10}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          autoFocus
          placeholder="Enter the key word"
          onSubmitEditing={() => this.search()}
        />}
        <View style={{
          backgroundColor: 'white'
        }}>
          {!this.state.isloaded && <View style={{
            width: '100%',
            alignItems: 'center',
            borderColor: '#e1e4e8',
            paddingBottom: 10,
            paddingTop: 10
          }}>
            <CircleSnail></CircleSnail>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default StackNavigator({
  Search: { screen: Search },
})

