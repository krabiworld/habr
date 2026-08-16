import { PaletteType } from 'src/config/constants'

export interface CustomTheme {
  name: string
  type: string
  palette: {
    type: 'dark' | 'light'
    primary: {
      main: string
      light: string
      dark: string
    }
    background: {
      paper: string
      default: string
    }
    text: {
      primary: string
      secondary: string
      disabled: string
      hint: string
    }
  }
}

export default interface UserSettings {
  themeType: PaletteType | string
  autoChangeTheme: boolean
  preferredLightTheme: PaletteType | string
  preferredDarkTheme: PaletteType | string
  language: {
    feed: 'ru' | 'en' | 'ru,en'
  }
}
