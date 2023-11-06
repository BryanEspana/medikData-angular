import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-horario',
  templateUrl: './medico-horario.component.html',
  styleUrls: ['./medico-horario.component.scss']
})
export class MedicoHorarioComponent {
  searchControl = new FormControl('');
  citasRealizadas: any[] = [];
  medicotoken: string = '';

  constructor(
    private route: Router,
    private apiService: ApiService
  ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300));
  }

  ngOnInit(): void {
    this.medicotoken = localStorage.getItem('user_dpi')!;
    this.getHorarios();
    this.visualizarItem();
  }

  visualizarItem() {
    // Implementa el código para visualizar el elemento seleccionado
  }

  regresar() {
    window.history.back();
  }

  getHorarios() {
    this.apiService.getCitas(this.medicotoken).subscribe(
      (response: any) => {
        this.citasRealizadas = response.citas;
        console.log(this.citasRealizadas);
      },
      (error: any) => {
        console.log(error);
      }
    );

  }
}
