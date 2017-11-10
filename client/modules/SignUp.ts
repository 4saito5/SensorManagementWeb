import {Action} from 'redux'
import {SubmitSign} from './shared'


export async function SubmitSignUp(values) {
  SubmitSign(
    'http://localhost:5555/signup',
    values,
  )
}

// Reducer
export interface SignUpState {
  num: number
}

const initialState:SignUpState = {num: 0}

export default function reducer(state: SignUpState = initialState): SignUpState {
  return state
}
