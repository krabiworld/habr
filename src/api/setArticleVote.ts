import makeRequest from './makeRequest'
import { ArticleVoteResponse } from '../interfaces'

export default async ({
  mode = 'up',
  id,
  reason,
}: {
  mode: 'up' | 'down'
  id: string | number
  reason?: string
}): Promise<ArticleVoteResponse> =>
  await makeRequest<ArticleVoteResponse>({
    path: `articles/${id}/votes/${mode}`,
    version: 2,
    requestOptions: {
      method: 'POST',
      data: reason ? { reason } : null,
    },
  })
