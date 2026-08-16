import * as api from 'src/api'
import { Mode } from 'src/config/constants'
import { shouldUpdate } from 'src/utils/cache'
import { RootState } from '..'
import {
  HOME_PREFIX,
  SIDEBAR_MOST_READING,
  SET_HOME_POST_ITEM_SIZE,
} from '../reducers/home/types'

interface GetPostsParams {
  mode: Mode
  page: number
  forceUpdate?: boolean
}

export const getPosts = ({ mode, page, forceUpdate = false }: GetPostsParams) =>
  // TODO: fix types
  //@ts-expect-error temporary fix
    async (dispatch, getState: () => RootState) => {
      const type = HOME_PREFIX + 'FETCH'
      // Get data from root store to find out if we're going to fetch a data or not
      const storeState = getState()
      const storeData = storeState.home.data[mode].pages[page]

      if (!shouldUpdate(storeData) && !forceUpdate) {
        return Promise.resolve()
      }

      dispatch({ type, payload: { mode } })

      try {
        const data = await api.getPosts({ mode, page })
        const pagesCount = data?.pagesCount

        dispatch({
          type: type + '_FULFILLED',
          payload: { data: data, mode, page, pagesCount },
        })
      } catch (error) {
        dispatch({
          type: type + '_REJECTED',
          payload: { error: (error as Error)?.message, mode, page },
        })
      }
    }

export const getMostReading =
  // TODO: fix types
  //@ts-expect-error temporary fix
  () => async (dispatch) => {
    const type = SIDEBAR_MOST_READING + 'FETCH'

    dispatch({ type })

    try {
      const data = await api.getMostReadingArticles()

      dispatch({
        type: type + '_FULFILLED',
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: type + '_REJECTED',
        payload: { error: (error as Error)?.message },
      })
    }
  }

export const setPostItemSize =
  (id: number | string, size: number) =>
  // TODO: fix types
  //@ts-expect-error temporary fix
    (dispatch, getState: () => RootState) => {
      const sizesMap = getState().home.sizesMap

      // TODO: fix types
      //@ts-expect-error temporary fix
      if (!sizesMap[id]) {
        dispatch({ type: SET_HOME_POST_ITEM_SIZE, payload: { id, size } })
      }
    }
