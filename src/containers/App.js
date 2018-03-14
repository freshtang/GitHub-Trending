import Trending from './Trending'
import React from 'react'
import Popular from './Popular'
import Search from './Search'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TabNavigator, TabBarBottom } from 'react-navigation'

const App = TabNavigator(
  {
    Trending: {
      screen: Trending
    },
    Popular: {
      screen: Popular
    },
    Search: {
      screen: Search
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Popular') {
          iconName = `ios-flame${focused ? '' : '-outline'}`
        } else if (routeName === 'Trending') {
          iconName = `${focused ? 'md-trending-up' : 'ios-trending-up-outline'}`
        } else if (routeName === 'Search') {
          iconName = `${focused ? 'md-search' : 'ios-search-outline'}`
        } else {
          iconName = `ios-options${focused ? '' : '-outline'}`
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: '#24292e',
      inactiveTintColor: 'gray',
      showIcon: true
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)

export default App
