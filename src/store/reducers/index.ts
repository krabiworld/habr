import { combineReducers } from 'redux'
import home from './home'
import settings from './settings'
import news from './news'
import hubs from './hubs'
import profile from './profile'
import post from './post'
import hub from './hub'

export default combineReducers({
  news,
  home,
  settings,
  hubs,
  profile,
  post,
  hub,
})
