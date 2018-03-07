import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducers from './reducers'

let store = createStore(reducers)

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
