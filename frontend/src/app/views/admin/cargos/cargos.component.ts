import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cargoModel } from 'src/app/models/cargo.model';
import { CargosService } from 'src/app/services/cargos.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {

  error;
  cargos: cargoModel[] = [];
  fileName: string = 'cargosExport.xlsx'

  constructor(private cargosServices: CargosService, private router: Router) { }

  ngOnInit(): void {
    this.getCargos()
  }

  verCargo(id){
    this.router.navigate(['/admin/cargos/verCargo', id])
  }

  editarCargo(id){
    this.router.navigate(['/admin/cargos/editarCargo', id])
  }

  getCargos(){
    this.cargosServices.getAllCargos().subscribe(res => {
      this.cargos = res['results']
    }, err => {
      this.error = err['error']['err']
      console.log(err)
    })
  }

  deleteCargo( cargo: cargoModel, i: number ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ cargo.name }`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      console.log(resp)
      if ( resp.value ) {
        this.cargos.splice(i, 1);
        console.log(this.cargos)
        this.cargosServices.deleteCargo( cargo.id_appointment ).subscribe();
      }
    });
  }

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

}
