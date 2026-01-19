import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";
import {CtcUserAuth} from "../../services/ctc-user-auth/ctc-user-auth";
import RegisterUserRequest from "../../models/registerUserRequest";
import {LoginUserRequest} from "../../models";

@Component({
  selector: 'app-ctc-login',
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './ctc-login.html',
  styleUrl: './ctc-login.scss',
})
export class CtcLogin {
  signInForm: FormGroup;
  signUpForm: FormGroup;
  showSignup = false;
  hideSignInPassword: boolean = true;
  hideSignUpPassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private router: Router, private ctcUserAuth: CtcUserAuth) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
      ]]
    });
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
    // TODO: Uncomment the line below after enabling token validation on component initialization
    // this.validateAndRedirect();
  }

  onLogin() {
    if (this.signInForm.valid) {
      const {email, password} = this.signInForm.value;
      const payload:LoginUserRequest = {email, password};
      this.handleLogin(payload);
    }
  }

  onSignup() {
    if (this.signUpForm.valid) {
      const {username, password, email} = this.signUpForm.value;
      const payload:RegisterUserRequest = {username, password, email};
      this.ctcUserAuth.register(payload).subscribe((success:boolean)=>{
        if(success){
          this.handleLogin({email, password});
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.hideSignInPassword = !this.hideSignInPassword;
  }

  toggleSignUpPasswordVisibility() {
    this.hideSignUpPassword = !this.hideSignUpPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  showSignUp() {
    this.showSignup = true;
  }

  showSignIn() {
    this.showSignup = false;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }

  private validateAndRedirect(){
    //TODO: check for Token validity
    this.redirectToHome()
  }

  private redirectToHome() {
    this.router.navigate(['/ctc/home']).then((result:boolean)=>{
      if(!result){
        console.error("Token Expired!");
      }
    });
  }

  private handleLogin(payload: LoginUserRequest) {
    this.ctcUserAuth.login(payload).subscribe((token: string | null) => {
      if(token!==null){
        console.log(`Login successful. Token: ${token}`);
        this.redirectToHome();
      }
    });
  }
}
