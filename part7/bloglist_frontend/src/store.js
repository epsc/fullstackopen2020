import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import currentUserReducer from './reducers/currentUserReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  currentUser: currentUserReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store