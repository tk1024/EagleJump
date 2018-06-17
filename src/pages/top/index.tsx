import * as React from "react"
import {ChangeEvent, FormEvent} from "react"
import {Redirect} from "react-router";
import LoginToken from "../../lib/loginToken";
import SoundCloud from "../../lib/SoundCloud4ts/singleton"

interface IState {
  id: string;
  password: string;
  isAuthenticated: boolean
}

export class TopIndex extends React.Component<{}, IState> {
  private loginTokenStorage: LoginToken;

  constructor(props: any) {
    super(props);
    this.state = {
      id: "",
      password: "",
      isAuthenticated: false
    };
    this.loginTokenStorage = new LoginToken();
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public componentDidMount() {
    if (this.loginTokenStorage.getToken().access_token) {
      this.setSoundCloudToken(this.loginTokenStorage.getToken());
    }
  }

  public onChangeId(ev: ChangeEvent) {
    const el = ev.currentTarget as HTMLInputElement;
    this.setState({
      id: el.value
    });
  }

  public onChangePassword(ev: ChangeEvent) {
    const el = ev.currentTarget as HTMLInputElement;
    this.setState({
      password: el.value
    });
  }

  public async onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const res: any = await SoundCloud.exchangeToken({
      username: this.state.id,
      password: this.state.password
    }).catch(err => {
      alert("認証に失敗しました");
    });
    this.loginTokenStorage.setToken(res);
    this.setSoundCloudToken(res);
  }

  public render() {

    if(this.state.isAuthenticated) {
      return (
        <Redirect to={{pathname: "/sort"}} />
      )
    }

    return (
      <div className="container m-t-5">
        <div className="row justify-content-md-center">
          <div className="col-md-5">
            <form onSubmit={this.onSubmit}>
              <p>SoundCloudの認証情報を入力して下さい</p>
              <div className="form-group">
                <label htmlFor="inputId">メールアドレス <small>または</small> ユーザ名</label>
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
                SoundCloudの認証以外に使われる事・保存される事はありません<br/>
                アプリケーションのOAuthTokenの取得にのみ使用されます
              </small>
              <button type="submit" className="btn btn-primary">送信</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  private setSoundCloudToken(token:any = {}) {
    SoundCloud.oauthToken = token.access_token;
    this.setState({
      isAuthenticated: true
    });
  }
}
