import makeRequest from './makeRequest'
import { Post } from '../interfaces'

export default async (id: number | string) =>
  await makeRequest<Post>({
    path: `articles/${id}/pageview`,
    version: 1,
    requestOptions: {
      method: 'POST',
      data: {},
      headers: {
        Referer: `https://habr.com/ru/post/${id}`,
      },
    },
  })
