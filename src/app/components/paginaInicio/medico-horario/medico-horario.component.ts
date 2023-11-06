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
  horariosMedico: any[] = [];
  medicotoken: string = '';
  groupedHorarios: any[] = [];

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
    this.apiService.getHorarios(this.medicotoken).subscribe(
      (response: any) => {
        console.log(response)
        this.horariosMedico = response.horarios;
        this.groupHorariosByDate();
        console.log(this.horariosMedico);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  groupHorariosByDate() {
    const grouped: {[key: string]: any[]} = {};
    this.horariosMedico.forEach((horario) => {
      if (!grouped[horario.fecha]) {
        grouped[horario.fecha] = [];
      }
      grouped[horario.fecha].push(horario);
      console.log(grouped);
    });
    this.groupedHorarios = Object.keys(grouped).map((fecha) => ({
      fecha,
      horarios: grouped[fecha]
    }));
    console.log(this.groupedHorarios);
  }

}
