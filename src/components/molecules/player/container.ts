import { connect } from "react-redux"
import { Action, Dispatch } from "redux"
import {
  updateCurrentTime,
  updatePlayTime,
  onPause,
  onPlay,
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

  public selectedSong(data: ITrack) {
    this.dispatch(selectedSong(data))
  }

  public onPlay() {
    this.dispatch(onPlay())
  }

  public onPause() {
    this.dispatch(onPause())
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
