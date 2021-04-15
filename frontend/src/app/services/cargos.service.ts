import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { cargoModel } from '../models/cargo.model';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  api: string = environment.apiDev
  headers;

  constructor(private http: HttpClient, private authServices: AuthService) { 
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authServices.getItem()}`
    })
  }

  createCargo(data: cargoModel){
    return this.http.post(`${this.api}/appointment`, data, {headers: this.headers})
  }

  getAllCargos(){
      return this.http.get(`${this.api}/appointment`, {headers: this.headers})
  }
}
