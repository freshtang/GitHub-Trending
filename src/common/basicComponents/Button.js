import React from 'react'
import {
  TouchableHighlight,
  View
} from 'react-native'

class Button extends React.Component {
  render() {
    let { children, style, onPress } = this.props
    if(!style) {
      style = {}
    }
    const newStyle = Object.assign({}, style, styles.style)
    return (
      <TouchableHighlight
        onPress={onPress}
        style={newStyle}>
        <View style={styles.content}>{children}</View>
      </TouchableHighlight>
    )
  }
}

const styles = {
  style: {
    backgroundColor: '#f4f6f9',
    borderRadius: 5,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#dcdee1'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  }
}

export default Button
