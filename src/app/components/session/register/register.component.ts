import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
      alergias: [''],
      complicaciones: ['']
    });
  }

  signUp(userData: any) {
    return this.http.post<any>('/signup', userData);
  }

  onSubmit(): void {
    // Handle form submission and API call here
    if (this.registerForm.invalid) {
      console.log('ALERTA:', this.registerForm.value);
      return;
    }
    const formData = this.registerForm.value;

    // Make API call using the ApiService
    this.apiService.signUp(formData).subscribe(
      (response) => {
        // Handle successful registration response
        console.log('RESPONSE: ', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle error response
        console.error('Error al crear usuario: ', error);
      }
    );
  }

}
