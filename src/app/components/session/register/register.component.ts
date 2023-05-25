import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerFormPaciente!: FormGroup;
  registerFormMailPassword!: FormGroup;
  registerForm!: FormGroup;
  //Registro de Paciente o clinica
  showForm = true;  // inicialmente el formulario es visible
  selectedFormType: 'paciente' | 'clinica' | null = null;
  selectFormType(type: 'paciente' | 'clinica') {
    this.showForm = false;  // oculta el formulario
    this.selectedFormType = type;
  }
  
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.registerFormMailPassword = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.registerFormPaciente = this.formBuilder.group({
      full_name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dpi: ['', Validators.required],
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
    if (this.registerFormMailPassword.invalid) {
      console.log('ALERTA:', this.registerFormMailPassword.value);
      return;
    }
    if (this.registerFormPaciente.invalid) {
      console.log('ALERTA:', this.registerFormPaciente.value);
      return;
    }
    const formDataMailPassword = this.registerFormMailPassword.value;
    const formData = this.registerFormPaciente.value;
    // Make API call using the ApiService
    this.apiService.signUp(formDataMailPassword || formData).subscribe(
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

  


  //Recargar pagina:
  refreshPage() {
    window.location.reload();
}

}
