import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empleadoModel } from '../models/empleados.model';
import { environment } from '../../environments/environment'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  api: string = environment.apiDev
  headers;

  constructor(private http: HttpClient, private authService: AuthService) { 

      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getItem()}`
      })

  }

  crearEmpleado(empleado: empleadoModel){
    return this.http.post(`${this.api}/employees`, empleado, {headers: this.headers})
  }

  getAllEmpleado(){
    return this.http.get(`${this.api}/employees`, {headers: this.headers})
  }

  getEmpleado(id){
    return this.http.get(`${this.api}/employees/${id}`, {headers: this.headers})
  }

  editarEmpleado(empleado: empleadoModel, id){
    return this.http.put(`${this.api}/employees/${id}`, empleado, {headers: this.headers})
  }

  deleteEmpleado(id){
    return this.http.delete(`${this.api}/employees/${id}`, {headers: this.headers})
  }
}
