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
  loginForm!: FormGroup;
  showPassword = false;
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  //Funcion mostrar contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  //Función para realizar la Solicitud HTTP POST
  login(email: string, password: string) {
    return this.http.post<any>('/login', { email, password });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.apiService.login(email, password).subscribe(
      response => {
        const token = response.data.session.access_token;
        localStorage.setItem('jwt', token);
        this.apiService.getUser(token).subscribe(
          user => {
            Swal.fire({
              title: 'Bienvenido a MedicData',
              text: 'Inicio de sesión correcto.',
              icon: 'success'
            }).then(() => {
              this.router.navigate(['/dashboard']);
            });
          },
          error => console.error('Error al obtener el usuario:', error)
        )
      },
      error => Swal.fire({
        title: 'Error!',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    );
  }


}
