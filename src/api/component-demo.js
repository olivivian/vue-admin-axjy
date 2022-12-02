import request from '@/utils/request'

export function treeListQuery(query) {
  return request({
    url: '/tree/list',
    method: 'post',
    params: query
  })
}
