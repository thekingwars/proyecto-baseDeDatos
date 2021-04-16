import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CargosService } from 'src/app/services/cargos.service';

@Component({
  selector: 'app-ver-cargo',
  templateUrl: './ver-cargo.component.html',
  styleUrls: ['./ver-cargo.component.css']
})
export class VerCargoComponent implements OnInit {

  cargo;

  constructor(private activatedRouter: ActivatedRoute, private cargosServices: CargosService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.getCargo(params['id'])
    })
  }

  getCargo(id){
    this.cargosServices.getCargo(id).subscribe(res => {
      this.cargo = res['employee']['name']
    }, err => {
      console.log(err)
    })
  }

}
