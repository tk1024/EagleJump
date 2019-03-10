import { IUser } from "./user"

export interface ITrack {
  kind?: "track"
  id: number
  created_at: string
  user_id: number
  duration: number
  commentable?: boolean
  state?: string
  sharing?: string
  tag_list?: string
  permalink?: string
  description?: string
  streamable?: boolean
  downloadable?: boolean
  genre?: any
  release?: any
  purchase_url?: any
  label_id?: any
  label_name?: any
  isrc?: any
  video_url?: any
  key_signature?: any
  bpm?: any
  title: string
  release_year?: any
  release_month?: any
  release_day?: any
  original_format?: string
  original_content_size?: number
  license?: string
  uri?: string
  permalink_url?: string
  artwork_url?: string | null
  waveform_url?: string
  user: IUser
  stream_url?: string
  download_url?: string
  playback_count?: number
  download_count?: number
  favoritings_count?: number
  comment_count?: number
  attachments_uri?: string
  last_modified?: string
  embeddable_by?: "all"
  purchase_title?: any
  user_playback_count?: number
  user_favorite?: boolean
  track_type?:
    | "original"
    | "remix"
    | "live"
    | "recording"
    | "spoken"
    | "podcast"
    | "demo"
    | "in progress"
    | "stem"
    | "loop"
    | "sound effect"
    | "sample"
    | "other"
    | ""
    | null
  label?: ILabel
}

interface ILabel {
  id: number
  kind: string
  permalink: string
  username: string
  last_modified: string
  uri: string
  permalink_url: string
  avatar_url: string
}
