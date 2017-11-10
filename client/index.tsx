import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {store} from './store'
//import * as store from './store'
import {Routing, browserHistory} from "./Routing"



// ReactとReduxのバインディング（結合）
// Providerの中にstoreを入れると、子コンポーネント（ここではCounter）にstoreとdispatch関数が渡される
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <Routing />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('app')
)
