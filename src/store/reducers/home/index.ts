import {
  HOME_PREFIX,
  SIDEBAR_TOP_COMPANIES,
  SIDEBAR_MOST_READING,
  SET_HOME_POST_ITEM_SIZE,
} from './types'
import { Mode, RATING_MODES } from 'src/config/constants'
import { FetchingState, Posts } from 'src/interfaces'
import getCachedMode from 'src/utils/getCachedMode'
import getPostFirstImage from 'src/utils/getPostFirstImage'

interface ModeObject {
  pages: Record<number, Omit<Posts, 'pagesCount'>>
  pagesCount: number | null
  lastUpdated: number | null
}

const modes: Record<Mode, ModeObject> = {} as Record<Mode, ModeObject>
RATING_MODES.forEach(({ mode }) => {
  modes[mode] = {
    pages: {},
    pagesCount: null,
    lastUpdated: null,
  }
})

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: modes,
  sizesMap: {},
  sidebar: {
    mostReading: {
      state: FetchingState.Idle,
      fetchError: null,
      data: null,
    },
    topCompanies: {
      state: FetchingState.Idle,
      fetchError: null,
      data: null,
    },
  },
  mode: getCachedMode().mode,
}

export default (
  state = initialState,
  // TODO: fix types
  //@ts-expect-error temporary fix
  { type, payload }
): typeof initialState => {
  switch (type) {
    case HOME_PREFIX + 'FETCH': {
      state.fetching = true
      state.fetched = false
      state.error = null
      state.mode = payload.mode
      return { ...state }
    }

    case HOME_PREFIX + 'FETCH_FULFILLED': {
      const { page, pagesCount, data, mode } = payload as {
        page: number
        pagesCount: number
        data: Posts
        mode: Mode
      }

      for (const id in data.publicationRefs) {
        data.publicationRefs[id].postFirstImage =
          getPostFirstImage(data.publicationRefs[id]) || undefined
      }

      state.data[mode].pages[page] = data
      state.data[mode].pagesCount = pagesCount
      state.data[mode].lastUpdated = Date.now()
      state.fetching = false
      state.fetched = true
      state.error = null

      return { ...state }
    }

    case HOME_PREFIX + 'FETCH_REJECTED': {
      return { ...state, fetching: false, fetched: false, error: payload }
    }

    case SET_HOME_POST_ITEM_SIZE: {
      // TODO: fix types
      //@ts-expect-error temporary fix
      state.sizesMap[payload.id] = payload.size
      return { ...state }
    }

    case SIDEBAR_MOST_READING + 'FETCH': {
      state.sidebar.mostReading.data = null
      state.sidebar.mostReading.fetchError = null
      state.sidebar.mostReading.state = FetchingState.Fetching
      return { ...state }
    }

    case SIDEBAR_MOST_READING + 'FETCH_FULFILLED': {
      state.sidebar.mostReading.data = payload
      state.sidebar.mostReading.fetchError = null
      state.sidebar.mostReading.state = FetchingState.Fetched
      return { ...state }
    }

    case SIDEBAR_MOST_READING + 'FETCH_REJECTED': {
      state.sidebar.mostReading.data = null
      state.sidebar.mostReading.fetchError = payload
      state.sidebar.mostReading.state = FetchingState.Error
      return { ...state }
    }

    case SIDEBAR_TOP_COMPANIES + 'FETCH': {
      state.sidebar.topCompanies.data = null
      state.sidebar.topCompanies.fetchError = null
      state.sidebar.topCompanies.state = FetchingState.Fetching
      return { ...state }
    }

    case SIDEBAR_TOP_COMPANIES + 'FETCH_FULFILLED': {
      state.sidebar.topCompanies.data = payload
      state.sidebar.topCompanies.fetchError = null
      state.sidebar.topCompanies.state = FetchingState.Fetched
      return { ...state }
    }

    case SIDEBAR_TOP_COMPANIES + 'FETCH_REJECTED': {
      state.sidebar.topCompanies.data = null
      state.sidebar.topCompanies.fetchError = payload
      state.sidebar.topCompanies.state = FetchingState.Error
      return { ...state }
    }

    default:
      return state
  }
}
