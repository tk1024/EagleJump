import {LocalStorage} from "../storage";

const key = "Token";

export default class LoginToken {
  private storage: LocalStorage;

  constructor() {
    this.storage = new LocalStorage();
  }

  public getToken(): any {
    return this.storage.getItem(key);
  }

  public setToken(token: string): any {
    return this.storage.setItem(key, token);
  }
}