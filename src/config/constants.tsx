import { ModeObject, UserSettings } from '../interfaces'
import {
  lighten,
  darken,
  alpha,
  PaletteType as MUIPaletteType,
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import {
  Icon28Newsfeed,
  Icon28SettingsOutline,
  Icon20HomeOutline,
} from '@vkontakte/icons'
import TabObject from 'src/interfaces/NavigationTabObject'
import getCachedMode from 'src/utils/getCachedMode'

export const API_URL = 'https://habr.com/kek/'

export const MIN_WIDTH = 960
export const MIDDLE_WIDTH = 1175
export const MAX_WIDTH = 1280

/**
 * Negative threshold for VisibilitySensor in PostItem component
 */
export const POST_ITEM_VISIBILITY_THRESHOLD = -1 * 500

export const POST_IMAGE_HEIGHT = 212
export const DEFAULT_POST_ITEM_HEIGHT = 390
export const BOTTOM_BAR_HEIGHT = 52
export const APP_BAR_HEIGHT = 48
export const DRAWER_WIDTH = 280

/** Local Storage keys */
export const USER_SETTINGS_KEY = 'habr_USER_SETTINGS'
export const NEEDS_UPDATE_KEY = 'habr_NEEDS_UPDATE'

export const RATING_MODES: ModeObject[] = [
  {
    text: 'Все подряд',
    to: '/all/',
    mode: 'all',
    isNewMode: true,
    switcherText: 'Все',
  },
  {
    text: 'Новые с рейтингом +0',
    to: '/top0/',
    mode: 'top0',
    isNewMode: true,
    switcherText: '+0',
  },
  {
    text: 'Новые с рейтингом +10',
    to: '/top10/',
    mode: 'top10',
    isNewMode: true,
    switcherText: '+10',
  },
  {
    text: 'Новые с рейтингом +25',
    to: '/top25/',
    mode: 'top25',
    isNewMode: true,
    switcherText: '+25',
  },
  {
    text: 'Новые с рейтингом +50',
    to: '/top50/',
    mode: 'top50',
    isNewMode: true,
    switcherText: '+50',
  },
  {
    text: 'Новые с рейтингом +100',
    to: '/top100/',
    mode: 'top100',
    isNewMode: true,
    switcherText: '+100',
  },
  {
    text: 'Лучшее за день',
    to: '/top/daily/',
    mode: 'daily',
    switcherText: 'Сутки',
  },
  {
    text: 'Лучшее за неделю',
    to: '/top/weekly/',
    mode: 'weekly',
    switcherText: 'Неделя',
  },
  {
    text: 'Лучшее за месяц',
    to: '/top/monthly/',
    mode: 'monthly',
    switcherText: 'Месяц',
  },
  {
    text: 'Лучшее за год',
    to: '/top/yearly/',
    mode: 'yearly',
    switcherText: 'Год',
  },
  {
    text: 'Лучшее за всё время',
    to: '/top/alltime/',
    mode: 'alltime',
    switcherText: 'Всё время',
  },
]

export const POST_LABELS: Record<string, { text: string }> = {
  tutorial: { text: 'Туториал' },
  translation: { text: 'Перевод' },
  sandbox: { text: 'Из песочницы' },
  recovery: { text: 'Recovery' },
  technotext2020: { text: 'Технотекст 2020' },
  technotext2021: { text: 'Технотекст 2021' },
  technotext2022: { text: 'Технотекст 2022' },
}

export const HABR_BASE_REGEXP = /(habr|m\.habr)\.com\/(ru|en)\/(.+)/
export const HABR_LINKS_REPLACE_MAP = [
  {
    regexp: /companies\/?(.+)\/articles\/([0-9]+)[/]?/,
    to: '/company/[0]/blog/[1]',
  },
  {
    regexp: /articles\/?(.+)[/]?/,
    to: '/post/[0]',
  },
  {
    regexp: /news\/t\/?(.+)[/]?/,
    to: '/post/[0]',
  },
]

export const makeNavigationTabs = (w = 24, h = 24): TabObject[] => {
  return [
    {
      label: 'Статьи',
      icon: <Icon20HomeOutline width={w} height={h} />,
      to: () => `${getCachedMode().to}p/1`,
      match: 'feed',
      tab: 'home',
    },
    {
      label: 'Новости',
      icon: <Icon28Newsfeed width={w} height={h} />,
      to: () => '/news/p/1',
      tab: 'news',
      match: 'news',
    },
    {
      label: 'Настройки',
      icon: <Icon28SettingsOutline width={w} height={h} />,
      to: () => '/settings',
      tab: 'settings',
      match: [
        'settings',
        'settingsAppearance',
        'settingsLanguage',
      ],
    },
  ]
}

export const HOUR = 1000 * 60 * 60
export const DEFAULT_UPDATE_INTERVAL = HOUR / 4
export const chromeAddressBarHeight = 56

export const DEFAULT_USER_SETTINGS: UserSettings = {
  themeType: 'light',
  preferredDarkTheme: 'dark',
  preferredLightTheme: 'light',
  autoChangeTheme: false,
  language: {
    feed: 'ru',
  },
}

export const LANGUAGES_FEED = [
  {
    type: 'ru',
    name: 'Русский',
  },
  {
    type: 'en',
    name: 'English',
  },
  {
    type: 'ru,en',
    name: 'Русский и English',
  },
]

export const THEMES: PaletteType[] = [
  'light',
  'dark',
  'oled',
  'dimmed',
]

/** Colors for app background */
export const BACKGROUND_COLORS_DEFAULT = {
  light: '#f5f5f5',
  dark: '#0e0e0e',
  oled: '#000000',
  dimmed: '#1c2128',
}

/** Colors for app foreground elements, such as Paper */
export const BACKGROUND_COLORS_PAPER = {
  light: '#ffffff',
  dark: '#181818',
  oled: '#0e0e0e',
  dimmed: '#252c35',
}

export const THEME_PRIMARY_COLORS = {
  light: {
    main: green[400],
    light: green[200],
    dark: green[700],
  },
  dark: {
    main: green[100],
    light: lighten(green[100], 0.05),
    dark: darken(green[100], 0.1),
  },
  oled: {
    main: green[100],
    light: lighten(green[100], 0.05),
    dark: darken(green[100], 0.1),
  },
  dimmed: {
    main: green[100],
    light: lighten(green[100], 0.05),
    dark: darken(green[100], 0.1),
  },
}

export const THEME_TEXT_COLORS = {
  light: {
    primary: 'rgb(0, 0, 0, 0.87)',
    secondary: 'rgb(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },
  dark: {
    primary: '#e9e9e9',
    secondary: alpha('#e9e9e9', 0.54),
    disabled: alpha('#e9e9e9', 0.38),
    hint: alpha('#e9e9e9', 0.38),
  },
  oled: {
    primary: '#e9e9e9',
    secondary: alpha('#e9e9e9', 0.54),
    disabled: alpha('#e9e9e9', 0.38),
    hint: alpha('#e9e9e9', 0.38),
  },
  dimmed: {
    primary: '#cdd9e5',
    secondary: alpha('#cdd9e5', 0.54),
    disabled: alpha('#cdd9e5', 0.38),
    hint: alpha('#cdd9e5', 0.38),
  },
}

export const THEME_NAMES: Record<PaletteType, string> = {
  light: 'Светлая',
  dark: 'Тёмная',
  oled: 'OLED',
  dimmed: 'Ночная тема',
}

export type PaletteType =
  | 'light'
  | 'dark'
  | 'oled'
  | 'dimmed'

export const THEME_TYPES: Record<PaletteType, MUIPaletteType> = {
  light: 'light',
  dark: 'dark',
  oled: 'dark',
  dimmed: 'dark',
}

export type Mode =
  | 'all'
  | 'top0'
  | 'top10'
  | 'top25'
  | 'top50'
  | 'top100'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'alltime'
