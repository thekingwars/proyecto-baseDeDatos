import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fincaModel } from 'src/app/models/fincas.model';
import { AnimalesService } from 'src/app/services/animales.service';
import { FincasService } from 'src/app/services/fincas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-animals',
  templateUrl: './create-animals.component.html',
  styleUrls: ['./create-animals.component.css']
})
export class CreateAnimalsComponent implements OnInit {

  animalForm: FormGroup
  fincas: fincaModel[] = []

  constructor(private fb: FormBuilder, private animalServices: AnimalesService, private router: Router, private fincaServices: FincasService) {
    this.formAnimal()
  }

  ngOnInit(): void {
    this.getAllEstates()
  }

  formAnimal(){
    this.animalForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      fecha: new FormControl(null, [Validators.required]),
      cod_animal: new FormControl(null, [Validators.required]),
      breed: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      fk_estate: new FormControl(null, [Validators.required])
    })
  }

  getAllEstates(){
    this.fincaServices.getAllFinca().subscribe(res => {
        this.fincas = res['results']
        console.log(this.fincas)
    }, err => {
      Swal.fire('Error', 'Ha ocurrido un error', 'error')
    })
  }

  onSubmit(){
    this.animalServices.createAnimals(this.animalForm.value).subscribe(res => {
      Swal.fire('Exito', res['message'] , 'success')
      this.router.navigateByUrl('/admin/animales')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
