import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fincaModel } from 'src/app/models/fincas.model';
import { FincasService } from 'src/app/services/fincas.service';

@Component({
  selector: 'app-ver-finca',
  templateUrl: './ver-finca.component.html',
  styleUrls: ['./ver-finca.component.css']
})
export class VerFincaComponent implements OnInit {

  finca: fincaModel

  constructor(private acitvatedRouter: ActivatedRoute, private fincaService: FincasService) { }

  ngOnInit(): void {
    this.acitvatedRouter.params.subscribe(params => {
      this.getFinca(params['id'])
    })
  }

  getFinca(id){
    this.fincaService.getFinca(id).subscribe(res => {
      this.finca = res['estate']
      console.log(res)
    })
  }

}
