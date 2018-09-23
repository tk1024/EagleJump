import { combineReducers, createStore } from "redux"
import playerReducer from "./player"

export const store = createStore(
  combineReducers({
    player: playerReducer,
  })
)
