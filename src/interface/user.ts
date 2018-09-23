export interface IUser {
  kind: "user"
  id: number
  permalink: string
  username: string
  uri: string
  permalink_url: string
  avatar_url: string
  last_modified?: string
  country?: string
  full_name?: "string"
  city?: "string"
  description?: "string"
  "discogs-name"?: "string"
  "myspace-name"?: "string"
  website?: "string"
  "website-title"?: "string"
  online?: boolean
  track_count?: number
  playlist_count?: number
  followers_count?: number
  followings_count?: number
  public_favorites_count?: number
  avatar_data?: string
}
