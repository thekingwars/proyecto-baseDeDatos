import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { animalModel } from '../models/animal.model'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalesService {

  api: string = environment.apiDev
  headers

  constructor(private http: HttpClient, private authServices: AuthService) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authServices.getItem()}`
    })
  }

  createAnimals(animal: animalModel){
    return this.http.post(`${this.api}/animal`, animal, {headers: this.headers})
  }

  getAllAnimals(){
    return this.http.get(`${this.api}/animal`, {headers: this.headers})
  }

  getAnimal(id){
    return this.http.get(`${this.api}/animal/${id}`, {headers: this.headers})
  }

  editAnimal(animal: animalModel, id){
    return this.http.put(`${this.api}/animal/${id}`, animal, {headers: this.headers})
  }

  deleteAnimal(id){
    return this.http.delete(`${this.api}/animal/${id}`, {headers: this.headers})
  }
}
