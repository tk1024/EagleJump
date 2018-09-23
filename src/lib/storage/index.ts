export interface IStorage {
  getItem<T>(key: string): T | null

  setItem<T>(key: string, data: T): void
}

export class LocalStorage implements IStorage {
  public getItem<T>(key: string): T | null {
    if (!localStorage) {
      return null
    }
    try {
      return JSON.parse(localStorage.getItem(key) || ("[]" as string)) as T
    } catch (e) {
      return null
    }
  }

  public setItem<T>(key: string, data: T) {
    if (!localStorage) {
      return
    }
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
  }
}
