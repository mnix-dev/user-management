import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import userReducer from './user/reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['note']
}

// const rootReducer = combineReducers({
//   user: userReducer
// })

const rootReducer

export default persistReducer(persistConfig, rootReducer)