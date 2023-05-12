import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
    ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //Función para realizar la Solicitud HTTP POST
  login(email:string, password: string){
    return this.http.post<any>('/login', {email, password});
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      console.log('ALERTA:', this.loginForm.value);
      return;
    }

    const {email, password} = this.loginForm.value;

    this.apiService.getUser(email).subscribe(
      user => console.log('Email:', user),
      error => console.error('Error al obtener el usuario:', error)
    );

    this.apiService.login(email, password).subscribe(
      response => {
        console.log('RESPONSE:', response);
        localStorage.setItem('jwt', response.jwt);
        this.router.navigate(['/dashboard']);
      },
      error => console.error('Error en el inicio de sesión:', error)
    );
  }
  

  onLogin() {
    this.router.navigate(['/dashboard']);
  }
}
