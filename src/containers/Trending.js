import React from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'
import { CircleSnail } from 'react-native-progress'
import Ionicons from 'react-native-vector-icons/Ionicons'

import RepositoriesCard from '../components/RepositoriesCard'
import RepositoriesDetail from './RepositoriesDetail'
import LanguagePage from './LanguagePage'

import { commonNavigationOptions } from '../common'
import { fetchNetData } from '../dao/common'
import TrendingDao from '../dao/TrendingDao'

import  { Button }  from '../common/basicComponents/index'


class Trending extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isloaded: false,
      data: [],
      cycle: 'daily',
      isShowPopover: false,
      url: 'https://github.com/trending',
      language: '',
      curLanguage: ''
    }
    this.props.navigation.setParams({
      reflesh: this.reflesh,
      cycle: this.state.cycle,
      isShowPopover: false,
      showPopover: this.showPopover,
      hidePopover: this.hidePopover,
      selectTime: this.selectTime
    })
  }
  static navigationOptions = ({ navigation }) => {
    let params = navigation.state.params || {}
    const {width, height} = Dimensions.get('window')
    const timeArr = ['daily', 'weekly', 'monthly']
    let title = 'today'
    if(params.cycle === 'weekly') {
      title = 'this week'
    } else if(params.cycle === 'monthly') {
      title = 'this month'
    }
    return {
      ...commonNavigationOptions,
      headerTitle: (
        <View style={{
          position: 'relative'
        }}>
          <TouchableHighlight
            onPress={() => {
              params.showPopover()
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{'Trending ' + `${title}` + ' '}</Text>
              <Ionicons name="md-arrow-dropdown" size={20} color="white" />
            </View>
          </TouchableHighlight>
          {params.isShowPopover &&
              <View style={{ borderWidth: 1, position: 'absolute', top: '70%', borderColor: '#d6d8db'}}>
                <View style={{width: 200, backgroundColor: '#f6f8fa', paddingTop: 8,
                  paddingBottom: 8, paddingLeft: 30, paddingRight: 30, borderBottomWidth: 1, borderColor: '#eaecef', zIndex: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Adjust time span</Text>
                </View>
                {timeArr.map((item) => {
                  let title = 'today'
                  if(item === 'weekly') {
                    title = 'this week'
                  } else if(item === 'monthly') {
                    title = 'this month'
                  }
                  return (<TouchableHighlight style={{width: 200, backgroundColor: 'white', paddingTop: 8,
                    paddingBottom: 8, paddingLeft: 30, paddingRight: 30, borderBottomWidth: 1, borderColor: '#eaecef'}}
                  key={item}
                  onPress = {() => { params.selectTime(item)}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: 30}}>{params.cycle === item && <Ionicons name="ios-checkmark-outline" size={20} color="black" />}</View>
                      <Text style={{color: '#586069', fontSize: 13}}>{title}</Text>
                    </View>
                  </TouchableHighlight>)
                })}
              </View>
          }
          {params.isShowPopover &&
            <TouchableOpacity
              style={{
                position: 'absolute', top: -height, left: -width, height: 2 * height, width: 2 * width,
                zIndex: -1}}
              onPress = {() => {params.hidePopover()}}>
            </TouchableOpacity>
          }
        </View>
      ),
      headerLeft: null,
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
    this.initData()
  }

  initData = async () => {
    await this.getCurLanguage()
    this.fetchData()
  }

  selectLanguage = () => {
    this.props.navigation.navigate(('LanguagePage'), {
    })
  }

  showPopover = () => {
    this.props.navigation.setParams({
      isShowPopover: true
    })
  }

  hidePopover = () => {
    this.props.navigation.setParams({
      isShowPopover: false
    })
  }

  selectTime = async (time) => {
    await this.setState({
      cycle: time
    })
    this.props.navigation.setParams({
      isShowPopover: false,
    })
    await this.fetchData()
    this.props.navigation.setParams({
      cycle: this.state.cycle
    })
  }

  getCurLanguage = async () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('curLanguage', (error, result)=>{
        if(error){
          reject(error)
        }
        if(result) {
          const res = JSON.parse(result)
          this.setState({
            language: res.path,
            curLanguage: res
          }, resolve(res))
        }
      })
    })
  }

  fetchData = () => {
    return new Promise((resolve, reject) => {
      const url = `${this.state.url}/${this.state.language}?since=${this.state.cycle}`
      this.setState({
        isloaded: false,
      })
      TrendingDao.fetchData(url)
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
    const url = `${this.state.url}/${this.state.language}?since=${this.state.cycle}`
    if(this.state.isloaded){
      this.setState({
        isloaded: false,
      })
      fetchNetData(url, 'Trending')
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
    let title = 'today'
    if(cycle === 'weekly') {
      title = 'this week'
    } else if(cycle === 'monthly') {
      title = 'this month'
    }
    const flatListHeader = (
      <View>
        <View style={styles.titleCard}>
          <Text style={{fontSize: 32, color: '#24292e', fontWeight: 'bold'}}>Trending</Text>
          <Text style={{fontSize: 16, color: '#586069', textAlign: 'center'}}>See what the GitHub community is most excited about {title}.</Text>
        </View>
        <View style={{
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: 20,
          flexDirection: 'row',
          backgroundColor: '#fafbfc',
          borderBottomWidth: 1,
          borderColor: '#e1e4e8'
        }}>
          <Text style={{fontSize: 14, color: '#24292e', fontWeight: 'bold'}}>{`Language: ${this.state.curLanguage.name}`}</Text>
          <Button
            style={{padding: 0}}
            onPress = {() => {this.selectLanguage()}}
          >
            <View>
              <Ionicons name="ios-list" size={18} />
            </View>
            <View  style={{ marginLeft: 10}}>
              <Text >Other: <Text style={{fontWeight: 'bold'}}>language</Text></Text>
            </View>
          </Button>
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
                navigation = {this.props.navigation}
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
    paddingTop: 20,
  }
})

export default StackNavigator({
  Main: { screen: Trending },
  RepositoriesDetail: { screen: RepositoriesDetail },
  LanguagePage: { screen: LanguagePage },
})
