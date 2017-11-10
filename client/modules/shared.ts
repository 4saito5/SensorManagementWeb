// 共用できるものは、ここに置く
import {browserHistory} from "../Routing"

// SignIn,SignUp共用
export function SubmitSign(url, values) {
  // console.log(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
  sessionStorage.clear()
  
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    // credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(values)
  }).then((response) => {
      console.log('Response OK.')
      return response.json()
    }).then((json)  => {
      console.log(json)
      if (json.name) {
        sessionStorage.UserName = json.name
        sessionStorage.UserEmail = json.email
        if (localStorage.rememberBrowser) {
          localStorage.UserEmail = json.email
          // localStorage.UserPassword = json.password
        }
        browserHistory.push('/home')
      }
      else
        alert('メールアドレスまたはパスワードが違います。')
    }).catch(() => {
      console.log('Response Error.')
      alert('通信に失敗しました')
  })
}
