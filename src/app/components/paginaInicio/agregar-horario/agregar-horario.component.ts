import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-agregar-horario',
  templateUrl: './agregar-horario.component.html',
  styleUrls: ['./agregar-horario.component.scss']
})
export class AgregarHorarioComponent {
  searchControl = new FormControl('');
  horariosMedico: any[] = [];
  doctor_dpi: string = '';
  groupedHorarios: any[] = [];
  horarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300));
  }

  ngOnInit(): void {
    this.doctor_dpi = localStorage.getItem('user_dpi')!;
    this.initializeHorarioForm();
    this.visualizarItem();
  }
  

  initializeHorarioForm(): void {
    this.horarioForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      doctor_dpi: [this.doctor_dpi, Validators.required],
    });
  }

  visualizarItem() {
    // Implementa el código para visualizar el elemento seleccionado
  }

  
  onAgregarHorarioClick(): void {

    if (this.horarioForm.valid) {
      const horarioData = this.horarioForm.value;

      this.apiService.postHorario(horarioData).subscribe(
        (response: any) => {
          this.router.navigate(['/horario']);
        },
        (error) => {
          console.error('Error agregando horario:', error);
        }
      );
    } else {
      console.error('Formulario invalido');
    }
  }

  regresar() {
    window.history.back();
  }
}
