import { User, UserLocation } from './User'

export default interface Company {
  aDeskSettings: unknown
  alias: string
  careerAlias: string
  contacts: Array<{
    title: string
    url: string
  }>
  descriptionHtml: string
  foundationDate: {
    year: string
    month: string
    day: string
  }
  imageUrl: string
  location: {
    city: UserLocation
    location: UserLocation
    region: UserLocation
  }
  metadata: {
    description: string
    descriptionHtml: string
    keywords: string[]
    title: string
    titleHtml: string
  }
  registrationDate: string
  relatedData: Record<string, never>
  representativeUser: User
  settings: {
    analyticsSettings: Array<{
      type: string
      trackingId: string
    }>
    branding: {
      imageUrl: string
      linkUrl: string
      pixelUrl: string
    }
    status: string
  }
  siteUrl: string
  staffNumber: string
  statistics: {
    careerRating: number
    employeesCount: number
    invest: number
    newsCount: number
    postsCount: number
    rating: number
    subscribersCount: number
    vacanciesCount: number
  }
  titleHtml: string
}
