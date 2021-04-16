import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fincaModel } from 'src/app/models/fincas.model';
import { AnimalesService } from 'src/app/services/animales.service';
import { FincasService } from 'src/app/services/fincas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-animal',
  templateUrl: './editar-animal.component.html',
  styleUrls: ['./editar-animal.component.css']
})
export class EditarAnimalComponent implements OnInit {

  animalForm: FormGroup
  fincas: fincaModel[] = []

  constructor(private fb: FormBuilder, private animalServices: AnimalesService, private router: Router, private fincaServices: FincasService,
              private activatedRouter: ActivatedRoute) {
    this.formAnimal()
  }

  ngOnInit(): void {
    this.getAllEstates()

    this.activatedRouter.params.subscribe(params => {
      this.getEstates(params['id'])
    })
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
    }, err => {
      Swal.fire('Error', 'Ha ocurrido un error', 'error')
    })
  }

  getEstates(id){
    this.animalServices.getAnimal(id).subscribe(res => {
      this.animalForm.patchValue({
        name: res['animal']['name'],
        fecha: res['animal']['fecha'],
        cod_animal: res['animal']['cod_animal'],
        breed: res['animal']['breed'],
        color: res['animal']['color'],
        fk_estate: res['animal']['fk_estate']
      })
    })
  }

  onSubmit(){
    this.activatedRouter.params.subscribe(params => {
      this.animalServices.editAnimal(this.animalForm.value, params['id']).subscribe(res => {
        Swal.fire('Exito', res['msg'] , 'success')
        this.router.navigateByUrl('/admin/animales')
      }, err => {
        Swal.fire('Error', err['error']['err'], 'error')
      })
    })
  }

}
