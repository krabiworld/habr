import * as React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PostSkeleton from 'src/components/skeletons/PostItem'
import PostItem from 'src/components/blocks/PostItem'
import Pagination from 'src/components/blocks/Pagination'
import ErrorComponent from 'src/components/blocks/Error'
import {
  DEFAULT_POST_ITEM_HEIGHT,
  Mode,
  RATING_MODES as modes,
} from 'src/config/constants'
import Switcher from './Switcher'
import { useDispatch } from 'react-redux'
import { getPosts, setPostItemSize } from 'src/store/actions/home'
import { useSelector } from 'src/hooks'
import getCachedMode from 'src/utils/getCachedMode'
import MainBlock from 'src/components/blocks/MainBlock'
import Sidebar from 'src/pages/Home/Sidebar'
import useLastMode from 'src/hooks/useLastMode'
import useQuery from 'src/hooks/useQuery'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
    marginTop: 1,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(1),
  },
  list: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
  },
}))

type HomePathParams = { page: string }

const isServerUpdateError = (message: string) => message === 'Network Error'

const Home = () => {
  const params = useParams<HomePathParams>()
  const query = useQuery()
  const lastSelectedMode = getCachedMode()
  const paramsMode = useLastMode()
  const [mode, setMode] = useState<Mode>(paramsMode || lastSelectedMode.mode)
  const currentPage = Number(params.page)
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()
  const dispatch = useDispatch()
  const postItemsSizesMap = useSelector((store) => store.home.sizesMap)
  const isFetched = useSelector((state) => state.home.fetched)
  const isFetching = useSelector((state) => state.home.fetching)
  const fetchError = useSelector((state) => state.home.error)
  const posts = useSelector((state) => state.home.data[mode].pages[currentPage])
  const pagesCount = useSelector((state) => state.home.data[mode].pagesCount)
  const fetchErrorMessage = React.useMemo(() => {
    // TODO: fix types
    //@ts-expect-error temporary fix
    if (isServerUpdateError(fetchError?.error?.message)) {
      return 'Идут технические работы'
    } else {
      // TODO: fix types
      //@ts-expect-error temporary fix
      return fetchError?.error?.message
    }
    // TODO: fix types
    //@ts-expect-error temporary fix
  }, [fetchError?.error?.message])
  const fetchErrorCode = React.useMemo(() => {
    // TODO: fix types
    //@ts-expect-error temporary fix
    if (isServerUpdateError(fetchError?.error?.message)) {
      return 503
    } else {
      // TODO: fix types
      //@ts-expect-error temporary fix
      return fetchError?.error?.code
    }
    // TODO: fix types
    //@ts-expect-error temporary fix
  }, [fetchError?.error?.code, fetchError?.error?.message])

  const PaginationComponent = () =>
    pagesCount ? (
      <Pagination
        disabled={!posts}
        handleChange={handlePagination}
        steps={pagesCount}
        currentStep={currentPage}
      />
    ) : null

  const setPostItemSizeWrapper = React.useCallback(
    (id: number | string, size: number) => {
      // TODO: fix types
      //@ts-expect-error temporary fix
      !postItemsSizesMap[id] && dispatch(setPostItemSize(id, size))
    },
    [dispatch, postItemsSizesMap]
  )
  const getPostItemSize = React.useCallback(
    (id?: number | string): number => {
      // TODO: fix types
      //@ts-expect-error temporary fix
      return postItemsSizesMap[id] || DEFAULT_POST_ITEM_HEIGHT
    },
    [postItemsSizesMap]
  )
  const postsComponents =
    (posts &&
      posts?.publicationIds?.map((id, i) => (
        <PostItem
          key={i}
          setPostItemSize={setPostItemSizeWrapper}
          getPostItemSize={getPostItemSize}
          post={posts.publicationRefs[id]}
        />
      ))) ||
    []

  const handlePagination = (
    _e: React.ChangeEvent<unknown>,
    i: string | number
  ) => {
    if (i === currentPage) return
    history.push(
      modes.find((e) => e.mode === mode)?.to + 'p/' + i + '?' + query.toString()
    )
  }

  const handleSwitcher = React.useCallback(
    // TODO: fix types
    //@ts-expect-error temporary fix
    ({ mode: newMode, to }) => {
      localStorage.setItem('mode', newMode)
      setMode(newMode)
      history.push(to + 'p/1?' + query.toString())
    },
    // TODO: fix deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, location.pathname, location.search]
  )

  useEffect(() => {
    if (paramsMode !== mode) setMode(paramsMode)
    dispatch(getPosts({ mode, page: currentPage }))
    // TODO: fix deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsMode, mode, currentPage, location.pathname, location.search])

  return (
    <div className={classes.root}>
      <Switcher
        setMode={setMode}
        mode={mode}
        handleClick={handleSwitcher}
      />

      <div className={classes.flexContainer}>
        <MainBlock>
          <List className={classes.list}>
            {isFetching &&
              [...new Array(4)].map((_, i) => <PostSkeleton key={i} />)}
            {isFetched && !fetchError && posts && postsComponents}
            {fetchError && (
              <ErrorComponent
                code={fetchErrorCode}
                message={fetchErrorMessage}
              />
            )}
            <PaginationComponent />
          </List>
        </MainBlock>
        <Sidebar />
      </div>
    </div>
  )
}

export default React.memo(Home)
