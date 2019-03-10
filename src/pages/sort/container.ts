import { connect } from "react-redux"
import { IRootState } from "src/reducers"
import { Action, Dispatch } from "redux"
import { onPause, onPlay } from "src/actions/player-meta-data"
import { ITrack } from "src/interface/track"
import { selectedSong } from "src/actions/player"

export interface IContainerStateToProps {
  play_song_id: IRootState["player"]["id"]
  isPlaying: IRootState["playerMetaData"]["isPlaying"]
  actions: ActionDispatcher
}

export class ActionDispatcher {
  constructor(private dispatch: (action: Action) => void) {}

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
  play_song_id: player.id || null,
  isPlaying: playerMetaData.isPlaying,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: new ActionDispatcher(dispatch),
})

export const container = connect(
  mapStateToProps,
  mapDispatchToProps
)
