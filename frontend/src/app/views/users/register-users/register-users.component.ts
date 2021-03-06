import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";

import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.css']
})
export class RegisterUsersComponent implements OnInit {

  formRegister: FormGroup
  user
  loggedIn: boolean
  loginGoogle

  constructor(private fb: FormBuilder, private auth: AuthService, private googleService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.formGroup()

    this.getUser()
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

      this.auth.registerUserGoogle(idToken).subscribe(res => {
        console.log(res)
      }, err => {
        swal.fire('Ha ocurrido un error', err['error']['err'], 'error')
      })
    })
  }

  formGroup(){
    this.formRegister = this.fb.group({
      nombre:  new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      correo: new FormControl('', [Validators.required, Validators.email])
    })
  }

  getErrorMessage(field: string) {
    let error = this.formRegister.get(field);
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
    const error = this.formRegister.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit(){
    this.auth.registerUser(this.formRegister.value).subscribe(res => {
      swal.fire('Se ha registrado con éxito', '', 'success')
    }, err => {
      swal.fire('Ha ocurrido un error', err['error']['err'], 'error')
    })
  }

}
