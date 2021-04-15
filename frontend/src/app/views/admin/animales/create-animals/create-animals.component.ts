import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-animals',
  templateUrl: './create-animals.component.html',
  styleUrls: ['./create-animals.component.css']
})
export class CreateAnimalsComponent implements OnInit {

  animalForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.formAnimal()
  }

  ngOnInit(): void {
  }

  formAnimal(){
    this.animalForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      fecha: new FormControl(null, [Validators.required]),
      cod_animal: new FormControl(null, [Validators.required]),
      breed: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      //fk_estate: new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){
    console.log('eh')
  }

}
