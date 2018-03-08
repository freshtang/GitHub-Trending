import React from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native'

class Button extends React.Component {
  render() {
    const { children } = this.props
    return (
      <TouchableHighlight style={styles.style}>
        <Text>{children}</Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  style: {
    backgroundColor: '#f4f6f9',
    alignItems: 'center',
    borderRadius: 5,
    paddingBottom: 3,
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dcdee1'
  }
})

export default Button
