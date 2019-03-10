import { IPlayerMetaData } from "src/reducers/player-meta-data"

export enum PlayerMetaDataAction {
  UPDATE_CURRENT_TIME = "UPDATE_CURRENT_TIME",
  UPDATE_PLAY_TIME = "UPDATE_PLAY_TIME",
  ON_PLAY = "ON_PLAY",
  ON_PAUSE = "ON_PAUSE",
}

export const updateCurrentTime = (
  currentTime: IPlayerMetaData["currentTime"]
) => ({
  type: PlayerMetaDataAction.UPDATE_CURRENT_TIME,
  data: {
    currentTime,
  },
})

export const updatePlayTime = (newTime: IPlayerMetaData["updatePlayTime"]) => ({
  type: PlayerMetaDataAction.UPDATE_PLAY_TIME,
  data: {
    updatePlayTime: newTime,
  },
})

export const onPlay = () => ({
  type: PlayerMetaDataAction.ON_PLAY,
  data: {
    isPlaying: true,
  },
})

export const onPause = () => ({
  type: PlayerMetaDataAction.ON_PAUSE,
  data: {
    isPlaying: false,
  },
})
