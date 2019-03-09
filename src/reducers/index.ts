import { combineReducers, createStore } from "redux"
import playerReducer from "./player"
import { ITrack } from "src/interface/track"

export const store = createStore(
  combineReducers({
    player: playerReducer,
  })
)

export interface IRootState {
  player: ITrack
}
