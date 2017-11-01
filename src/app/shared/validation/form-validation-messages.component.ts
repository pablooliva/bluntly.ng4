import { Component, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";

// Must correlate to a Switch Case in template
export enum ControlType {
  text,
  email,
  password,
  group
}

export enum MessageType {
  unique,
  groupValidation
}

export interface IControlValidation {
  control: AbstractControl;
  type: string;
  message?: MessageType;
}

@Component({
  selector: "blnt-validation-msg",
  templateUrl: "./form-validation-messages.component.html",
  styleUrls: [ "./form-validation-messages.component.scss" ]
})
export class FormValidationMessagesComponent {
  @Input() public controlValidation: IControlValidation;
}