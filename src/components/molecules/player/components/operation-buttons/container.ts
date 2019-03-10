import { connect } from "react-redux"
import { IRootState } from "src/reducers"
import { Action, Dispatch } from "redux"
import { onPause, onPlay } from "src/actions/player-meta-data"

export interface IContainerStateToProps {
  playerMetaData: IRootState["playerMetaData"]
  actions: ActionDispatcher
}

export class ActionDispatcher {
  constructor(private dispatch: (action: Action) => void) {}

  public onPlay() {
    this.dispatch(onPlay())
  }

  public onPause() {
    this.dispatch(onPause())
  }
}

const mapStateToProps = ({ player, playerMetaData }: IRootState) => ({
  playerMetaData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: new ActionDispatcher(dispatch),
})

export const container = connect(
  mapStateToProps,
  mapDispatchToProps
)
