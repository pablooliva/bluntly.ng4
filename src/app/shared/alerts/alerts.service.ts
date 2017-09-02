import { Subject } from "rxjs/Subject";

import { IAlerts } from "./alerts.component";

export class AlertsService {
  public alertsChanged: Subject<IAlerts[]> = new Subject<IAlerts[]>();

  private _alerts: IAlerts[] = [];

  public getAlerts(): IAlerts[] {
    return this._alerts;
  }

  public addAlert(newAlert: IAlerts): void {
    this._alerts.push(newAlert);
    this.alertsChanged.next(this._alerts);
  }

  public cancelAlert(index: number): void {
    this._alerts.splice(index, 1);
    this.alertsChanged.next(this._alerts);
  }

  public onLoad(): void {
    this._clearAllNonPersistentAlerts();
    this._setAlertsToNonPersistent();
    this.alertsChanged.next(this._alerts);
  }

  private _clearAllNonPersistentAlerts(): void {
    this._alerts = this._alerts.filter(AlertsService.persistentAlerts);
  }

  private _setAlertsToNonPersistent(): void {
    this._alerts.forEach(alert => alert["persistent"] = false);
  }

  static persistentAlerts(alert: IAlerts): boolean {
    return alert.persistent;
  }
}
