import { ITrack } from "../interface/track"

export enum PlayerAction {
  SELECTED_SONG = "SELECT_SONG",
}

export const selectedSong = (data: ITrack) => ({
  type: PlayerAction.SELECTED_SONG,
  data,
})
