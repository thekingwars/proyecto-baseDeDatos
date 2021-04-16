import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cargoModel } from 'src/app/models/cargo.model';
import { CargosService } from 'src/app/services/cargos.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  empleadoForm: FormGroup
  cargos: cargoModel[] = []

  constructor(private fb: FormBuilder, private cargoService: CargosService, private empleadoService: EmpleadosService, private router: Router) { 
    this.formEmpleado()
  }

  ngOnInit(): void {
    this.getAllCargos()
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

  onSubmit(){
    this.empleadoService.crearEmpleado(this.empleadoForm.value).subscribe(res => {
      Swal.fire('Exito', res['message'] , 'success')
      this.router.navigateByUrl('/admin/empleados')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
