import { authReducer } from './auth.reducer'
import { uiReducer } from './ui.reducer'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import thunk from 'redux-thunk'
// import { routerMiddleware, connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import Api from '../services/api/redux'

export const history = createBrowserHistory()
// const router = routerMiddleware(history)

let createStoreWithMiddleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV === 'production' || process.env.PLATFORM_ENV !== 'web') {
  createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(thunk),
    // applyMiddleware(router)
  )(createStore)
} else {
  createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(thunk)
  )(createStore)
}

function configureStore() {
  const store = createStoreWithMiddleware(combineReducers({
    Api: Api.reducer,
    Auth: authReducer,
    UI: uiReducer,
    //register: registerReducer,
    //search: searchReducer
    // router: connectRouter(history)
  }))
  return store
}

const Store = configureStore()

export default Store
