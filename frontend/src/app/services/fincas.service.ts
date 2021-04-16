import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fincaModel } from '../models/fincas.model'
import { environment } from '../../environments/environment'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FincasService {

  api: string = environment.apiDev
  headers

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getItem()}`
    })
  }

  createFinca(data: fincaModel){
    return this.http.post(`${this.api}/estate`, data, {headers: this.headers})
  }

  getAllFinca(){
    return this.http.get(`${this.api}/estate`, {headers: this.headers})
  }

  getFinca(id){
    return this.http.get(`${this.api}/estate/${id}`, {headers: this.headers})
  }

  editarFinca(data: fincaModel, id){
    return this.http.put(`${this.api}/estate/${id}`, data, {headers: this.headers})
  }

  deleteFinca(id){
    return this.http.delete(`${this.api}/estate/${id}`, {headers: this.headers})
  }
}
