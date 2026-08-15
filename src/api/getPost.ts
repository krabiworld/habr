import makeRequest from './makeRequest'
import { Post } from '../interfaces'
import APIError from 'src/interfaces/APIError'

export default async (
  id: number | string,
) =>
  await makeRequest<Post | APIError>({
    path: `articles/${id}`,
    version: 2,
  })
