import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

export interface IGeoLocation {
  ip: string;
  country_code: string;
  country_name: string;
}

@Injectable()
export class SourceService {
  constructor(private _http: Http) {}

  public getSource(): Observable<IGeoLocation> {
    return this._http.get("https://freegeoip.net/json/")
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        console.error(error);
        return Observable.throw(error);
      });
  }
}