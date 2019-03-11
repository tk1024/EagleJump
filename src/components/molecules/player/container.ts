import { connect } from "react-redux"
import { Action, Dispatch } from "redux"
import {
  updateCurrentTime,
  updatePlayTime,
  onPause,
  onPlay,
  onToggle,
  onChangeVolume,
  onVolumeUp,
  onVolumeDown,
  onToggleMute,
  updatePlayTimeFromCurrent,
} from "src/actions/player-meta-data"
import { IPlayerMetaData } from "src/reducers/player-meta-data"
import { IRootState } from "src/reducers"
import { selectedSong } from "src/actions/player"
import { ITrack } from "src/interface/track"

export interface IContainerStateToProps {
  player: IRootState["player"]
  playerMetaData: IRootState["playerMetaData"]
  actions: ActionDispatcher
}

export class ActionDispatcher {
  constructor(private dispatch: (action: Action) => void) {}

  public updateCurrentTime(newTime: IPlayerMetaData["currentTime"]) {
    this.dispatch(updateCurrentTime(newTime))
  }

  public updatePlayTime(newTime: IPlayerMetaData["updatePlayTime"]) {
    this.dispatch(updatePlayTime(newTime))
  }

  public updatePlayTimeFromCurrent(sec: number) {
    this.dispatch(updatePlayTimeFromCurrent(sec))
  }

  public selectedSong(data: ITrack) {
    this.dispatch(selectedSong(data))
  }

  public onPlay() {
    this.dispatch(onPlay())
  }

  public onPause() {
    this.dispatch(onPause())
  }

  public onToggle() {
    this.dispatch(onToggle())
  }

  public onToggleMute() {
    this.dispatch(onToggleMute())
  }

  public onChangeVolume(newVolume: IPlayerMetaData["volume"]) {
    this.dispatch(onChangeVolume(newVolume))
  }

  public onVolumeUp() {
    this.dispatch(onVolumeUp())
  }

  public onVolumeDown() {
    this.dispatch(onVolumeDown())
  }
}

const mapStateToProps = ({ player, playerMetaData }: IRootState) => ({
  player,
  playerMetaData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: new ActionDispatcher(dispatch),
})

export const container = connect(
  mapStateToProps,
  mapDispatchToProps
)
