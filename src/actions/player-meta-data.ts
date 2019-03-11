import { IPlayerMetaData } from "src/reducers/player-meta-data"

export enum PlayerMetaDataAction {
  UPDATE_CURRENT_TIME = "UPDATE_CURRENT_TIME",
  UPDATE_PLAY_TIME = "UPDATE_PLAY_TIME",
  UPDATE_PLAY_TIME_FROM_CURRENT = "UPDATE_PLAY_TIME_FROM_CURRENT",
  ON_PLAY = "ON_PLAY",
  ON_PAUSE = "ON_PAUSE",
  ON_TOGGLE = "ON_TOGGLE",
  ON_TOGGLE_MUTE = "ON_TOGGLE_MUTE",
  ON_CHANGE_VOLUME = "ON_CHANGE_VOLUME",
  ON_VOLUME_UP = "ON_VOLUME_UP",
  ON_VOLUME_DOWN = "ON_VOLUME_DOWN",
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

export const updatePlayTimeFromCurrent = (sec: number) => ({
  type: PlayerMetaDataAction.UPDATE_PLAY_TIME_FROM_CURRENT,
  data: {
    updatePlayTime: sec,
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

export const onToggle = () => ({
  type: PlayerMetaDataAction.ON_TOGGLE,
  data: {},
})

export const onToggleMute = () => ({
  type: PlayerMetaDataAction.ON_TOGGLE_MUTE,
  data: {},
})

export const onChangeVolume = (newVolume: IPlayerMetaData["volume"]) => ({
  type: PlayerMetaDataAction.ON_CHANGE_VOLUME,
  data: {
    muted: false,
    volume: newVolume,
  },
})

export const onVolumeUp = () => ({
  type: PlayerMetaDataAction.ON_VOLUME_UP,
  data: {},
})

export const onVolumeDown = () => ({
  type: PlayerMetaDataAction.ON_VOLUME_DOWN,
  data: {},
})
