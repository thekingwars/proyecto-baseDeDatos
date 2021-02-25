import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { usersModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-users',
  templateUrl: './login-users.component.html',
  styleUrls: ['./login-users.component.css']
})
export class LoginUsersComponent implements OnInit {

  formLogin: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.fbLogin()
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

  onSubmit(){
    this.authService.LoginUser(this.formLogin.value).subscribe(res => {
      console.log(res)
    }, err => {
      Swal.fire('Ha ocurrido un error', err.error['err'], 'error')
    })
  }

}
