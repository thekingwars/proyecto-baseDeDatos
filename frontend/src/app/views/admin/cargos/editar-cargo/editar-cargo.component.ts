import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cargoModel } from 'src/app/models/cargo.model';
import { CargosService } from 'src/app/services/cargos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cargo',
  templateUrl: './editar-cargo.component.html',
  styleUrls: ['./editar-cargo.component.css']
})
export class EditarCargoComponent implements OnInit {

  cargoForm: FormGroup

  constructor(private fb: FormBuilder, private cargoServices: CargosService, private router: Router, private activatedRouter: ActivatedRoute) { 
    this.formCargo()
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.getCargo(params['id'])
    })
  }

  formCargo(){
    this.cargoForm = this.fb.group({
      name: new FormControl(null, [Validators.required])
    })
  }

  getCargo(id){
    this.cargoServices.getCargo(id).subscribe(res => {
      this.cargoForm.patchValue({
        name: res['employee']['name']
      })
    })
  }

  onSubmit(){
    this.activatedRouter.params.subscribe(params => {
      this.cargoServices.editarCargo(this.cargoForm.value, params['id']).subscribe(res => {
        Swal.fire('Exito', res['msg'] , 'success')
        this.router.navigateByUrl('/admin/cargos')
      }, err => {
        Swal.fire('Error', err['error']['err'], 'error')
      })
    })
  }

}
