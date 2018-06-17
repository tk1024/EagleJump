export interface IStorage {
  getItem<T>(key: string): T[];

  setItem<T>(key: string, data: T): void;
}

export class LocalStorage implements IStorage {
  public getItem<T>(key: string): T[] {
    if (!localStorage) {
      return [];
    }
    try {
      const o: any[] = JSON.parse(localStorage.getItem(key) || "[]" as string);
      return o;
    } catch (e) {
      return [];
    }
  }

  public setItem<T>(key: string, data: T) {
    if (!localStorage) {
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }
}