import { Component, OnInit } from '@angular/core';
import { CargosService } from 'src/app/services/cargos.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {

  error;
  cargos;

  constructor(private cargosServices: CargosService) { }

  ngOnInit(): void {
    this.getCargos()
  }

  getCargos(){
    this.cargosServices.getAllCargos().subscribe(res => {
      console.log(res)
      this.cargos = res['results']
    }, err => {
      this.error = err['error']['err']
      console.log(err)
    })
  }

}
