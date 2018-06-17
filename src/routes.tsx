import * as React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"

import {SortIndex} from "./pages/sort";
import {TopIndex} from "./pages/top/index"

const Routes = () => (
  <Router>
    <div>
      <Route path="/" exact={true} component={TopIndex}/>
      <Route path="/sort" exact={true} component={SortIndex}/>
    </div>
  </Router>
);

export default Routes
