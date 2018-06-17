import 'bootstrap/dist/css/bootstrap.css';
import * as React from "react"
import * as ReactDOM from "react-dom"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import App from "./routes"

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement)
registerServiceWorker()
