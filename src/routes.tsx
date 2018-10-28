import * as React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import { SortIndex } from "./pages/sort"
import { TopIndex } from "./pages/top"
import styled from "styled-components"
import Color from "./style/const/color"
import { LogoutIndex } from "./pages/logout"

const Routes = () => (
  <Router basename="/EagleJump/">
    <Background>
      <Route path="/" exact={true} component={TopIndex} />
      <Route path="/sort" exact={true} component={SortIndex} />
      <Route path="/logout" exact={true} component={LogoutIndex} />
    </Background>
  </Router>
)

export default Routes

const Background = styled.div`
  background-color: ${Color.LIGHT_BLACK};
  min-width: 100%;
  min-height: 100vh;
  color: ${Color.WHITE};
`
