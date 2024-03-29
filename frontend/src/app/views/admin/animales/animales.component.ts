import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animalModel } from 'src/app/models/animal.model';
import { AnimalesService } from 'src/app/services/animales.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.css']
})
export class AnimalesComponent implements OnInit {

  animales: animalModel[] = []
  fileName= 'animalesExport.xlsx';

  constructor(private animaleServices: AnimalesService, private router: Router) { }

  ngOnInit(): void {
    this.getAnimales()
  }

  editarAnimal(id){
    this.router.navigate(['/admin/animales/editarAnimal', id])
  }

  verAnimal(id){
    this.router.navigate(['/admin/animales/verAnimal', id])
  }

  deleteAnimal( animal: animalModel, i: number ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ animal.name }`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      console.log(resp)
      if ( resp.value ) {
        this.animales.splice(i, 1);
        this.animaleServices.deleteAnimal(animal.id_animal).subscribe()
      }
    });
  }

  getAnimales(){
    this.animaleServices.getAllAnimals().subscribe(res => {
      this.animales = res['results']
    }, err => {
      console.log(err['error']['err'])
    })
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
