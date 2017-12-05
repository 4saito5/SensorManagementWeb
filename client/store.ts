import {createStore, combineReducers, Action, applyMiddleware} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';
import {routerReducer, routerMiddleware} from 'react-router-redux'
// モジュールを追加していく場所
import signin, {SignInState} from './modules/SignIn'
import signup, {SignUpState} from './modules/SignUp'
import home, {HomeActions, HomeState} from './modules/Home'


export type ReduxState = {
  signin : SignInState,
  signup : SignUpState,
  home : HomeState,
}

export type ReduxAction = Action

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  router: routerReducer,
  signin: signin,
  signup: signup,
  home: home,
})

const middleware = routerMiddleware(history)

// TODO@記述が間違っている？正しい書き方が解らない。
// export default createStore(
//     reducer,
//     applyMiddleware(middleware)
// )

// export const store = createStore(
//   reducer,
//   applyMiddleware(middleware)
// )

export const store = applyMiddleware(
  middleware,
)(createStore)(reducer);
