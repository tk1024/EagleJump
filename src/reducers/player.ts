import { ITrack } from "../interface/track"
import { PlayerAction } from "../actions/player"

export default function playerReducer(
  state: ITrack,
  action: { type: PlayerAction; data: any }
) {
  switch (action.type) {
    case PlayerAction.SELECTED_SONG:
      return action.data
    default:
      return null
  }
}
