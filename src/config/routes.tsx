/**
 * If you add a Settings subpage, add its alias to constants.tsx
 * in `makeNavigationTabs`, so SideNavigationDrawer will match a new page
 */

import React, { MemoExoticComponent } from 'react'
import Post from 'src/pages/Post'
import Settings from 'src/pages/Settings/index'
import SettingsAppearance from 'src/pages/Settings/Appearance'
import SettingsLanguage from 'src/pages/Settings/Language'
import Search from 'src/pages/Search'
import News from 'src/pages/News'
import NotFound from 'src/pages/NotFound'
import CommentsPage from 'src/pages/Comments'
import getCachedMode from 'src/utils/getCachedMode'
import User from 'src/pages/User/index'
import { Redirect } from 'react-router'
import { Theme } from '@material-ui/core'
import Home from 'src/pages/Home/index'
import UserArticles from 'src/pages/User/pages/Articles'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'

export interface Route {
  path: string | string[]
  component: MemoExoticComponent<() => React.ReactElement> | React.ReactElement
  title?: string
  shouldShowAppBar?: boolean
  appBarColor?: (theme: Theme) => string
  shouldAppBarChangeColors?: boolean
  alias: string
}

export const routes: Route[] = [
  {
    path: '/post/:id/comments',
    component: <CommentsPage />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'comments',
  },
  {
    path: '/company/:alias/blog/:id/comments',
    component: <CommentsPage />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'comments',
  },
  {
    path: '/company/:alias/blog/:id',
    component: <Post />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'post',
  },
  {
    path: '/post/:id',
    component: <Post />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'post',
  },
  {
    path: '/settings/language',
    component: <SettingsLanguage />,
    title: 'Настройки языка',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settingsLanguage',
  },
  {
    path: '/settings/appearance',
    component: <SettingsAppearance />,
    title: 'Внешний вид',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settingsAppearance',
  },
  {
    path: '/settings',
    component: <Settings />,
    title: 'Настройки',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settings',
  },
  {
    path: ['/search', '/search/p/:page'],
    component: <Search />,
    title: 'Поиск',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: true,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'search',
  },
  {
    path: '/user/:login/articles/p/:page',
    component: <UserArticles />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'userArticles',
  },
  {
    path: '/user/:login',
    component: <User />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'user',
  },
  {
    path: '/news/p/:page',
    component: <News />,
    title: 'Новости',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.paper,
    alias: 'news',
  },
  {
    path: [
      '/all/p/:page',
      '/top0/p/:page',
      '/top10/p/:page',
      '/top25/p/:page',
      '/top50/p/:page',
      '/top100/p/:page',
      '/top/daily/p/:page',
      '/top/weekly/p/:page',
      '/top/monthly/p/:page',
      '/top/yearly/p/:page',
      '/top/alltime/p/:page',
    ],
    component: <Home />,
    shouldShowAppBar: true,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.paper,
    alias: 'feed',
  },
  {
    path: '/',
    component: <Redirect to={`${getCachedMode().to}p/1`} />,
    shouldShowAppBar: true,
    shouldAppBarChangeColors: true,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'feed',
  },
  {
    path: '/:404*',
    component: <NotFound />,
    title: '404',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: '404',
  },
]
