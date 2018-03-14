import React from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

import { commonNavigationOptions } from '../common'
import PopularDao from '../dao/PopularDao'
import { fetchNetData } from '../dao/common'
import PopularTab from '../components/PopularTab'


class Popular extends React.Component {
  constructor(props) {
    const API_URL = 'https://api.github.com/search/repositories?q='
    const SORT = '&sort=stars&page=1&per_page=15'
    super(props)
    this.state = {
      url: API_URL + 'javascript' + SORT,
      data: [],
      isloaded: false
    }
    this.props.navigation.setParams({
      reflesh: this.reflesh
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
      headerTitle: 'Popular',
      headerRight: (
        <TouchableHighlight
          onPress={() => { params.reflesh()}}
          style={ {marginRight: 15}}>
          <View>
            <Ionicons name="md-refresh" size={30} color="white" />
          </View>
        </TouchableHighlight>
      )
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

  reflesh = () => {
    const url = `${this.state.url}`
    if(this.state.isloaded){
      this.setState({
        isloaded: false,
      })
      fetchNetData(url, 'Popular')
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
    return (
      
      <ScrollableTabView
        initialPage={0}
        tabBarUnderlineStyle = {{backgroundColor: 'white'}}
        tabBarActiveTextColor = 'white'
        tabBarInactiveTextColor = '#999'
        renderTabBar={() =>
          <ScrollableTabBar
            underlineStyle={{borderColor: '#fafbfc'}}
            style={{backgroundColor: '#24292e'}} />}
      >
        
        <PopularTab key='JavaScript' tabLabel='JavaScript' language='javascript' />
        <PopularTab key='Java' tabLabel='Java' language='java' />
        <PopularTab key='Go' tabLabel='Go' language='go' />
      </ScrollableTabView>
        
  
    )
  }
}

export default StackNavigator({
  Popular: { screen: Popular },
})

