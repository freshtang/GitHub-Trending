import Trending from './Trending'
import RepositoriesDetail from './RepositoriesDetail'

import {
  StackNavigator,
} from 'react-navigation'

const App = StackNavigator({
  Main: {screen: Trending},
  Profile: {screen: RepositoriesDetail},
})

export default App
