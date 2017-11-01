import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";

import { AlertsService } from "./alerts.service";

@Injectable()
export class AlertGuardService implements CanActivate {
  public constructor(private _alerts: AlertsService) {}

  public canActivate(): boolean {
    this._alerts.onLoad();
    return true;
  }
}