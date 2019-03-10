import { PlayerMetaDataAction } from "src/actions/player-meta-data"

export interface IPlayerMetaData {
  currentTime: number
  updatePlayTime: number | null
  isPlaying: boolean
}

export const InitialPlayerMetaData = {
  currentTime: 0,
  updatePlayTime: null,
  isPlaying: false,
}

export default function PlayerMetaDataReducer(
  state: IPlayerMetaData = InitialPlayerMetaData,
  action: { type: PlayerMetaDataAction; data: IPlayerMetaData }
) {
  switch (action.type) {
    case PlayerMetaDataAction.UPDATE_CURRENT_TIME:
    case PlayerMetaDataAction.UPDATE_PLAY_TIME:
    case PlayerMetaDataAction.ON_PAUSE:
    case PlayerMetaDataAction.ON_PLAY:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}
