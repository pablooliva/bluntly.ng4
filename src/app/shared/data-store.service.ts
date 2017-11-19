import { Injectable } from "@angular/core";

export interface IDataStore {
  name: string;
  data: Object;
}

@Injectable()
export class DataStoreService {
  public putInStorage(dataObject: IDataStore): void {
    localStorage.setItem(dataObject.name, JSON.stringify(dataObject.data));
  }
  
  public getFromStorage(dataName: string): IDataStore {
     return localStorage.getItem(dataName)
       ? { name: dataName, data: JSON.parse(localStorage.getItem(dataName)) }
       : null;
  }
  
  public removeFromStorage(dataName: string): void {
    localStorage.removeItem(dataName);
  }
}