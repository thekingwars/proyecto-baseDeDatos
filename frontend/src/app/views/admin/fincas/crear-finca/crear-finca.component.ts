import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FincasService } from 'src/app/services/fincas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-finca',
  templateUrl: './crear-finca.component.html',
  styleUrls: ['./crear-finca.component.css']
})
export class CrearFincaComponent implements OnInit {

  fincaForm: FormGroup;

  constructor(private fb: FormBuilder, private fincaService: FincasService, private router: Router) {
    this.formFinca()
  }

  ngOnInit(): void {

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

  onSubmit(){
    this.fincaService.createFinca(this.fincaForm.value).subscribe(res => {
      Swal.fire('Exito', res['message'] , 'success')
      this.router.navigateByUrl('/admin/fincas')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
