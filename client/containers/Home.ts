import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ReduxAction, ReduxState } from '../store'
import { portOpenAmount, portCloseAmount } from '../modules/Home'
import HomeForm from '../component/Home'

// dispatch処理
export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void) { }

  public portOpen(amount: number) {
    this.dispatch(portOpenAmount(amount))
  }

  public portClose(amount: number) {
    this.dispatch(portCloseAmount(amount))
  }
}

// stateとactionの両方を渡す
export default connect(
  (state: ReduxState) => ({ value: state.home }),
  (dispatch: Dispatch<ReduxAction>) => ({ actions: new ActionDispatcher(dispatch) })
)(HomeForm)
