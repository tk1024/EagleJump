import axios from "axios"
import * as qs from "qs"
import { Entity } from "./entity"

interface IExchangeOption {
  username?: string
  password?: string
}

interface IInitOpts {
  clientId: string
  clientSecret: string
  oauthToken?: string
}

class SoundCloud {
  public oauthToken: string
  private baseURL: string = "https://api.soundcloud.com"
  // private username: string = "";
  // private password: string = "";
  // connectURL = options.connectURL || 'https://connect.soundcloud.com';
  private clientId: string
  private clientSecret: string
  // username = options.username || undefined;
  // password = options.password || undefined;
  // private redirect_uri = options.redirect_uri || undefined;

  // private refreshToken: string;

  constructor(opts: IInitOpts) {
    this.clientId = opts.clientId
    this.clientSecret = opts.clientSecret
    if (opts.oauthToken) {
      this.oauthToken = opts.oauthToken
    }
  }

  public get(endpoint: string, opts: object) {
    return this.request("GET", endpoint, opts)
  }

  public post(endpoint: string, opts: object) {
    return this.request("POST", endpoint, opts)
  }

  public direct(method: string, url: string, data: any = {}) {
    return axios({
      method,
      url,
      data: qs.stringify(data),
    })
  }

  public exchangeToken(options: IExchangeOption = {}): Promise<any> {
    const params: any = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
    }

    if (this.optionsForCredentialsFlowPresent(options)) {
      params.grant_type = "password"
      params.username = options.username
      params.password = options.password
    }

    return new Promise((resolve, reject) => {
      this.direct("post", `${this.baseURL}/oauth2/token`, params)
        .then(res => {
          const data: Entity = res.data
          this.oauthToken = data.access_token
          // TODO: refreshTokenのサポート
          // this.refreshToken = data.refresh_token;
          // TODO: expires_inのサポート
          return resolve(data)
        })
        .catch(err => {
          return reject(err)
        })
    })
  }

  private request(method: string, path: string, params: any = {}) {
    let data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
    }
    let url: string

    if (path[0] === "h") {
      url = path
    } else {
      // prepend `/` if not present
      path = path[0] !== "/" ? `/${path}` : path

      if (this.oauthToken) {
        params.oauth_token = this.oauthToken
      }

      // in case of POST, PUT, DELETE -> prepare data
      if (method !== "GET") {
        data = Object.assign(data, params)
        params = { oauth_token: this.oauthToken }
      }

      // construct request url
      url = `${this.baseURL}${path}?${qs.stringify(params)}`
    }

    return axios({
      method,
      url,
      data: qs.stringify(data),
    })
  }

  // private options_for_refresh_flow_present() {
  //   return !!(this.refresh_token);
  // }

  private optionsForCredentialsFlowPresent(options: any = {}) {
    return !!(options.username && options.password)
  }

  // private options_for_code_flow_present() {
  //   return !!(this.code && this.redirect_uri);
  // }
}

export default SoundCloud
