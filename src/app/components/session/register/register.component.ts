import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastAlertService } from 'src/app/services/toastAlert.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formInicial!: FormGroup;
  registerFromPaciente!: FormGroup;
  registerFromClinica!: FormGroup;
  //Registro de Paciente o clinica
  showForm = true;  // inicialmente el formulario es visible
  selectedFormType: 'paciente' | 'clinica' | null = null;


  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private toast: ToastAlertService
  ) { }

  ngOnInit(): void {
    this.formInicial = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.registerFromPaciente = this.formBuilder.group({
      profile_role: ['paciente'],
      full_name: ['', Validators.required],
      dpi: ['', Validators.required],
      nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
      alergias: [''],
      complicaciones: ['']
    });

    this.registerFromClinica = this.formBuilder.group({
      profile_role: ['clinica'],
      nombreClinica: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      dpi: ['', Validators.required],
    });

  }

  signUp(userData: any) {
    return this.http.post<any>('/signup', userData);
  }
  selectFormType(type: 'paciente' | 'clinica') {
    console.log(this.formInicial.value);
    if(this.formInicial.valid && this.formInicial.value.password === this.formInicial.value.confirmPassword){
      this.selectedFormType = type;
      this.showForm = false;
    }else{
      this.toast.showError('Debes de completar los campos.');
    }

  }
  onSubmitPaciente(): void {
    if(this.formInicial.valid && this.registerFromPaciente.valid) {
      const combinedData = {
        email: this.formInicial.value.email,
        password: this.formInicial.value.password,
        dpi: this.registerFromPaciente.value.dpi,
        full_name: this.registerFromPaciente.value.full_name,
        nacimiento: this.registerFromPaciente.value.nacimiento,
        genero: this.registerFromPaciente.value.genero,
        alergias: this.registerFromPaciente.value.alergias,
        complicaciones: this.registerFromPaciente.value.complicaciones,
        profile_role: this.registerFromPaciente.value.profile_role
      };
      console.log("onSubmit", combinedData);
      this.apiService.signUp(combinedData).subscribe(
        (response) => {
          console.log('RESPONSE: ', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al crear usuario: ', error);
        }
      );
    }else{
      this.toast.showError('Debes de completar los campos.');
    }
  }


  onSubmitClinica(): void {
    console.log("ahhhhhh",this.formInicial.value);
    console.log("ahhhhhh",this.registerFromClinica.value)
    if(this.formInicial.valid && this.registerFromClinica.valid){
      const combinedData = {
        email: this.formInicial.value.email,
        password: this.formInicial.value.password,
        profile_role: this.registerFromClinica.value.profile_role,
        dpi: this.registerFromClinica.value.dpi,
        full_name: this.registerFromClinica.value.nombreClinica,
        direccion: this.registerFromClinica.value.direccion,
        telefono: this.registerFromClinica.value.telefono
      }
      this.apiService.signUp(combinedData).subscribe(
        (response) => {
          console.log('RESPONSE: ', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al crear usuario: ', error);
        }
      );
    }
  }


  //Recargar pagina:
  refreshPage() {
    window.location.reload();
}

}
