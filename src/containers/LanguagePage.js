import React from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import languageArr from '../static/data/language'
import { commonNavigationOptions } from '../common'

const navigateAction = NavigationActions.navigate({
  routeName: 'Main',
  params: {},
})

class LanguagePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RecentlyLanguage: []
    }
    this.getRecentlyLanguage()
  }

  static navigationOptions = commonNavigationOptions

  selectLanguage = (lang) => {
    const select = lang
    let newRecently = this.state.RecentlyLanguage
    if(this.checkRepeat(newRecently, select)) {
      newRecently.unshift(select)
    }
    newRecently = newRecently.slice(0, 4)
    AsyncStorage.setItem('language', JSON.stringify(newRecently))
    AsyncStorage.setItem('curLanguage', JSON.stringify(select))
    this.props.navigation.dispatch(navigateAction)
  }

  checkRepeat(OjArr, ob) {
    for(let i = 0; i < OjArr.length; i++) {
      if(OjArr[i].name === ob.name) {
        return false
      }
    }
    return true
  }

  getRecentlyLanguage = () => {
    AsyncStorage.getItem('language', (error, result)=>{
      if(error){
        return
      }
      if(result) {
        this.setState({
          RecentlyLanguage: JSON.parse(result)
        })
      }
    })
  }

  render() {
    const data = languageArr
    return (
      <View
        style={styles.container}>
        
        <ScrollView style={{
          backgroundColor: '#fafbfc'
        }}>
          {this.state.RecentlyLanguage.length > 0 &&
            <View>
              <View style={{padding: 10}}>
                <Text style={{ color: 'black'}}>Recently selected</Text>
              </View>
              {this.state.RecentlyLanguage.map((item, index) => {
                if((index + 1) % 2) {
                  return (<View style={{
                    width: '100%',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                  }}>
                    <TouchableHighlight key={item.name} style={{
                      backgroundColor: 'white',
                      width: '50%',
                      borderWidth: 1,
                      borderColor: '#d6d8db',
                      padding: 10
                    }} onPress={() => {this.selectLanguage(item)}}>
                      <Text style={{color: '#24292e', fontSize: 15, fontWeight: 'bold'}}>{item.name}</Text>
                    </TouchableHighlight>
                    { this.state.RecentlyLanguage[index + 1] && <TouchableHighlight key={this.state.RecentlyLanguage[index + 1].name} style={{
                      backgroundColor: 'white',
                      width: '50%',
                      borderWidth: 1,
                      borderColor: '#d6d8db',
                      padding: 10
                    }} onPress={() => {this.selectLanguage(this.state.RecentlyLanguage[index + 1])}}>
                      <Text style={{color: '#24292e', fontSize: 15, fontWeight: 'bold'}}>{this.state.RecentlyLanguage[index + 1].name}</Text>
                    </TouchableHighlight>}
                  </View>)
                }
                
              })}
            </View>
          }
          <View style={{padding: 10}}>
            <Text style={{ color: 'black'}}>Other language</Text>
          </View>
          {data.map((item, index) => {
            if((index + 1) % 2) {
              return (<View style={{
                width: '100%',
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}>
                <TouchableHighlight key={item.name} style={{
                  backgroundColor: 'white',
                  width: '50%',
                  borderWidth: 1,
                  borderColor: '#d6d8db',
                  padding: 10
                }} onPress={() => {this.selectLanguage(item)}}>
                  <Text style={{color: '#24292e', fontSize: 15, fontWeight: 'bold'}}>{item.name}</Text>
                </TouchableHighlight>
                { data[index + 1] && <TouchableHighlight key={data[index + 1].name} style={{
                  backgroundColor: 'white',
                  width: '50%',
                  borderWidth: 1,
                  borderColor: '#d6d8db',
                  padding: 10
                }} onPress={() => {this.selectLanguage(data[index + 1])}}>
                  <Text style={{color: '#24292e', fontSize: 15, fontWeight: 'bold'}}>{data[index + 1].name}</Text>
                </TouchableHighlight>}
              </View>)
            }
            
          })}
        </ScrollView>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
})

export default LanguagePage
