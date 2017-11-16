import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../shared/auth.service";
import { ControlType } from "../../shared/validation/form-validation-messages.component";

@Component({
  selector: "blnt-register",
  templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild("needFocus") needFocus: ElementRef;

  public registerForm: FormGroup;
  public controlValidation: Object = {};

  constructor(public fb: FormBuilder, private _authService: AuthService) {}

  public ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.minLength(6), Validators.required]]
    });

    this.controlValidation["email"] = {
      control: this.registerForm.controls.email,
      type: ControlType[ControlType.email]
    };

    this.controlValidation["password"] = {
      control: this.registerForm.controls.password,
      type: ControlType[ControlType.password]
    };
  }

  public ngAfterViewInit(): void {
    this.needFocus.nativeElement.focus();
  }

  public onSubmit(): void {
    this._authService.register(this.registerForm.get("email").value, this.registerForm.get("password").value);
  }
}