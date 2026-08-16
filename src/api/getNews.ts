import makeRequest from './makeRequest'
import { Posts } from '../interfaces'

export default async ({
  page,
}: {
  page: number
}) => {
  let params: Record<string, string> = {
    news: 'true',
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
