import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../core/globalConstant/Global.Constant';

@Component({
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {

  // loginForm: FormGroup;
  hide = true;

  // constructor(private fb: FormBuilder) {
  //   this.loginForm = this.fb.group({
  //     userName: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  fb = inject(FormBuilder)
  httpClient = inject(HttpClient)
  router = inject(Router)

  loginForm = this.fb.group({
    userName: ['abc124@gmail.comss', Validators.required],
    password: ['22222222', Validators.required]
  })

  constructor() {
    console.log("loginForm valid status", this.loginForm.valid)
    console.log("loginForm invalid status", this.loginForm.invalid)
  }


  onLogin() {
    if (this.loginForm.valid) {

      console.log("loginForm valid status", this.loginForm.valid)
      console.log("loginForm invalid status", this.loginForm.invalid)

      const payload = this.loginForm.value;
      console.log('Login payload:', payload);

      this.httpClient.post(environment.API_URL + 'login', payload).subscribe({
        next: (response: any) => {
          if (response.result) {
            alert(response.message + " Login successfull")

            //Coverting object to JSON string
            localStorage.setItem(GlobalConstant.LOGIN_RESPONSE_LOCALSTORAGE_KEY, JSON.stringify(response.data))

            this.router.navigateByUrl("/admin/dashboard")

          }
          else {
            alert("Login failed : " + response.message)
          }
        },
        error(err: any) {
          alert("api error " + err)
        }
      })

      // 🔑 TODO: Send payload to your employee management backend API
    }
  }
}