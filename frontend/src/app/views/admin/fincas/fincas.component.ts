import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fincaModel } from 'src/app/models/fincas.model';
import { FincasService } from 'src/app/services/fincas.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-fincas',
  templateUrl: './fincas.component.html',
  styleUrls: ['./fincas.component.css']
})
export class FincasComponent implements OnInit {

  fincas: fincaModel[] = []
  fileName: string = 'fincasExcel.xlsx'

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

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

}
