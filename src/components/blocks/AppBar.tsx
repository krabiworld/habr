import * as React from 'react'
import { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { useHistory, useLocation } from 'react-router-dom'
import {
  APP_BAR_HEIGHT,
  MAX_WIDTH,
  MIDDLE_WIDTH,
  RATING_MODES,
} from 'src/config/constants'
import { Icon28SettingsOutline } from '@vkontakte/icons'
import WifiOffRoundedIcon from '@material-ui/icons/WifiOffRounded'
import { useRoute, useSelector } from 'src/hooks'
import {
  alpha,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import useAppBarScrollTrigger from 'src/hooks/useAppBarScrollTrigger'

interface StyleProps {
  isTransformed: boolean
  appBarColor?: (theme: Theme) => string
  shouldChangeColors?: boolean
}

type MakeAppBarBackgroundColorProps = StyleProps & {
  theme: Theme
}

const makeAppBarBackgroundColor = ({
  isTransformed,
  appBarColor,
  shouldChangeColors,
  theme,
}: MakeAppBarBackgroundColorProps) => {
  if (shouldChangeColors)
    return theme.palette.background[isTransformed ? 'paper' : 'default']
  else return appBarColor ? appBarColor(theme) : theme.palette.background.paper
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props: StyleProps) =>
      makeAppBarBackgroundColor({ ...props, theme }),
    [theme.breakpoints.up(MIDDLE_WIDTH)]: {
      display: 'none',
    },
    color: theme.palette.text.primary,
    position: 'fixed',
    height: APP_BAR_HEIGHT + 1,
    flexGrow: 1,
    zIndex: theme.zIndex.appBar + 1,
    willChange: 'transform',
  },
  toolbar: {
    margin: 'auto',
    minHeight: 'unset',
    height: APP_BAR_HEIGHT,
    padding: 0,
    maxWidth: MAX_WIDTH,
    width: '100%',
    flexDirection: 'column',
  },
  headerTitle: {
    position: 'relative',
    color: theme.palette.text.primary,
    fontWeight: 800,
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'Google Sans',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': alpha(theme.palette.background.paper, 0.3),
    userSelect: 'none',
  },
  headerTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  offline: {
    color: theme.palette.text.disabled,
    marginLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    width: `calc(100% - ${theme.spacing(2) * 2}px)`,
  },
  halloween_batIcon: {
    position: 'absolute',
    right: -11,
    top: 4,
    transform: 'rotate(30deg)',
    width: 24,
    height: 11.85,
    fill: '#eb4b2b !important',
  },
}))

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

const AppBarComponent = () => {
  const trigger = useAppBarScrollTrigger()
  const history = useHistory()
  const location = useLocation()
  const route = useRoute()
  const shouldChangeColors = route?.shouldAppBarChangeColors
  const appBarColor = route?.appBarColor
  const isHidden = !route?.shouldShowAppBar
  const theme = useTheme()
  const classes = useStyles({
    isTransformed: trigger,
    appBarColor,
    shouldChangeColors,
  })
  const modeName = useSelector((state) => state.home.mode)
  const mode = RATING_MODES.find((e) => e.mode === modeName)
  const isOnline = useOnlineStatus();

  const goHome = () => {
    window.scrollTo(0, 0)
    if (location.pathname !== `${mode?.to}/p/1`) {
      history.push(mode ? `${mode.to}p/1` : '/')
    }
  }
  const goSettings = () =>
    history.push('/settings', {
      from: location.pathname + location.search,
      scroll: window.pageYOffset,
    })

  // Do not render the AppBar if it is hidden by the route
  if (isHidden) return null

  return (
    <>
      <AppBar className={classes.root} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.content}>
            <div className={classes.headerTitleWrapper}>
              <Typography
                onClick={goHome}
                variant="h6"
                className={classes.headerTitle}
              >
                habr
              </Typography>
              {!isOnline && (
                <WifiOffRoundedIcon className={classes.offline} />
              )}
            </div>
            <IconButton onClick={goSettings}>
              <Icon28SettingsOutline width={24} height={24} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default React.memo(AppBarComponent)
