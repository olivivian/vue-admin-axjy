/** 完成页面组件 **/

import Layout from '@/layout'

const pageRouter = {
  path: '/page',
  component: Layout,
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'basic-page',
      component: () => import('@/views/basic-page/Index'),
      name: 'BasicPage',
      meta: { title: '基础页面' }
    }
  ]
}
export default pageRouter
