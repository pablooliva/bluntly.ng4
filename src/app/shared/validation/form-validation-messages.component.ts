import { Component, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";

export enum IControl {
  email,
  password
}

export interface IControlValidation {
  control: AbstractControl;
  type: string;
}

@Component({
  selector: "blnt-validation-msg",
  templateUrl: "./form-validation-messages.component.html",
  styleUrls: [ "./form-validation-messages.component.scss" ]
})
export class FormValidationMessagesComponent {
  @Input() public controlValidation: IControlValidation;
}