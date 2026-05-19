import { UserSettings } from 'src/interfaces'
import { SET_SETTINGS } from '../reducers/settings/types'

// TODO: fix types
//@ts-expect-error temporary fix
export const setSettings = (payload: Partial<UserSettings>) => (dispatch) =>
  dispatch({
    type: SET_SETTINGS,
    payload,
  })
