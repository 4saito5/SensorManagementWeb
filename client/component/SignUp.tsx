import * as React from 'react'
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form'
import {browserHistory} from "../Routing"
import Validation from '../modules/Validation'
import {
  renderTextField,
  renderCheckbox,
  // renderRadioGroup,
  // renderSelectField,
} from '../modules/MaterialUI'


const validate = values => {
  const requiredFields = ['name', 'email', 'password', 'repassword']

  let errors = {}
  errors.email = Validation.email(values.email)
  errors.repassword =　Validation.repasswordMatch(values.password, values.repassword)
  errors = Validation.requiredField(requiredFields, values)

  return errors
}


const SignUpForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <h3>アカウント作成</h3>
      <div>
        <Field name="name" component={renderTextField} label="名前"/>
      </div>
      <div>
        <Field name="email" component={renderTextField} label="メールアドレス"/>
      </div>
      <div>
        <Field name="password" component={renderTextField} label="パスワード" type="password"/>
      </div>
      <div>
        <Field name="repassword" component={renderTextField} label="パスワード再入力" type="password"/>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>新規登録</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>全入力クリア</button>
      </div>

      <div>
        <Link to='/'>ログイン</Link>
      </div>

    </form>
  )
}

export default reduxForm({
  form: 'signup' // a unique identifier for this form
  validate,
  // asyncValidate
})(SignUpForm)
