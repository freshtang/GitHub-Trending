import React from 'react'
import {
  Text,
  View,
  WebView,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { commonNavigationOptions } from '../common'

const WEBVIEW_REF = 'webview'

class RepositoriesDetail extends React.Component {
  constructor(props) {
    super(props)
    const url = 'https://github.com/' + this.props.navigation.state.params.name
    this.state = {
      url: url,
      canGoBack: false,
    }
    this.props.navigation.setParams({ goback: this.onLeftButtonClick })
  }

  static navigationOptions = ({ navigation }) =>
  {
    const params = navigation.state.params || {}
    return {
      ...commonNavigationOptions,
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#24292e',
      },
      title: navigation.state.params.name,
      headerLeft: (
        <TouchableHighlight
          onPress={() => {
            params.goback()
          }}
          style={ {marginRight: 15}}>
          <View>
            <Ionicons style={{paddingLeft: 10, paddingRight: 20 }} name="ios-arrow-back-outline" size={40} color="white" />
          </View>
        </TouchableHighlight>
      )
    }
  }

  onLeftButtonClick = () => {
    if (this.state.canGoBack) {
      this.refs[WEBVIEW_REF].goBack()
    } else {
      this.props.navigation.pop()
    }
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url,
    })
  }
  render() {
    const { params } = this.props.navigation.state
    return (
      <View style={styles.container}>
        <WebView
          ref={WEBVIEW_REF}
          startInLoadingState={true}
          onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
          source={{uri: this.state.url}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: -50,
    // marginBottom: Platform.OS === "ios" ? 50 : 0,
  }
})

export default RepositoriesDetail
