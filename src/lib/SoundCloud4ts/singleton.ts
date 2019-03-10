import SoundCloud from "./index"

class Singleton {
  // tslint:disable-next-line
  private static _instance: SoundCloud

  private constructor() {}

  /** インスタンスの取得 */
  public static get instance(): SoundCloud {
    if (!this._instance) {
      this._instance = new SoundCloud({
        clientId: "7161bb14d39ff3151291a5c790870f44",
        clientSecret: "c18e4a952fb7a116e74b5a32845b55d2",
      })
    }

    // 生成済みのインスタンスを返す
    return this._instance
  }
}

export default Singleton.instance
