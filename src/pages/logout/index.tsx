import * as React from "react"
import LoginToken from "../../lib/loginToken"

export class LogoutIndex extends React.Component {
  public componentDidMount() {
    new LoginToken().removeTokne()
    location.href = "/"
  }
  public render() {
    return <></>
  }
}
