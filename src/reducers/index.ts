import { combineReducers, createStore } from "redux"
import { ITrack } from "src/interface/track"
import PlayerMetaDataReducer, {
  IPlayerMetaData,
} from "src/reducers/player-meta-data"
import PlayerReducer from "src/reducers/player"

export const store = createStore(
  combineReducers({
    player: PlayerReducer,
    playerMetaData: PlayerMetaDataReducer,
  })
)

export interface IRootState {
  player: ITrack
  playerMetaData: IPlayerMetaData
}
