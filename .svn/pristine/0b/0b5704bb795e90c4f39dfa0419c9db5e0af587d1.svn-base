/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[34578]\d{9}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 身份证(18位)
 * @param {*} s
 */
export function isIDCard (s) {
  return /^[1-9]d{5}[1-9]d{3}((0d)|(1[0-2]))(([0|1|2]d)|3[0-1])d{4}$/.test(s)
}

/**
 * 登录名 3-18位字母、数字或“_”,字母开头
 * @param {*} s
 */
export function isUserName (s) {
  return /^[a-zA-Z][a-zA-Z0-9_]{2,17}$/.test(s)
}

/**
 * 密码 密码必须为6-18位数字和字母组合
 * @param {*} s
 */
export function isPassword (s) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(s)
}