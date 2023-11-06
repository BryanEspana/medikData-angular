import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastAlertService } from 'src/app/services/toastAlert/toastAlert.service';

@Component({
  selector: 'app-agregar-medico',
  templateUrl: './agregar-medico.component.html',
  styleUrls: ['./agregar-medico.component.scss']
})
export class AgregarMedicoComponent {
  registerFormMedico!: FormGroup;
  // Registro de Paciente o clínica
  showForm = true; // Inicialmente el formulario es visible

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private toast: ToastAlertService
  ) {}

  ngOnInit(): void {
    this.registerFormMedico = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profile_role: ['doctor'],
      full_name: ['', Validators.required],
      dpi: ['', Validators.required],
      telefono: ['', Validators.required],
      especialidad: ['', Validators.required],
      numerocolegiado: ['', Validators.required],
    });
  }

  signUp(userData: any) {
    return this.http.post<any>('/signup', userData);
  }

  onSubmitMedico(): void {

    if (this.registerFormMedico.valid) {
      const combinedData = {
        email: this.registerFormMedico.value.email,
        password: this.registerFormMedico.value.password,
        dpi: this.registerFormMedico.value.dpi,
        full_name: this.registerFormMedico.value.full_name,
        profile_role: this.registerFormMedico.value.profile_role,
        especialidad: this.registerFormMedico.value.especialidad,
        numerocolegiado: this.registerFormMedico.value.numerocolegiado,
        telefono: this.registerFormMedico.value.telefono,
        clinica_doc: localStorage.getItem('clinica_id')!,
      };

      this.apiService.signUp(combinedData).subscribe(
        (response) => {
          // alert that the user was created
          Swal.fire({
            title: 'Medico agregado',
            text: 'El usuario del medico ha sido creado con éxito.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          //refresh page
          this.refreshPage();
        },
        (error) => {
          this.toast.showError('Error al crear usuario: Intenta más tarde');
        }
      );
    } else {
      this.toast.showError('Debes completar todos los campos.');
    }
  }

  // Recargar página:
  refreshPage() {
    window.location.reload();
  }
}