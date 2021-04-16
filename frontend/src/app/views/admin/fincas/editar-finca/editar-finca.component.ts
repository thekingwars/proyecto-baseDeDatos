import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FincasService } from 'src/app/services/fincas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-finca',
  templateUrl: './editar-finca.component.html',
  styleUrls: ['./editar-finca.component.css']
})
export class EditarFincaComponent implements OnInit {

  fincaForm: FormGroup;

  constructor(private fb: FormBuilder, private fincaService: FincasService, private router: Router, private acitvatedRouter: ActivatedRoute) {
    this.formFinca()
  }

  ngOnInit(): void {
    this.acitvatedRouter.params.subscribe(params => {
      this.getFinca(params['id'])
    })
  }

  formFinca(){
    this.fincaForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      nro_country: new FormControl(null, [Validators.required]),
      areas: new FormControl(null, [Validators.required])
    })
  }

  getFinca(id){
    this.fincaService.getFinca(id).subscribe(res => {
      this.fincaForm.patchValue({
        name: res['estate']['name'],
        city: res['estate']['city'],
        state: res['estate']['state'],
        nro_country: res['estate']['nro_country'],
        areas: res['estate']['areas']
      })
    })
  }

  onSubmit(){
    this.acitvatedRouter.params.subscribe(params => {
      this.fincaService.editarFinca(this.fincaForm.value, params['id']).subscribe(res => {
        Swal.fire('Exito', res['msg'] , 'success')
        this.router.navigateByUrl('/admin/fincas')
      }, err => {
        Swal.fire('Error', err['error']['err'], 'error')
      })
    })
  }

}
