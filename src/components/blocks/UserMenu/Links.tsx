import { List, ListItem, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Icon28CommentOutline,
  Icon20BookmarkOutline,
  Icon28ArticleOutline,
} from '@vkontakte/icons'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    '-webkit-tap-highlight-color': 'transparent !important',
    padding: theme.spacing(1.25, 2),
  },
  icon: {
    marginRight: theme.spacing(1.5),
    color: theme.palette.primary.light,
  },
}))

const Links = () => {
  const classes = useStyles()
  const user = useSelector((store) => store.auth.me.data)
  const alias = user?.alias

  return (
    <List className={classes.root}>
      <ListItem button component={Link} to={'/user/' + alias + '/articles/p/1'} className={classes.root}>
        <Icon28ArticleOutline width={28} height={28} className={classes.icon} />
        <Typography>Статьи</Typography>
      </ListItem>
      <ListItem button component="a" href={`https://habr.com/users/${alias}/comments/`} target="_blank" className={classes.root}>
        <Icon28CommentOutline width={28} height={28} className={classes.icon} />
        <Typography>Комментарии</Typography>
      </ListItem>
      <ListItem button component="a" href={`https://habr.com/en/users/${alias}/bookmarks/articles/`} target="_blank" className={classes.root}>
        <Icon20BookmarkOutline width={28} height={28} className={classes.icon} />
        <Typography>Закладки</Typography>
      </ListItem>
    </List>
  )
}

export default React.memo(Links)
