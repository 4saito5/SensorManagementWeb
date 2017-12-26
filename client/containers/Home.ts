import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ReduxAction, ReduxState } from '../store'
import { setPortAmount } from '../modules/Home'
import HomeForm from '../component/Home'

// dispatch処理
export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void) { }

  public setPort(portNum: number, value: string) {
    this.dispatch(setPortAmount(portNum, value))
  }

}

// stateとactionの両方を渡す
export default connect(
  (state: ReduxState) => ({ value: state.home }),
  (dispatch: Dispatch<ReduxAction>) => ({ actions: new ActionDispatcher(dispatch) })
)(HomeForm)
