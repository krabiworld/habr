export interface Hub {
  alias: string
  commonTags: string[]
  descriptionHtml: string
  id: string
  imageUrl: string
  isOfftop: boolean
  isProfiled: boolean
  relatedData: Record<string, never>
  statistics: {
    subscribersCount: number
    rating: number
    authorsCount: number
    postsCount: number
  }
  titleHtml: string
}

export interface HubPost {
  title: string
  alias: string
  id: string
  type: string
}
