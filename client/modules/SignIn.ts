import { Action } from 'redux'
import { SubmitSign } from './shared'
import { constants } from '../constants'

export async function SubmitSignIn(values) {
  // localStorage.clear()
  localStorage.rememberBrowser = values.rememberBrowser

  SubmitSign(
    constants.PATH + 'signin',
    values,
  )
}

// Reducer
export interface SignInState {
  num: number,
  email: string,
}

const initialState:SignInState = {
  num: 0,
  email: '',
}

export default function reducer(state: SignInState = initialState): SignInState {
  return state
}
