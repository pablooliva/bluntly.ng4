import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "blnt-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(public fb: FormBuilder) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  public onSubmit(): void {
    console.warn("Test");
    console.warn(this.loginForm.get("email").value);
  }
}