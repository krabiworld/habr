import * as api from 'src/api'
import { FlowAlias } from 'src/interfaces'
import { shouldUpdate } from 'src/utils/cache'
import { RootState } from '..'
import { NEWS_PREFIX } from '../reducers/news/types'

export const getNews =
  (page: number, flow: FlowAlias = 'all', forceUpdate = false) =>
  // TODO: fix types
  //@ts-expect-error temporary fix
    async (dispatch, getState: () => RootState) => {
      const type = NEWS_PREFIX + 'FETCH'

      // Get data from root store to find out if we're going to fetch a data or not
      const storeState = getState()
      const storeData =
      flow === 'all'
        ? // TODO: fix types
      //@ts-expect-error temporary fix
        storeState.news.data.pages[page]
        : storeState.news.flows[flow].pages[page]
      if (!shouldUpdate(storeData) && !forceUpdate) {
        return Promise.resolve()
      }

      dispatch({ type, payload: { page, flow } })

      try {
        const data = await api.getNews({ page, flow })
        const pagesCount = data?.pagesCount

        dispatch({
          type: type + '_FULFILLED',
          payload: { data, page, pagesCount, flow },
        })
      } catch (error) {
        dispatch({
          type: type + '_REJECTED',
          payload: { error: (error as Error)?.message, page, flow },
        })
      }
    }
