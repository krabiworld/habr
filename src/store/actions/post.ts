import * as api from 'src/api'
import apiGetCompany from 'src/api/getCompany'
import { FetchingState, Comment as IComment } from 'src/interfaces'
import APIError from 'src/interfaces/APIError'
import { RootState } from '..'
import {
  COMMENTS_FETCH,
  COMMENTS_FETCH_FULFILLED,
  COMMENTS_FETCH_REJECTED,
  POST_FETCH,
  POST_FETCH_FULFILLED,
  POST_FETCH_REJECTED,
  COMPANY_FETCH,
  COMPANY_FETCH_FULFILLED,
  COMPANY_FETCH_REJECTED,
} from '../reducers/post/types'

const parseComments = (nodes: Map<number, IComment>) => {
  const root: IComment[] = []
  for (const id in nodes) {
    // TODO: fix types
    //@ts-expect-error temporary fix
    const comment = nodes[id]
    comment.children = []

    // TODO: fix types
    //@ts-expect-error temporary fix
    const parent = comment.parentId !== 0 ? nodes[comment.parentId] : null

    if (!parent) {
      root.push(comment)
    } else {
      parent.children.push(comment)
    }
  }

  return root
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flatten = (nodes: any[], a: any[] = []) => {
  nodes.forEach((e) => {
    a.push(e)
    flatten(e.children, a)
  })
  return a
}

const setLevelInfo = (nodes: IComment[]) => {
  const nodesLength = nodes.length
  nodes.forEach((_, i) => {
    const isLast = i === nodesLength - 1
    const nextNode = nodes[Math.min(i + 1, nodes.length - 1)]
    const prevNode = nodes[Math.max(i - 1, 0)]
    const currentNode = nodes[i]
    nodes[i].isLastInThread =
      (nextNode.level === 0 && !!nextNode.author) || isLast
    nodes[i].isNewLevel = prevNode.level < currentNode.level
  })
  return nodes
}

/**
 * Gets post data and dispatches it to the `post` store
 * @param id Post ID
 */
export const getPost =
  // TODO: fix types
  //@ts-expect-error temporary fix
  (id: number | string) => async (dispatch, getState: () => RootState) => {
    const storeData = getState().post.post
    if (
      storeData.state === FetchingState.Fetched &&
      storeData.data?.id.toString() === id.toString()
    ) {
      return Promise.resolve()
    }

    dispatch({ type: POST_FETCH })

    try {
      const data = await api.getPost(id)

      if (
        (data as APIError).data &&
        Object.keys((data as APIError).data).length === 0
      ) {
        throw data
      }
      dispatch({
        type: POST_FETCH_FULFILLED,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: POST_FETCH_REJECTED,
        payload: (error as APIError).message,
      })
    }
  }

/**
 * Gets post comments and dispatches the data to the `post` store
 * @param id Post ID
 */
export const getPostComments = (id: number | string) =>
  // TODO: fix types
  //@ts-expect-error temporary fix
    async (dispatch, getState: () => RootState) => {
      const state = getState()
      const storeData = state.post
      if (
        storeData.comments.state === FetchingState.Fetched &&
      storeData.post.data?.id.toString() === id.toString()
      ) {
        return Promise.resolve()
      }

      dispatch({ type: COMMENTS_FETCH })

      try {
        const data = await api.getComments(id)
        const parsedComments = parseComments(data.comments)
        const flattenComments = flatten(parsedComments)
        const commentsWithLevelInfo = setLevelInfo(flattenComments)

        dispatch({
          type: COMMENTS_FETCH_FULFILLED,
          payload: {
            comments: commentsWithLevelInfo,
            fetchedData: data,
          },
        })
      } catch (error) {
        dispatch({
          type: COMMENTS_FETCH_REJECTED,
          payload: (error as Error).message,
        })
      }
    }

/**
 * Gets post comments and dispatches the data to the `post` store
 * @param alias
 */
export const getCompany =
  // TODO: fix types
  //@ts-expect-error temporary fix
  (alias: string) => async (dispatch, getState: () => RootState) => {
    const storeState = getState()
    const storeData = storeState.post
    if (
      storeData.company.state === FetchingState.Fetched &&
      alias === storeData.company.data?.alias
    ) {
      return Promise.resolve()
    }

    dispatch({ type: COMPANY_FETCH })

    try {
      const data = await apiGetCompany(alias)
      dispatch({
        type: COMPANY_FETCH_FULFILLED,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: COMPANY_FETCH_REJECTED,
        payload: (error as Error).message,
      })
    }
  }
