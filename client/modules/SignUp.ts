import { Action } from 'redux'
import { SubmitSign } from './shared'
import { constants } from '../constants'


export async function SubmitSignUp(values) {
  SubmitSign(
    constants.PATH + 'signup',
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
