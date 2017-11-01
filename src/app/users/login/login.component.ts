import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../shared/auth.service";
import { ControlType } from "../../shared/validation/form-validation-messages.component";

@Component({
  selector: "blnt-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public controlValidation: Object = {};

  constructor(public fb: FormBuilder, private _authService: AuthService) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });

    this.controlValidation["email"] = {
      control: this.loginForm.controls.email,
      type: ControlType[ControlType.email]
    };

    this.controlValidation["password"] = {
      control: this.loginForm.controls.password,
      type: ControlType[ControlType.password]
    };
  }

  public onSubmit(): void {
    this._authService.login(this.loginForm.get("email").value, this.loginForm.get("password").value);
  }
}