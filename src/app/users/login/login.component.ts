import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/auth.service";

@Component({
  selector: "blnt-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(public fb: FormBuilder, private _authService: AuthService) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  public onSubmit(): void {
    this._authService.login(this.loginForm.get("email").value, this.loginForm.get("password").value);
  }
}