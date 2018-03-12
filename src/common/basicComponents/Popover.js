import React from 'react'
import {
  View
} from 'react-native'

class Popover extends React.Component {
  render() {
    const { children, direction, isVisible } = this.props
    return (
      <View style={{
        position: 'absolute',
        padding: 5,
        top: '100%',
        left: '50%',
      }}>
        {isVisible && children}
      </View>
    )
  }
}



export default Popover
