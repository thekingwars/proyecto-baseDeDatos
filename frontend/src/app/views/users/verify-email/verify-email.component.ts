import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  sendEmail: FormGroup
  loading: boolean = false

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.sendEmailFb()
  }

  sendEmailFb(){
    this.sendEmail = this.fb.group({
      correo: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onSubmit(){
    this.authService.verifyEmail(this.sendEmail.value).subscribe(res => {
      Swal.fire('Exito', res['msg'], 'success')
    }, err => {
      Swal.fire('Error', err.error['err'], 'error')
    })
  }

}
