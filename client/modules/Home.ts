import { Action } from 'redux'

// ActionCreator
export enum ActionNames {
  PORT_OPEN = 'home/portOpen',
  PORT_CLOSE = 'home/portClose',
}

// PortOpen
export interface PortOpenAction extends Action {
  type: ActionNames.PORT_OPEN
  portNumberAmount: number
}
export const portOpenAmount = (amount: number): PortOpenAction => ({
  type: ActionNames.PORT_OPEN,
  portNumberAmount: amount
})
function updateItemInArray(array, itemId, updateItemCallback) {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item;
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
}
function updateObject(oldObject, newValues) { }
function test(HomeState, action) {
  console.log('value=', action)
  const newTodos = updateItemInArray(HomeState, action.id, todo => {
    return updateObject(todo, { text: action.text });
  });

  return newTodos;
}


// PortClose
export interface PortCloseAction extends Action {
  type: ActionNames.PORT_CLOSE
  portNumberAmount: number
}
export const portCloseAmount = (amount: number): PortCloseAction => ({
  type: ActionNames.PORT_CLOSE,
  portNumberAmount: amount
})


// Reducer
export interface HomeState {
  num: number
}

export type HomeActions = PortOpenAction | PortCloseAction

const initialState: HomeState = { num: 0 }

export default function reducer(state: HomeState = initialState, action: HomeActions): HomeState {
  switch (action.type) {
    case ActionNames.PORT_OPEN:
      return test(state, action)
    case ActionNames.PORT_CLOSE:
      return test(state, action)
    default:
      return state
  }
}
