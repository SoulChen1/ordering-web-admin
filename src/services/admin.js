import {LOGIN} from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'

/**
 * 使用用户名登录
 * @param account
 * @param password
 * @returns {Promise<*>}
 */
export async function loginByAccount(account, password) {
  return request(LOGIN, METHOD.POST, {
    account: account,
    password: password,
    method: 'account'
  })
}

/**
 * 使用手机号码登录
 * @param phone
 * @param password
 * @returns {Promise<*>}
 */
export async function loginByPhone(phone, password){
  return request(LOGIN, METHOD.POST, {
    phone: phone,
    password: password,
    method: 'phone'
  })
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}
export default {
  loginByAccount,
  loginByPhone,
  logout,
}
