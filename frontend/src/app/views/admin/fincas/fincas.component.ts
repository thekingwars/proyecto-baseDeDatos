import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fincaModel } from 'src/app/models/fincas.model';
import { FincasService } from 'src/app/services/fincas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fincas',
  templateUrl: './fincas.component.html',
  styleUrls: ['./fincas.component.css']
})
export class FincasComponent implements OnInit {

  fincas: fincaModel[] = []

  constructor(private fincasServices: FincasService, private router: Router) { }

  ngOnInit(): void {
    this.getFincas()
  }

  getFincas(){
    this.fincasServices.getAllFinca().subscribe(res => {
      this.fincas = res['results']
    }, err => {
      console.log(err)
    })
  }

  editarFinca(id){
    this.router.navigate(['/admin/fincas/editarFinca', id])
  }

  verFinca(id){
    this.router.navigate(['/admin/fincas/verFinca', id])
  }

  deleteFinca( finca: fincaModel, i: number ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ finca.name }`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      console.log(resp)
      if ( resp.value ) {
      this.fincas.splice(i, 1);
       this.fincasServices.deleteFinca(finca.id_estate).subscribe()
      }
    });
  }

}
