import { ITrack } from "../interface/track"
import { PlayerAction } from "../actions/player"

export default function PlayerReducer(
  state: ITrack,
  action: { type: PlayerAction; data: ITrack }
) {
  switch (action.type) {
    case PlayerAction.SELECTED_SONG:
      return action.data
    default:
      return state || {}
  }
}
