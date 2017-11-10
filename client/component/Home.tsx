import * as React from 'react'
import {Link} from 'react-router-dom';

export default class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        welcome home
        <li><Link to='/'>ログアウト</Link></li>
      </div>
    )
  }
}
