/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import {
  Platform,
  Text,
  View
} from 'react-native'

import main from '../styles/main'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
})

export default class App extends React.Component{
  render() {
    return (
      <View style={main.container}>
        <Text style={main.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={main.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={main.instructions}>
          {instructions}
        </Text>
      </View>
    )
  }
}
