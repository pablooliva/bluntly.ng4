import { Injectable } from "@angular/core";
import { IGeoLocation, SourceService } from "./source.service";

export interface IDataStore {
  name: string;
  data: Object;
}

@Injectable()
export class DataStoreService {
  constructor(private _sourceService: SourceService) {}

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

  public saveLocalId(uid: string): void {
    this._sourceService.getSource().subscribe(
      (response: IGeoLocation) => {
        this._saveLocalIdFinish(uid, response);
      },
      error => {
        const geoData: IGeoLocation = {
          ip: "",
          country_name: "",
          country_code: ""
        };

        this._saveLocalIdFinish(uid, geoData);
      }
    );
  }

  public getLocalId(): Object {
    return JSON.parse(localStorage.getItem("blntUData"));
  }

  private _saveLocalIdFinish(uid: string, geoData: IGeoLocation): void {
    localStorage.setItem("blntUData", JSON.stringify(
      {
        user: uid,
        timestamp: Date.now(),
        geoData: geoData
      }
    ));
  }
}