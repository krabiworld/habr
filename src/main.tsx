import { createRoot } from 'react-dom/client'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
import swConfig from './serviceWorkerConfig'
import dayjs from 'dayjs'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'
import calendarPlugin from 'dayjs/plugin/calendar'
import updateLocalePlugin from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/ru'
import { BrowserRouter as Router } from 'react-router-dom'
import 'react-photoswipe/dist/photoswipe.css'

dayjs.locale('ru')
dayjs.extend(relativeTimePlugin)
dayjs.extend(calendarPlugin)
dayjs.extend(updateLocalePlugin)

dayjs.updateLocale('ru', {
  calendar: {
    lastWeek: 'D MMMM, в hh:mm',
    sameDay: 'Сегодня, в hh:mm',
    lastDay: 'Вчера, в hh:mm',
    sameElse: 'DD.MM.YYYY',
  },
})
dayjs.updateLocale('en', {
  calendar: {
    lastWeek: 'D MMMM, at hh:mm',
    sameDay: 'Today, at hh:mm',
    lastDay: 'Yesterday, at hh:mm',
    sameElse: 'DD.MM.YYYY',
  },
})

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
serviceWorker.register(swConfig)
