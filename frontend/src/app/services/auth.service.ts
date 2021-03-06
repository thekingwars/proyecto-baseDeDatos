import { HttpClient } from '@angular/common/http';
import { usersModel } from '../models/user.model'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = environment.apiDev

  constructor(private http: HttpClient, ) { 
  }

  setToken(token){
    localStorage.setItem('token', token)
  }

  getItem(){
    return localStorage.getItem('token')
  }


  registerUser(user: usersModel){
    return this.http.post(`${this.api}/register`, user).pipe(
      map(resp => {
        this.setToken(resp['token'])

        return resp
      })
    )
  }

  
  LoginUser(user: usersModel){
    return this.http.post(`${this.api}/login`, user).pipe(
      map(resp => {
        this.setToken(resp['token'])

        return resp
      })
    )
  }

  registerUserGoogle(idToken){
    return this.http.post(`${this.api}/login/google`, {idToken: idToken}).pipe(
      map(resp => {
        this.setToken(resp['token'])
        return resp
      })
    )
  }

  verifyEmail(correo: string){
    return this.http.post(`${environment.apiDev}/forgout-password`, correo)
  }
}
