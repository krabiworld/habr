import { Post } from 'src/interfaces'

const getScoreTotal = ({
  post,
}: {
  post: Post
}) => {
  const total = post.statistics.votesCount
  const score = Number(post.statistics.score)
  const positive = (total + score) / 2
  const negative = (total - score) / 2
  return { total, score, positive, negative }
}

export default getScoreTotal
