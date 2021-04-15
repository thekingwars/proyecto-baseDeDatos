import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){
  }
  canActivate(): boolean {
      const token = this.authService.getItem();

      const userPromise = new Promise((resolve, rejects) => {
        if(token){
          resolve('Tiene acceso a esta zona')
        }
        else{
          rejects('No tiene acceso a esta zona, por favor inicie sesión para acceder')
        }
      })

      userPromise
        .then(res => {
          console.log(res)
          return true
        })
        .catch(err => {
          alert(err)
          this.router.navigateByUrl('')
        })

      return true
  }
}
