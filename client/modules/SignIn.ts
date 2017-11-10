import {Action} from 'redux'
import {SubmitSign} from './shared'


export async function SubmitSignIn(values) {
  // localStorage.clear()
  localStorage.rememberBrowser = values.rememberBrowser

  SubmitSign(
    'http://localhost:5555/signin',
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
