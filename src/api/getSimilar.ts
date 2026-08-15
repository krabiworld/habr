import makeRequest from './makeRequest'
import { PostsDeprecated } from 'src/interfaces/Posts'

export default async (id: number) =>
  await makeRequest<PostsDeprecated>({
    path: `articles/${id}/similar`,
    version: 2,
  })
