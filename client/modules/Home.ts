import {Action} from 'redux'
// 中身は全部不要。ディレクトリ構成のために作っただけ。


// ActionCreator
export enum ActionNames {
  INC = 'counter/increment',
  DEC = 'counter/decrement',
}

export interface IncrementAction extends Action {
  type: ActionNames.INC
  plusAmount: number
}
export const incrementAmount = (amount: number): IncrementAction => ({
  type: ActionNames.INC,
  plusAmount: amount
})

export interface DecrementAction extends Action {
  type: ActionNames.DEC
  minusAmount: number
}

export const decrementAmount = (amount: number): DecrementAction => ({
  type: ActionNames.DEC,
  minusAmount: amount
})


// Reducer
export interface HomeState {
  num: number
}

export type HomeActions = IncrementAction | DecrementAction

const initialState:HomeState = {num: 0}

export default function reducer(state: HomeState = initialState, action: HomeActions): HomeState {
  switch (action.type) {
    case ActionNames.INC:
      return {num: state.num + action.plusAmount}
    case ActionNames.DEC:
      return {num: state.num - action.minusAmount}
    default:
      return state
  }
}
