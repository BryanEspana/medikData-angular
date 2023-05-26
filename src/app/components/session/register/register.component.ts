import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerFromPaciente!: FormGroup;
  registerFromClinica!: FormGroup;

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
    this.registerFromPaciente = this.formBuilder.group({
      //profile_role: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      full_name: ['', Validators.required],
      dpi: ['', Validators.required],
      nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
      alergias: [''],
      complicaciones: ['']
    });

    this.registerFromClinica = this.formBuilder.group({
      //profile_role: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      dpi: ['', Validators.required],
    });

  }

  signUp(userData: any) {
    return this.http.post<any>('/signup', userData);
  }

  onSubmit(): void {

    if (this.registerFromPaciente.invalid) {

      this.registerFromPaciente.markAllAsTouched();
      Swal.fire({
        title: 'Inconveniente',
        text: 'Faltan campos por llenar.',
        icon: 'error'
      })
      return;
    }

    const formData = this.registerFromPaciente.value;
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




  //Recargar pagina:
  refreshPage() {
    window.location.reload();
}

}
