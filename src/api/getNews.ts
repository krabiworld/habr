import makeRequest from './makeRequest'
import { FlowAlias, Posts } from '../interfaces'

export default async ({
  page,
  flow = 'all',
}: {
  page: number
  flow: FlowAlias

}) => {
  let params: Record<string, string> = {
    news: 'true',
  }

  if (flow !== 'all') {
    params = {
      flowNews: 'true',
      flow,
    }
  }

  return await makeRequest<Posts>({
    path: 'articles',
    params: {
      page: page.toString(),
      ...params,
    },
    version: 2,
  })
}
