import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native'

import  { Button }  from '../common/basicComponents/index'

class RepositoriesCard extends React.Component {
  formatDescription(des){
    const sindex = des.indexOf('<g-emoji'),
      eindex = des.indexOf('>')
    let result = des.slice(0, sindex) + des.slice(eindex + 1)
    const lindex = result.indexOf('</g-emoji>')
    result = result.slice(0, lindex) + result.slice(lindex + 10)
    return result
  }
  render() {
    const { fork, watchers, language, owner, name, avatar, meta } = this.props
    let { contributors, description } = this.props
    contributors = JSON.parse(contributors)
    description = this.formatDescription(description)
    let color = '#707070'
    switch(language) {
    case 'JavaScript':
      color = '#f1e05a'
      break
    case 'Dart':
      color = '#00B4AB'
      break
    case 'HTML':
      color = '#e34c26'
      break
    case 'C':
      color = '#555555'
      break
    case 'Go':
      color = '#375eab'
      break
    case 'Python':
      color = '#3572A5'
      break
    default:
      color = '#707070'
      break
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1, flexDirection: 'row'}}>
            {avatar ? <Image source={{url: avatar}} style={styles.avatar} /> : ''}
            <View>
              <Text style={{ fontSize: 20, color: '#0366d6'}}>{name.split('/')[0]}/<Text style={{ fontWeight: 'bold', color: '#0366d6', fontSize: 20}}>{name.split('/')[1]}</Text></Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center'}}>
            <Button>
              <View style={{ justifyContent: 'center', flexDirection: 'row', paddingTop: 5}}>
                <Image source={require('../static/img/star.png')} style={{width: 14, height: 16, paddingRight: 3}} />
                <Text style={{ fontWeight: 'bold'}}>Star</Text>
              </View>
            </Button>
          </View>
        </View>
        <View style={{ marginBottom: 8}}>
          <Text style={{color: '#586069'}}>{description}</Text>
        </View>
        <View style={{justifyContent: 'flex-start', flexWrap: 'wrap', flexDirection: 'row', display: 'flex', width: '100%'}}>
          <View style={styles.bottomTag}>
            <Image source={require('../static/img/grey_star.png')} style={{width: 14, height: 16, paddingRight: 3}} />
            <Text style={styles.tagText}>{watchers}</Text>
          </View>
          <View style={styles.bottomTag}>
            <Image source={require('../static/img/code-fork.png')} style={{width: 14, height: 16, paddingRight: 3}} />
            <Text style={styles.tagText}>{fork}</Text>
          </View>
          {language && <View style={styles.bottomTag}>
            <View style={{
              backgroundColor: color,
              borderRadius: 8,
              width: 16,
              height: 16,
              marginRight: 3
            }}>
            </View>
            <Text style={styles.tagText}>{language}</Text>
          </View>}
          <View style={styles.bottomTag}>
            <Text style={styles.tagText}>Build by</Text>
            {contributors.map((contributor) =>
              <Image key={contributor} source={{url: contributor}} style={{width: 20, height: 20, marginLeft: 3}} />)}
          </View>
          <View style={styles.bottomTag}>
            <Image source={require('../static/img/grey_star.png')} style={{width: 14, height: 16, paddingRight: 3}} />
            <Text style={styles.tagText}>{meta}</Text>
          </View>
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 24,
    paddingTop: 24,
    borderBottomWidth: 1,
    borderColor: '#eaecef',
    width: '90%',
    marginLeft: '5%'
  },
  header: {
    width: '100%',
    marginBottom: 4,
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: 8
  },
  bottomTag: {
    display: 'flex',
    marginRight: '5%',
    flexDirection: 'row',
    marginBottom: 5
  },
  tagText: {
    fontWeight: 'bold',
    color: '#707070'
  }
})

export default RepositoriesCard