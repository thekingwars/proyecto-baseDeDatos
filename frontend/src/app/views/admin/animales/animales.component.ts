import { Component, OnInit } from '@angular/core';
import { AnimalesService } from 'src/app/services/animales.service';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.css']
})
export class AnimalesComponent implements OnInit {

  error

  constructor(private animaleServices: AnimalesService) { }

  ngOnInit(): void {
    this.getAnimales()
  }

  getAnimales(){
    this.animaleServices.getAllAnimals().subscribe(res => {
      console.log(res)
    }, err => {
      this.error = err['error']['err']
      console.log(err['error']['err'])
    })
  }

}
