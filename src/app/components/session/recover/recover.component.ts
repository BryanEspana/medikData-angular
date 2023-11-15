import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent {
  emailForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

  }

  onSubmit(): void {
    if (this.emailForm.invalid) {
      return;
    } else {
      const email = this.emailForm.value.email;
      console.log(email)
      this.apiService.recuperarCuenta(email).subscribe(
        (response: any) => {
          console.log(response);
          Swal.fire({
            title: '¡Correo enviado!',
            text: 'Se ha enviado un correo con las instrucciones para recuperar tu cuenta',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          });
        },
        (error: any) => {
          console.log(error);
          Swal.fire({
            title: '¡Error!',
            text: 'No se ha podido enviar el correo',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }
  }
}
