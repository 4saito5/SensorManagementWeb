import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {ReduxAction, ReduxState} from '../store'
// import {decrementAmount, incrementAmount} from '../modules/SignUp'
import SignUpForm from '../component/SignUp'

// dispatch処理
export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void) {}
}

// stateとactionの両方を渡す
export default connect(
  (state: ReduxState) => ({value: state.signup}),
 (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(SignUpForm)
