import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {ReduxAction, ReduxState} from '../store'
import {decrementAmount, incrementAmount} from '../modules/Home'
import HomeForm from '../component/Home'

// dispatch処理
export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void) {}

  public increment(amount: number) {
    this.dispatch(incrementAmount(amount))
  }

  public decrement(amount: number) {
    this.dispatch(decrementAmount(amount))
  }
}

// stateとactionの両方を渡す
export default connect(
  (state: ReduxState) => ({value: state.home}),
 (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(HomeForm)
