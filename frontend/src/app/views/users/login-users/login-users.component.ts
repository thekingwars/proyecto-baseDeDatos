import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-users',
  templateUrl: './login-users.component.html',
  styleUrls: ['./login-users.component.css']
})
export class LoginUsersComponent implements OnInit {

  formLogin: FormGroup
  loggedIn: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private googleService: SocialAuthService, private router: Router) { }

  ngOnInit(): void {
    this.fbLogin()

    this.getUser()
  }

  getErrorMessage(field: string) {
    let error = this.formLogin.get(field);
    let message;

    if (error.errors.required) {
      message = 'El campo es requerido';
    }
    if (error.hasError('minlength')) {
      message = 'Debe colocar un minimo de 6 caracteres';
    }
    if (error.hasError('email')) {
      message = 'El email es invalido';
    }

    return message;
  }

  isValidField(field: string) {
    const error = this.formLogin.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  fbLogin(){
    this.formLogin = this.fb.group({
      correo: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  signInWithGoogle(): void {
    this.googleService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.googleService.signOut();
  }

  getUser(){
    this.googleService.authState.subscribe((user) => {
      let idToken = user.idToken

      this.loggedIn = (user != null)

      this.authService.registerUserGoogle(idToken).subscribe(res => {
        console.log(res)

        this.router.navigateByUrl('/admin/home')
      })
    })
  }

  onSubmit(){
    this.authService.LoginUser(this.formLogin.value).subscribe(res => {
      console.log(res)
      this.router.navigateByUrl('/admin/home')
    }, err => {
      Swal.fire('Ha ocurrido un error', err.error['err'], 'error')
    })
  }

}
