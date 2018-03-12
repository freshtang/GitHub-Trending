import React from 'react'
import {
  Text,
  View,
  WebView,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import { commonNavigationOptions } from '../common'

const API_URL = 'https://api.github.com/search/repositories?q='
const SORT = '&sort=stars'


class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  static navigationOptions = {
    ...commonNavigationOptions,
    title: 'Popular'
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>dasdaksbdbjk</Text>
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

export default StackNavigator({
  Popular: { screen: Popular },
})

