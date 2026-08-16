import * as api from 'src/api'
import { shouldUpdate } from 'src/utils/cache'
import { RootState } from '..'
import { NEWS_PREFIX } from '../reducers/news/types'

export const getNews =
  (page: number, forceUpdate = false) =>
  // TODO: fix types
  //@ts-expect-error temporary fix
    async (dispatch, getState: () => RootState) => {
      const type = NEWS_PREFIX + 'FETCH'

      // Get data from root store to find out if we're going to fetch a data or not
      const storeState = getState()
      // TODO: fix types
      //@ts-expect-error temporary fix
      const storeData = storeState.news.data.pages[page]
      if (!shouldUpdate(storeData) && !forceUpdate) {
        return Promise.resolve()
      }

      dispatch({ type, payload: { page } })

      try {
        const data = await api.getNews({ page })
        const pagesCount = data?.pagesCount

        dispatch({
          type: type + '_FULFILLED',
          payload: { data, page, pagesCount },
        })
      } catch (error) {
        dispatch({
          type: type + '_REJECTED',
          payload: { error: (error as Error)?.message, page },
        })
      }
    }
