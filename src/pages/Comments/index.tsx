import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import {
  CircularProgress,
  Fade,
  rgbToHex,
  Typography,
  useTheme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { useDispatch } from 'react-redux'
import {
  getPost,
  getPostComments,
} from 'src/store/actions/post'
import { useSelector } from 'src/hooks'
import { FetchingState } from 'src/interfaces'
import Comment from './Comment'
import {
  APP_BAR_HEIGHT,
  BOTTOM_BAR_HEIGHT,
  chromeAddressBarHeight,
} from 'src/config/constants'
import isMobile from 'is-mobile'
import blend from 'src/utils/blendColors'
import MainBlock from 'src/components/blocks/MainBlock'
import PostSidebar from '../Post/Sidebar'

const useStyles = makeStyles((theme) => ({
  errorText: {
    color: theme.palette.error.main,
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: theme.spacing(1.5),
  },
  header: {
    margin: theme.spacing(1.5, 2),
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 24,
    flexGrow: 1,
  },
  commentsNumber: {
    color: theme.palette.primary.main,
    marginLeft: 4,
  },
  filterButtonWrapper: {
    position: 'relative',
    width: 36,
    height: 36,
  },
  filterButton: {
    position: 'absolute',
    left: -6,
    top: -6,
  },
  spinnerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: `calc(100vh - ${
      APP_BAR_HEIGHT * 3
    }px - ${BOTTOM_BAR_HEIGHT}px - ${
      isMobile() ? chromeAddressBarHeight : 0
    }px - env(safe-area-inset-bottom, 0px))`,
  },
  highlightComment: {
    animation: `$highlightComment 750ms ${theme.transitions.easing.easeOut}`,
  },
  '@keyframes highlightComment': {
    from: {
      backgroundColor: blend(
        rgbToHex(theme.palette.primary.light),
        rgbToHex(theme.palette.background.paper),
        0.7
      ),
    },
  },
}))

const MAX_LEVEL = 10

const CommentsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const post = useSelector((store) => store.post.post.data)
  const postFetchingState = useSelector((store) => store.post.post.state)
  const postFetchingError = useSelector((store) => store.post.post.fetchError)
  const comments = useSelector((store) => store.post.comments.comments)
  const commentsFetchingState = useSelector(
    (store) => store.post.comments.state
  )
  const commentsFetchingError = useSelector(
    (store) => store.post.comments.fetchError
  )
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles()
  const history = useHistory()
  const selectedCommentID = history.location.hash || null
  const [commentsLength, setCommentsLength] = useState<number>()
  const shouldShowComments = commentsFetchingState === FetchingState.Fetched
  const filteredComments = useMemo(() => {
    if (!comments) return []
    return comments.map((e) => ({
      ...e,
      level: Math.min(e.level, MAX_LEVEL),
    }))
  }, [comments])

  useEffect(() => {
    if (!post || post?.id !== id) dispatch(getPost(id))
    if (!comments) {
      dispatch(getPostComments(id))
      setCommentsLength(0)
    }
    if (comments) {
      setCommentsLength(comments.length)
    }
    // TODO: fix deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, comments])

  useEffect(() => {
    if (
      selectedCommentID &&
      selectedCommentID.startsWith('#comment_') &&
      shouldShowComments
    ) {
      const commentID = selectedCommentID.slice('#'.length)
      const commentElement = document.getElementById(commentID)
      if (commentElement) {
        commentElement.scrollIntoView(true)
        window.scrollBy(0, -APP_BAR_HEIGHT)
      }
    }
  }, [selectedCommentID, shouldShowComments])

  if (postFetchingState === FetchingState.Error)
    return (
      <Typography className={classes.errorText}>{postFetchingError}</Typography>
    )
  if (commentsFetchingState === FetchingState.Error)
    return (
      <Typography className={classes.errorText}>
        {commentsFetchingError}
      </Typography>
    )

  return (
    <OutsidePage
      hidePositionBar
      disableShrinking
      headerText={post?.titleHtml}
      backgroundColor={theme.palette.background.paper}
    >
      <MainBlock>
        <div className={classes.root}>
          <div className={classes.header}>
            <Typography className={classes.headerText}>
              Комментарии&nbsp;
              {commentsLength && (
                <Fade in={commentsLength !== 0}>
                  <span className={classes.commentsNumber}>
                    {commentsLength}
                  </span>
                </Fade>
              )}
            </Typography>
          </div>
          {shouldShowComments &&
            filteredComments.map((e, i) => (
              <Comment
                postId={id}
                isLastInFilteredRootThread={
                  filteredComments[Math.min(i + 1, filteredComments.length - 1)]
                    .level === 0
                }
                data={e}
                key={e.id}
              />
            ))}
          {!shouldShowComments && (
            <div className={classes.spinnerWrapper}>
              <CircularProgress />
            </div>
          )}
        </div>
      </MainBlock>
      <PostSidebar />
    </OutsidePage>
  )
}

export default React.memo(CommentsPage)
