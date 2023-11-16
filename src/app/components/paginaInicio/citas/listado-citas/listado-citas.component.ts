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
  user_dpi: string = '';
  user_role: string = '';

  constructor(
    private route: Router,
    private apiService: ApiService
  ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300));
  }

  ngOnInit(): void {
    this.user_dpi = localStorage.getItem('user_dpi') || '';
    this.user_role = localStorage.getItem('profile_role') || '';
    if (this.user_role == 'paciente') {
      this.getCitasPendientes();
      this.getCitasRealizadas();
    } else {
      this.getCitasPendientesMedico();
      this.getCitasRealizadasMedico();
    }
  }

  visualizarItem(item: any) {
    // Implementa el código para visualizar el elemento seleccionado
    console.log(item);
  }

  regresar() {
    window.history.back();
  }

  getCitasRealizadas() {
    this.apiService.getCitas(this.user_dpi).subscribe(
      (response: any) => {
        this.citasRealizadas = response.citas;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCitasRealizadasMedico() {
    this.apiService.getCitasMedico(this.user_dpi).subscribe(
      (response: any) => {
        this.citasRealizadas = response.citas;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCitasPendientes() {
    this.apiService.getCitasPendientes(this.user_dpi).subscribe(
      (response: any) => {
        this.citasPendientes = response.citasPendientes;
        this.citasPendientes.reverse();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCitasPendientesMedico() {
    this.apiService.getCitasPendientesMedico(this.user_dpi).subscribe(
      (response: any) => {
        console.log(response)
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

