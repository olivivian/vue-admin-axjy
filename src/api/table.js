import request from '@/utils/request'

export function TableListQuery(query) {
  return request({
    url: '/table/list',
    method: 'post',
    params: query
  })
}
export function TableOperHandle(query) {
  return request({
    url: '/table/list',
    method: 'post',
    params: query
  })
}
export function TableDetailQuery(query) {
  return request({
    url: '/table/list',
    method: 'post',
    params: query
  })
}
