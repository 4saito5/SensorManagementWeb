import * as React from 'react'
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import Validation from '../modules/Validation'
import {
  renderTextField,
  renderCheckbox,
  // renderRadioGroup,
  // renderSelectField,
} from '../modules/MaterialUI'


// 注意：関数名をvalidateにしないとイベントが発火しない
const validate = values => {
  const requiredFields = ['email', 'password']

  let errors: { [key: string]: string; } = {};
  errors.email = Validation.email(values.email)
  errors = Validation.requiredField(requiredFields, values)

  return errors
}


const SignInForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <h2>センサー管理</h2>
      <div>
        様々なセンサーをインターネットに繋いで、データを見える化します。
      </div>

      <div>
        <Field name="email" component={renderTextField} label="メールアドレス" />
      </div>
      <div>
        <Field name="password" component={renderTextField} label="パスワード" type="password" />
      </div>
      <div>
        <Field name="rememberBrowser" component={renderCheckbox} label="ログイン状態を保存する" />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>ログイン</button>
      </div>

      <div>
        <Link to='/signup'>アカウントを作成</Link>
      </div>

    </form>
  )
}

export default reduxForm({
  form: 'signin', // a unique identifier for this form
  validate
  // asyncValidate
})(SignInForm)
