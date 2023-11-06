import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-medicos',
  templateUrl: './listado-medicos.component.html',
  styleUrls: ['./listado-medicos.component.scss']
})
export class ListadoMedicosComponent {
  searchControl = new FormControl('');
  listadoMedicos: any[] = [];
  clinicaadmin: string = '';

  constructor(
    private route: Router,
    private apiService: ApiService
    ) {
    this.searchControl.valueChanges
    .pipe(debounceTime(300));
    this.initializeDpi();
  }
  
  ngOnInit(): void {
    this.getListadoMedicos();
  }

  initializeDpi(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      this.clinicaadmin = payload.user_metadata.dpi;
      console.log(this.clinicaadmin);
    }
  }

  visualizarItem(item: any) {
    // Implementa el código para visualizar el elemento seleccionado
    console.log(item);
  }

  regresar() {
    window.history.back();
  }
  
  getListadoMedicos() {
    this.apiService.getMedicosClinica(this.clinicaadmin).subscribe(
      (response: any) => {
        this.listadoMedicos = response.medicos;
        console.log(this.listadoMedicos);
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

}
