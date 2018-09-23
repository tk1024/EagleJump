import "bootstrap/dist/css/bootstrap.css"
import * as React from "react"
import * as ReactDOM from "react-dom"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import App from "./routes"
import { Provider } from "react-redux"
import { store } from "./reducers"
import styled from "styled-components"
import Color from "./style/const/color"

const StyledApp = styled(App)`
  background-color: ${Color.BLACK};
`

ReactDOM.render(
  <Provider store={store}>
    <StyledApp />
  </Provider>,
  document.getElementById("root") as HTMLElement
)
registerServiceWorker()
