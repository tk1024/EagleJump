import { LocalStorage } from "../storage"

export interface ILoginToken {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
}

interface ILoginTokenWithSetTime extends ILoginToken {
  setTime: number
}

const key = "Token"

export default class LoginToken {
  private storage: LocalStorage

  constructor() {
    this.storage = new LocalStorage()
  }

  public getToken(): ILoginTokenWithSetTime | null {
    const loginToken = this.storage.getItem<ILoginTokenWithSetTime>(key)
    if (!loginToken || !loginToken.access_token) {
      return null
    }
    // TODO: リフレッシュトークン取得を別で実装する
    if (loginToken.expires_in * 1000 + loginToken.setTime < Date.now()) {
      return null
    }
    return this.storage.getItem<ILoginTokenWithSetTime>(key)
  }

  public setToken(data: ILoginToken) {
    const dataWithSetTime: ILoginTokenWithSetTime = Object.assign({}, data, {
      setTime: Date.now(),
    })
    this.storage.setItem(key, dataWithSetTime)
  }

  public removeTokne() {
    this.storage.removeItem(key)
  }
}
