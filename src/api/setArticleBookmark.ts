import makeRequest from './makeRequest'

export default async ({
  mode = 'add',
  id,
}: {
  mode: 'add' | 'remove'
  id: string | number
}) =>
  await makeRequest<{
    ok: boolean
    server_time: string
  }>({
    path: `articles/${id}/bookmarks/${mode}`,
    version: 1,
    requestOptions: {
      method: 'POST',
    },
  })
