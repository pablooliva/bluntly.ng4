import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/auth.service";

@Component({
  selector: "blnt-register",
  templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(public fb: FormBuilder, private _authService: AuthService) {}

  public ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  public onSubmit(): void {
    this._authService.register(this.registerForm.get("email").value, this.registerForm.get("password").value);
  }
}