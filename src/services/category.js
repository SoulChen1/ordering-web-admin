import {CATEGORY_OPTION} from '@/services/api'
import {request, METHOD} from '@/utils/request'

/**
 * 获取商品分类选项
 * @returns {Promise<*>}
 */
export async function getCategoryOption() {
  return request(CATEGORY_OPTION, METHOD.GET);
}

export default {
  getCategoryOption,
}
