import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empleadoModel } from 'src/app/models/empleados.model';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: empleadoModel[] = []

  constructor(private empleadosServices: EmpleadosService, private router: Router) { }

  ngOnInit(): void {
    this.getEmpleado()
  }

  getEmpleado(){
    this.empleadosServices.getAllEmpleado().subscribe(res => {
      this.empleados = res['results']
      console.log(this.empleados)
    }, err => {
      console.log(err)
    })
  }

  editarEmpleado(id){
    this.router.navigate(['/admin/empleados/editarEmpleado', id])
  }

  verEmpleado(id){
    this.router.navigate(['/admin/empleados/verEmpleado', id])
  }

  deleteEmpleado( empleado: empleadoModel, i: number ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ empleado.name }`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      console.log(resp)
      if ( resp.value ) {
        this.empleados.splice(i, 1);
        this.empleadosServices.deleteEmpleado(empleado.id_employee).subscribe()
      }
    });
  }
}
