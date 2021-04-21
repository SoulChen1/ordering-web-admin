import {PRODUCT} from '@/services/api'
import {request, METHOD} from '@/utils/request'

/**
 * 获取商品列表
 * @returns {Promise<*>}
 */
export async function getProductList(param = {}) {
  return request(PRODUCT, METHOD.GET, {
    ...param
  });
}

export default {
  getProductList,
}
