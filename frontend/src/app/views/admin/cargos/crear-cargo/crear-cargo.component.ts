import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CargosService } from 'src/app/services/cargos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cargo',
  templateUrl: './crear-cargo.component.html',
  styleUrls: ['./crear-cargo.component.css']
})
export class CrearCargoComponent implements OnInit {

  cargoForm: FormGroup

  constructor(private fb: FormBuilder, private cargoServices: CargosService, private router: Router) { 
    this.formCargo()
  }

  ngOnInit(): void {
  }

  formCargo(){
    this.cargoForm = this.fb.group({
      name: new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){
    this.cargoServices.createCargo(this.cargoForm.value).subscribe(res => {
      console.log(res)
      Swal.fire('Exito', res['message'] , 'success')
      this.router.navigateByUrl('/admin/cargos')
    }, err => {
      Swal.fire('Error', err['error']['err'], 'error')
    })
  }

}
