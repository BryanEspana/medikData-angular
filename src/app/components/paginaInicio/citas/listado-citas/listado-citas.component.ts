import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-citas',
  templateUrl: './listado-citas.component.html',
  styleUrls: ['./listado-citas.component.scss']
})
export class ListadoCitasComponent {
  searchControl = new FormControl('');
  citasRealizadas: any[] = [];
  citasPendientes: any[] = [];
  pacientetoken: string = '';

  constructor(
    private route: Router,
    private apiService: ApiService
  ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300));
  }

  ngOnInit(): void {
    this.pacientetoken = localStorage.getItem('user_dpi') || '';
    this.getCitasRealizadas();
    this.getCitasPendientes();
  }

  visualizarItem(item: any) {
    // Implementa el código para visualizar el elemento seleccionado
    console.log(item);
  }

  regresar() {
    window.history.back();
  }

  getCitasRealizadas() {
    this.apiService.getCitas(this.pacientetoken).subscribe(
      (response: any) => {
        this.citasRealizadas = response.citas;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCitasPendientes() {
    this.apiService.getCitasPendientes(this.pacientetoken).subscribe(
      (response: any) => {
        this.citasPendientes = response.citasPendientes;
        this.citasPendientes.reverse();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  verDiagnostico(citaid: number) {
    this.route.navigate([`/diagnostico/${citaid}`]);
  }

  obtenerCitaCompletaPDF(citaid: number) {
    this.apiService.getCitaCompletaPDF(citaid).subscribe(
      (response: ArrayBuffer) => {
        // Create a Blob from the ArrayBuffer
        const blob = new Blob([response], { type: 'application/pdf' });
  
        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);
  
        // Open the URL in a new tab
        window.open(url, '_blank');
  
        // Release the URL when the tab is closed
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }  

}

