import { PlayerMetaDataAction } from "src/actions/player-meta-data"

export interface IPlayerMetaData {
  currentTime: number
  updatePlayTime: number | null
  isPlaying: boolean
  volume: number
  muted: boolean
}

export const InitialPlayerMetaData = {
  currentTime: 0,
  updatePlayTime: null,
  isPlaying: false,
  volume: 30,
  muted: false,
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
    case PlayerMetaDataAction.ON_CHANGE_VOLUME:
      return Object.assign({}, state, action.data)
    case PlayerMetaDataAction.ON_TOGGLE:
      return Object.assign({}, state, {
        isPlaying: !state.isPlaying,
      })
    case PlayerMetaDataAction.ON_TOGGLE_MUTE:
      return Object.assign({}, state, {
        muted: !state.muted,
      })
    case PlayerMetaDataAction.ON_VOLUME_UP:
      return Object.assign({}, state, {
        muted: false,
        volume: Math.min(100, state.volume + 5),
      })
    case PlayerMetaDataAction.ON_VOLUME_DOWN:
      return Object.assign({}, state, {
        muted: false,
        volume: Math.max(0, state.volume - 5),
      })
    case PlayerMetaDataAction.UPDATE_PLAY_TIME_FROM_CURRENT:
      return Object.assign({}, state, {
        updatePlayTime: state.currentTime + action.data.updatePlayTime!,
      })
    default:
      return state
  }
}
