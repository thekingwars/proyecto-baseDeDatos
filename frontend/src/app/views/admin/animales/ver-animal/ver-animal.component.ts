import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animalModel } from 'src/app/models/animal.model';
import { AnimalesService } from 'src/app/services/animales.service';

@Component({
  selector: 'app-ver-animal',
  templateUrl: './ver-animal.component.html',
  styleUrls: ['./ver-animal.component.css']
})
export class VerAnimalComponent implements OnInit {

  animal: animalModel

  constructor(private activatedRouter: ActivatedRoute, private animalServices: AnimalesService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.getAnimal(params['id'])
    })
  }

  getAnimal(id){
    this.animalServices.getAnimal(id).subscribe(res => {
      this.animal = res['animal']
    })
  }

}
