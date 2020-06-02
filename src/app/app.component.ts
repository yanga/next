import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public loginError = '';
  public hide = true;
  public form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService ) {}

  ngOnInit () {
    this.form = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
    this.isLoggedIn = this.auth.isLogedIn();
  }
  submitForm() {
    if(this.form.valid){
        this.auth.login(this.form.controls['username'].value, this.form.controls['password'].value ).subscribe((res) => {
          if(res.token) {
            this.isLoggedIn = true;
            localStorage.setItem('token', res.token);
          } else {
            this.loginError = 'Login failed. please try again.';
          }
        }, err => {
          this.loginError = 'Login failed. please try again.';
        });
    }
  }
}
