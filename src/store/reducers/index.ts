import { combineReducers } from 'redux'
import home from './home'
import settings from './settings'
import news from './news'
import profile from './profile'
import post from './post'

export default combineReducers({
  news,
  home,
  settings,
  profile,
  post,
})
