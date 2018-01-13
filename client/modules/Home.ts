import { Action } from 'redux'
import { constants } from '../constants'

// ActionCreator
export enum ActionNames {
  PORT_OPEN = 'home/setPort',
}

// setPort
export interface setPortAction extends Action {
  type: ActionNames.PORT_OPEN
  portNumber: number
  value: string
}
export const setPortAmount = (portNum, value): setPortAction => ({
  type: ActionNames.PORT_OPEN,
  portNumber: portNum,
  value: value
})
function setPort(HomeState, action) {
  // console.log('value=', action)
  // TODO:serial_noの取得
  const bodyText = {
    serial_no: 'test001',
    port_no: action.portNumber,
    value: action.value
  }  
  console.log('bodyText=', bodyText)

  let myHeaders:Headers = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-Type', 'application/json');

  fetch(constants.PATH + 'getport', {
    headers: myHeaders,
    method: 'POST',
    body: JSON.stringify(bodyText)
  }).then((response) => {
      console.log('Response OK.')
      return response.json()
    }).then((json)  => {
      console.log(json)
      // if (json.name) {
      // }
      // else
      //   alert('サーバーエラーが発生しました')
    }).catch(() => {
      console.log('Response Error.')
      alert('通信に失敗しました')
  })

  return HomeState;
}


// Reducer
export interface HomeState {
  portNum: number
  value: string
}

export type HomeActions = setPortAction

const initialState: HomeState = { portNum: 0, value: "off" }

export default function reducer(state: HomeState = initialState, action: HomeActions): HomeState {
  switch (action.type) {
    case ActionNames.PORT_OPEN:
      return setPort(state, action)
    default:
      return state
  }
}
