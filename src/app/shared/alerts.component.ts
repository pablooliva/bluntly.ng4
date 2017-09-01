import { Component, OnDestroy, OnInit } from "@angular/core";
import { AlertsService } from "./alerts.service";
import { Subscription } from "rxjs/Subscription";

export interface IAlerts {
  type: string;
  messagePrimary: string;
  messageSecondary?: string;
  persistent: boolean;
}

export enum IBSAlertTypes {
  success,
  info,
  warning,
  danger
}

@Component({
  selector: "blnt-alert",
  templateUrl: "./alerts.component.html",
  styleUrls: [ "./alerts.component.scss" ]
})
export class AlertsComponent implements OnInit, OnDestroy {
  public alerts: IAlerts[];
  private alertsSubscription: Subscription;

  public constructor(private _alertsService: AlertsService) {}

  public ngOnInit(): void {
    this.alerts = this._alertsService.getAlerts();
    this.alertsSubscription = this._alertsService.alertsChanged
      .subscribe((alerts: IAlerts[]) => {
        this.alerts = alerts;
      });
  }

  public ngOnDestroy(): void {
    this.alertsSubscription.unsubscribe();
  }

  public onClosed(event: any, index: number): void {
    this._alertsService.cancelAlert(index);
  }
}