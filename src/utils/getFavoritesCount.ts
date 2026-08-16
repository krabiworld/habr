import { Post } from 'src/interfaces'
import formatNumber from './formatNumber'

const getFavoritesCount = ({ post }: { post: Post }) => {
  return formatNumber(post.statistics.favoritesCount)
}

export default getFavoritesCount
