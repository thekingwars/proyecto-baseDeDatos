import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cargoModel } from 'src/app/models/cargo.model';
import { CargosService } from 'src/app/services/cargos.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

  empleadoForm: FormGroup
  cargos: cargoModel[] = []

  constructor(private fb: FormBuilder, private cargoService: CargosService, private empleadoService: EmpleadosService, private router: Router, 
              private activatedRouter: ActivatedRoute) { 

    this.formEmpleado()
  }

  ngOnInit(): void {
    this.getAllCargos()

    this.activatedRouter.params.subscribe(params => {
      this.getEmpleado(params['id'])
    })
  }

  formEmpleado(){
    this.empleadoForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      dni: new FormControl(null, [Validators.required]),
      typeofpayroll: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      fecha: new FormControl(null, [Validators.required]),
      fk_appointment: new FormControl(null, [Validators.required])
    })
  }

  getAllCargos(){
    this.cargoService.getAllCargos().subscribe(res => {
        this.cargos = res['results']
    }, err => {
      Swal.fire('Error', 'Ha ocurrido un error', 'error')
    })
  }

  getEmpleado(id){
    this.empleadoService.getEmpleado(id).subscribe(res => {
      this.empleadoForm.patchValue({
        name: res['employee']['name'],
        lastname: res['employee']['lastname'],
        dni: res['employee']['dni'],
        typeofpayroll: res['employee']['typeofpayroll'],
        phone: res['employee']['phone'],
        fecha: res['employee']['fecha'],
        fk_appointment: res['employee']['fk_appointment']
      })
    }, err => {
      console.log(err)
    })
  }

  onSubmit(){
    this.activatedRouter.params.subscribe(params => {
      this.empleadoService.editarEmpleado(this.empleadoForm.value, params['id']).subscribe(res => {
        Swal.fire('Exito', res['msg'] , 'success')
        this.router.navigateByUrl('/admin/empleados')
      }, err => {
        Swal.fire('Error', err['error']['err'], 'error')
      })
    })
  }
}
