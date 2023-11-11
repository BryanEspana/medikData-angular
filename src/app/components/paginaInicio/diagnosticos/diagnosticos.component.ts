import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.component.html',
  styleUrls: ['./diagnosticos.component.scss']
})
export class DiagnosticosComponent {
  groupedHorarios: any[] = [];
  diagnosticoForm!: FormGroup;
  citaid: number = 0;
  medicotoken: string = '';
  cita: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializediagnosticoForm();
    this.medicotoken = localStorage.getItem('user_dpi') || '';
    this.route.params.subscribe((params) => {
      this.citaid = params['citaid'];
      console.log(this.citaid)
      this.getCitasDetails();
      this.visualizarItem();
    });
  }


  initializediagnosticoForm(): void {
    this.diagnosticoForm = this.formBuilder.group({
      diagnostico: ['', Validators.required],
    });
  }

  visualizarItem() {
    // Implementa el código para visualizar el elemento seleccionado
  }

  onUpdateDiagnostico(): void {
    const diagnosticoValue = this.diagnosticoForm.value;
    console.log(diagnosticoValue)
    this.apiService.updateDiagnostico(this.citaid, diagnosticoValue).subscribe(
      (response: any) => {
        // Handle the response from the backend (e.g., show a success message)
        Swal.fire({
          icon: 'success',
          title: 'Diagnóstico actualizado',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: any) => {
        // Handle any error from the backend
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo actualizar el diagnóstico',
        });
      }
    );
  }

  getCitasDetails() {
    this.apiService.getCitasPendientesCitaID(this.citaid).subscribe((data: any) => {
      this.cita = data;
      console.log(this.cita);
    });
  }
  
}