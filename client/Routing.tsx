import * as React from 'react'
import {Switch} from 'react-router'
import {Route} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
//import {Values} from 'redux-form-website-template'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './assets/stylesheets/style.scss';
// コンテナを追加していく場所
import {SubmitSignIn} from './modules/SignIn'
import {SubmitSignUp} from './modules/SignUp'
import SignIn from './Containers/SignIn'
import Home from './Containers/Home'
import SignUp from './Containers/SignUp'

injectTapEventPlugin()

export const browserHistory = createHistory()

export class Routing extends React.Component<{}, {}> {
  render() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/signup'>
            <SignUp onSubmit={SubmitSignUp} />
          </Route>
          <Route path='/'>
            <SignIn onSubmit={SubmitSignIn} />
          </Route>
        </Switch>
      </MuiThemeProvider>
    )
  }
}
