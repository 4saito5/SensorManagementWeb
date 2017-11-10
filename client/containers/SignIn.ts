import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {ReduxAction, ReduxState} from '../store'
// import {decrementAmount, incrementAmount} from '../modules/SignIn'
import SignInForm from '../component/SignIn'

// dispatch処理
export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void) {}
}

// stateとactionの両方を渡す
export default connect(
  (state: ReduxState) => ({value: state.signin}),
 (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(SignInForm)
