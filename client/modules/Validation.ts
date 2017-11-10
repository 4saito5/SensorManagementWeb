import * as React from 'react'

export default class Validation {

  // static requiredField(requiredFields: string[], values: object) {
  static requiredField(requiredFields: string[], values: any) {
    const errors = {}
    requiredFields.forEach(field => {
      if (!values[ field ]) {
        errors[ field ] = ErrorMessages.required
      }
    })
    return errors
  }

  static repasswordMatch(password: string, repassword: string) {
    if (password != repassword)
      return ErrorMessages.repasswordUnmatch
  }

  static required = value =>
    value ? undefined : ErrorMessages.required

  static zero = text => value => value !== '' ? undefined : `${text}しない場合は0を入力してください。`

  static email = value =>
    value && !Regex.email.test(value) ? ErrorMessages.email : undefined

  static password = value =>
    value && !Regex.password.test(value) ? ErrorMessages.password : undefined

  static url = value =>
    value && !Regex.url.test(value) ? ErrorMessages.url : undefined

  static zip = value =>
    value && !Regex.zip.test(value) ? ErrorMessages.zip : undefined

  static tel = value =>
    value && !Regex.tel.test(value) ? ErrorMessages.tel : undefined

  static decimal = value =>
    value && !Regex.decimal.test(value) ? ErrorMessages.decimal : undefined

  static date = value =>
    value && !Regex.date.test(value) ? ErrorMessages.date : undefined

  static num = value =>
    value && !Regex.num.test(value) ? ErrorMessages.num : undefined

  static minNumber = min => value =>
    value && value < min ? `${min}以上で入力してください。` : undefined

  static maxNumber = max => value =>
    value && value > max ? `${max}以下で入力してください。` : undefined

  static minLength = min => value =>
    value && value.length < min ? `${min}文字以上で入力してください。` : undefined

  static maxLength = max => value =>
    value && value.length > max ? `${max}文字以内で入力してください。` : undefined
}

const ErrorMessages = {
  required: "必須項目です。",
  email: "Emailの形式が正しくありません。",
  num: "半角数字(小数不可)で入力して下さい。",
  password: "英字、数字を組み合わせた8文字以上、16文字以内で入力してください。",
  date: "2000-01-30の形式で入力してください。",
  minNumber: "数値が少なすぎます。",
  maxNumber: "数値が多すぎます。",
  decimal: "半角数字で入力して下さい。",
  tel: "電話番号は半角数字（-）で入力してください。",
  zip: "郵便番号は半角数字（-）で入力してください。",
  url: "URLの形式が間違っています。",
  zero: '発送しない場合は0を入力してください。',
  repasswordUnmatch: "パスワードが不一致です。",
}

const Regex = {
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  num: /^[0-9]+$/,
  password: /^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/,
  date: /(\d{4}).?(\d{2}).?(\d{2}).*/,
  decimal: /^[0-9]+(\.[0-9]*)?$/,
  tel: /^\d{1,4}-\d{4}$|^\d{2,5}-\d{1,4}-\d{4}$/,
  zip: /^\d{3}[-]\d{4}$/,
  url: /^(https?)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/
}


// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
//
// export const asyncValidate = (values/*, dispatch */) => {
//   return sleep(1000) // simulate server latency
//     .then(() => {
//       if ([ 'foo@foo.com', 'bar@bar.com' ].includes(values.email)) {
//         throw { email: 'Email already Exists' }
//       }
//     })
// }
