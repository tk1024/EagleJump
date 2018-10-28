import * as React from "react"
import { ChangeEvent, FormEvent } from "react"
import { Redirect } from "react-router"
import LoginToken from "../../lib/loginToken"
import SoundCloud from "../../lib/SoundCloud4ts/singleton"
import { Logo } from "../../components/atoms/Logo"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import Color from "../../style/const/color"

interface IState {
  id: string
  password: string
  isAuthenticated: boolean
}

export class TopIndex extends React.Component<{}, IState> {
  private loginTokenStorage: LoginToken

  constructor(props: any) {
    super(props)
    this.state = {
      id: "",
      password: "",
      isAuthenticated: false,
    }
    this.loginTokenStorage = new LoginToken()
    this.onChangeId = this.onChangeId.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  public componentDidMount() {
    if (this.loginTokenStorage.getToken()) {
      this.setSoundCloudToken(this.loginTokenStorage.getToken())
    }
  }

  public onChangeId(ev: ChangeEvent) {
    const el = ev.currentTarget as HTMLInputElement
    this.setState({
      id: el.value,
    })
  }

  public onChangePassword(ev: ChangeEvent) {
    const el = ev.currentTarget as HTMLInputElement
    this.setState({
      password: el.value,
    })
  }

  public async onSubmit(ev: FormEvent) {
    ev.preventDefault()
    const res: any = await SoundCloud.exchangeToken({
      username: this.state.id,
      password: this.state.password,
    }).catch(err => {
      alert("認証に失敗しました")
    })
    this.loginTokenStorage.setToken(res)
    this.setSoundCloudToken(res)
  }

  public render() {
    if (this.state.isAuthenticated) {
      return <Redirect to={{ pathname: "/sort" }} />
    }

    return (
      <div className="container m-t-5">
        <Row className="row">
          <div className="col-md-5">
            <LogoWrapper>
              <Logo size={200} />
            </LogoWrapper>
            <form onSubmit={this.onSubmit}>
              <p>SoundCloudの認証情報を入力して下さい</p>
              <div className="form-group">
                <label htmlFor="inputId">
                  メールアドレス <small>または</small> ユーザ名
                </label>
                <input
                  id="inputId"
                  type="text"
                  className="form-control"
                  placeholder="メールアドレス または ユーザ名"
                  value={this.state.id}
                  onChange={this.onChangeId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword">パスワード</label>
                <input
                  id="inputPassword"
                  type="password"
                  className="form-control"
                  placeholder="パスワード"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>
              <small className="form-text text-muted">
                SoundCloudの認証以外に使われる事・保存される事はありません
                <br />
                アプリケーションのOAuthTokenの取得にのみ使用されます
              </small>
              <ButtonWrapper>
                <StyledButton type="submit" className="btn btn-primary">
                  <FontAwesomeIcon icon={faPaperPlane} /> ログインする
                </StyledButton>
              </ButtonWrapper>
            </form>
          </div>
        </Row>
      </div>
    )
  }

  private setSoundCloudToken(token: any = {}) {
    SoundCloud.oauthToken = token.access_token
    this.setState({
      isAuthenticated: true,
    })
  }
}

const Row = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  > * {
    background-color: ${Color.WHITE};
    border: 5px solid ${Color.WHITE};
    box-sizing: content-box;
  }
`

const ButtonWrapper = styled.div`
  text-align: center;
`

const StyledButton = styled.button`
  margin: 20px 0 100px;
  width: 50%;
`
