//跨域代理前缀
const API_PROXY_PREFIX = '/api'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL + API_PROXY_PREFIX + '/admin'
// const AUTH_URL = process.env.VUE_APP_API_BASE_URL + API_PROXY_PREFIX + '/auth'
module.exports = {
  LOGIN: `${BASE_URL}/auth/login`,
  ROUTES: `${BASE_URL}/routes`,
  PRODUCT: `${BASE_URL}/admin/product`,
  CATEGORY_OPTION: `${BASE_URL}/admin/category/option`
}
