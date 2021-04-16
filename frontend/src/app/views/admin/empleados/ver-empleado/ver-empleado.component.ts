import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empleadoModel } from 'src/app/models/empleados.model';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-ver-empleado',
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.css']
})
export class VerEmpleadoComponent implements OnInit {

  empleado: empleadoModel;

  constructor(private activatedRouter: ActivatedRoute, private empleadoService: EmpleadosService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.getEmpleado(params['id'])
    })
  }

  getEmpleado(id){
    this.empleadoService.getEmpleado(id).subscribe(res => {
      this.empleado = res['employee']
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

}
