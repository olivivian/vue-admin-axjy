import { getToken } from '@/utils/auth'

// 上传图片路径
export function uploadUrl() {
  return `${process.env.VUE_APP_BASE_API}/upload/xxx`
}
// token头部
export function headers() {
  return {
    Authorization: getToken()
  }
}
